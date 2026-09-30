import crypto from 'node:crypto'

const COOKIE = 'wc_admin'
const SESSION_SECONDS = 8 * 60 * 60

const b64url = (buf) => Buffer.from(buf).toString('base64url')

function sign(data) {
  return crypto
    .createHmac('sha256', process.env.ADMIN_SESSION_SECRET)
    .update(data)
    .digest('base64url')
}

// Comparación en tiempo constante (hasheamos para igualar longitudes).
export function safeEqual(a, b) {
  const ha = crypto.createHash('sha256').update(String(a)).digest()
  const hb = crypto.createHash('sha256').update(String(b)).digest()
  return crypto.timingSafeEqual(ha, hb)
}

export function authConfigured() {
  const { ADMIN_USER, ADMIN_PASSWORD, ADMIN_SESSION_SECRET } = process.env
  return Boolean(
    ADMIN_USER && ADMIN_PASSWORD && ADMIN_SESSION_SECRET && ADMIN_SESSION_SECRET.length >= 32
  )
}

export function createToken() {
  const payload = b64url(JSON.stringify({ exp: Date.now() + SESSION_SECONDS * 1000 }))
  return `${payload}.${sign(payload)}`
}

export function verifyToken(token) {
  if (!token || !authConfigured()) return false
  const [payload, sig] = String(token).split('.')
  if (!payload || !sig || !safeEqual(sig, sign(payload))) return false
  try {
    const { exp } = JSON.parse(Buffer.from(payload, 'base64url').toString())
    return typeof exp === 'number' && exp > Date.now()
  } catch {
    return false
  }
}

function readCookie(req, name) {
  const header = req.headers.cookie || ''
  for (const part of header.split(';')) {
    const i = part.indexOf('=')
    if (i > -1 && part.slice(0, i).trim() === name) return part.slice(i + 1).trim()
  }
  return null
}

export function isAuthenticated(req) {
  return verifyToken(readCookie(req, COOKIE))
}

// Uso: if (!requireAdmin(req, res)) return
export function requireAdmin(req, res) {
  if (isAuthenticated(req)) return true
  res.status(401).json({ error: 'No autorizado' })
  return false
}

function cookieAttrs(req, maxAge) {
  const secure =
    req.headers['x-forwarded-proto'] === 'https' || Boolean(process.env.VERCEL)
  return `Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${secure ? '; Secure' : ''}`
}

export function setSessionCookie(req, res) {
  res.setHeader('Set-Cookie', `${COOKIE}=${createToken()}; ${cookieAttrs(req, SESSION_SECONDS)}`)
}

export function clearSessionCookie(req, res) {
  res.setHeader('Set-Cookie', `${COOKIE}=; ${cookieAttrs(req, 0)}`)
}

// Límite de intentos por IP. En serverless la memoria no se comparte entre
// instancias: es una defensa best-effort, no absoluta.
const attempts = new Map()
const WINDOW_MS = 15 * 60 * 1000
const MAX_ATTEMPTS = 5

export function clientIp(req) {
  return (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown')
    .toString()
    .split(',')[0]
    .trim()
}

export function isRateLimited(ip) {
  const now = Date.now()
  const rec = attempts.get(ip)
  if (!rec || now - rec.first > WINDOW_MS) return false
  return rec.count >= MAX_ATTEMPTS
}

export function recordFailure(ip) {
  const now = Date.now()
  const rec = attempts.get(ip)
  if (!rec || now - rec.first > WINDOW_MS) attempts.set(ip, { first: now, count: 1 })
  else rec.count += 1
}

export function clearFailures(ip) {
  attempts.delete(ip)
}
