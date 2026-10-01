// Pre-renderiza páginas públicas a HTML estático para que buscadores y redes sociales
// reciban el contenido sin ejecutar JavaScript. Se ejecuta tras `vite build` y el build SSR.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const dist = path.join(root, 'dist')
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js')

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const { render } = await import(pathToFileURL(ssrEntry).href)

const site = (process.env.VITE_SITE_URL || 'https://world-connection.vercel.app').replace(/\/+$/, '')
const escAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;')

// "Shell" sin contenido: lo usan el resto de rutas (admin, detalle de noticia, desconocidas).
fs.writeFileSync(path.join(dist, 'app-shell.html'), template)

// Rutas pre-renderizadas y su metadata propia (la home usa la de index.html).
const pages = [
  { url: '/', file: 'index.html' },
  {
    url: '/noticias',
    file: path.join('noticias', 'index.html'),
    title: 'Noticias | World Connection Mendoza',
    description:
      'Novedades, comunicados y noticias de World Connection: telecomunicaciones y gestión comercial multicanal en Mendoza, Argentina.',
  },
]

for (const page of pages) {
  let html = template.replace('<div id="root"></div>', `<div id="root">${render(page.url)}</div>`)

  if (page.title) {
    const canonical = `${site}${page.url}`
    html = html
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${escAttr(page.title)}</title>`)
      .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${escAttr(page.description)}$2`)
      .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${canonical}$2`)
      .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${canonical}$2`)
      .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${escAttr(page.title)}$2`)
      .replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${escAttr(page.description)}$2`)
      .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${escAttr(page.title)}$2`)
  }

  const out = path.join(dist, page.file)
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, html)
  console.log(`prerender: ${page.url} -> ${path.relative(root, out)} (${(html.length / 1024).toFixed(1)} KB)`)
}
