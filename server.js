// Servidor de producción (Railway u otro host Node). Reproduce lo que Vercel hacía solo:
// - sirve el build estático de dist/ (con 404.html y estado 404 real),
// - ejecuta las funciones de api/ con el mismo contrato (req.body, req.query, res.status().json()),
// - aplica los rewrites y headers que antes estaban en vercel.json.
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const dist = path.join(root, 'dist')
const apiDir = path.join(root, 'api')
const PORT = Number(process.env.PORT) || 3000
const MAX_BODY = 1024 * 1024 // 1 MB: las imágenes van directo a Supabase, no pasan por acá.

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
}
const COMPRESSIBLE = /^(text\/|application\/(json|xml|javascript)|image\/svg)/

// --- Compresión (Vercel la hacía en su CDN) -------------------------------------------
function sendBody(req, res, body) {
  const type = String(res.getHeader('Content-Type') || '')
  const accept = String(req.headers['accept-encoding'] || '')
  if (req.method === 'HEAD') {
    res.setHeader('Content-Length', Buffer.byteLength(body))
    return res.end()
  }
  if (body.length > 1024 && COMPRESSIBLE.test(type)) {
    res.setHeader('Vary', 'Accept-Encoding')
    if (/\bbr\b/.test(accept)) {
      res.setHeader('Content-Encoding', 'br')
      return res.end(zlib.brotliCompressSync(body))
    }
    if (/\bgzip\b/.test(accept)) {
      res.setHeader('Content-Encoding', 'gzip')
      return res.end(zlib.gzipSync(body))
    }
  }
  res.setHeader('Content-Length', Buffer.byteLength(body))
  return res.end(body)
}

// --- Archivos estáticos -----------------------------------------------------------------
function resolveStatic(pathname) {
  let rel
  try {
    rel = decodeURIComponent(pathname)
  } catch {
    return null
  }
  const file = path.normalize(path.join(dist, rel))
  if (file !== dist && !file.startsWith(dist + path.sep)) return null // path traversal
  for (const candidate of [file, path.join(file, 'index.html')]) {
    try {
      if (fs.statSync(candidate).isFile()) return candidate
    } catch {}
  }
  return null
}

function serveFile(req, res, file, status = 200) {
  const ext = path.extname(file).toLowerCase()
  res.statusCode = status
  res.setHeader('Content-Type', TYPES[ext] || 'application/octet-stream')
  // Los archivos de /assets llevan hash en el nombre: se pueden cachear para siempre.
  const immutable = file.startsWith(path.join(dist, 'assets') + path.sep)
  res.setHeader(
    'Cache-Control',
    immutable ? 'public, max-age=31536000, immutable' : 'public, max-age=0, must-revalidate'
  )
  sendBody(req, res, fs.readFileSync(file))
}

function notFound(req, res) {
  const page = path.join(dist, '404.html')
  if (fs.existsSync(page)) return serveFile(req, res, page, 404)
  res.statusCode = 404
  res.end('Not found')
}

// --- Funciones de /api ------------------------------------------------------------------
const handlers = new Map()
async function loadHandler(name) {
  if (!/^[\w-]+$/.test(name) || name.startsWith('_')) return null
  if (handlers.has(name)) return handlers.get(name)
  const file = path.join(apiDir, `${name}.js`)
  if (!fs.existsSync(file)) return null
  const mod = await import(pathToFileURL(file).href)
  handlers.set(name, mod.default)
  return mod.default
}

async function readBody(req) {
  const chunks = []
  let size = 0
  for await (const c of req) {
    size += c.length
    if (size > MAX_BODY) throw Object.assign(new Error('Body demasiado grande'), { status: 413 })
    chunks.push(c)
  }
  const raw = Buffer.concat(chunks).toString()
  if (!raw) return undefined
  const type = String(req.headers['content-type'] || '')
  if (type.includes('application/json')) {
    try {
      return JSON.parse(raw)
    } catch {
      throw Object.assign(new Error('JSON inválido'), { status: 400 })
    }
  }
  if (type.includes('application/x-www-form-urlencoded')) {
    return Object.fromEntries(new URLSearchParams(raw))
  }
  return raw
}

async function runApi(req, res, name, query) {
  const handler = await loadHandler(name)
  if (!handler) return notFound(req, res)

  res.status = (code) => ((res.statusCode = code), res)
  res.json = (obj) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    sendBody(req, res, Buffer.from(JSON.stringify(obj)))
    return res
  }
  res.send = (body) => {
    if (body !== null && typeof body === 'object' && !Buffer.isBuffer(body)) return res.json(body)
    if (!res.getHeader('Content-Type')) res.setHeader('Content-Type', 'text/html; charset=utf-8')
    sendBody(req, res, Buffer.from(body ?? ''))
    return res
  }

  try {
    req.query = query
    req.body = await readBody(req)
    await handler(req, res)
  } catch (err) {
    if (!err.status) console.error(`api/${name}:`, err)
    if (!res.headersSent) res.status(err.status || 500).json({ error: err.status ? err.message : 'Error interno' })
  }
}

// --- Router (equivalente a vercel.json) -------------------------------------------------
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost')
  const { pathname } = url
  const query = Object.fromEntries(url.searchParams)

  if (pathname === '/healthz') {
    res.setHeader('Content-Type', 'text/plain')
    return res.end('ok')
  }

  let m
  if ((m = pathname.match(/^\/api\/([\w-]+)\/?$/))) return runApi(req, res, m[1], query)
  if (pathname === '/sitemap.xml') return runApi(req, res, 'sitemap', query)
  if ((m = pathname.match(/^\/noticias\/([^/]+)\/?$/))) {
    return runApi(req, res, 'news-meta', { ...query, slug: decodeURIComponent(m[1]) })
  }
  if (/^\/paginas-admin(\/.*)?$/.test(pathname)) {
    res.setHeader('X-Robots-Tag', 'noindex, nofollow')
    return serveFile(req, res, path.join(dist, 'app-shell.html'))
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.statusCode = 405
    res.setHeader('Allow', 'GET, HEAD')
    return res.end()
  }
  const file = resolveStatic(pathname)
  return file ? serveFile(req, res, file) : notFound(req, res)
})

server.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`))

// Railway manda SIGTERM al redeployar: cerramos prolijo.
process.on('SIGTERM', () => server.close(() => process.exit(0)))
