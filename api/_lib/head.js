// Utilidades para reescribir el <head> de index.html / app-shell.html (build y funciones serverless).

export const escAttr = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export const escText = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// JSON seguro para incrustar dentro de <script>.
export const safeJson = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c')

export const trimText = (s, max) => {
  const t = String(s || '').replace(/\s+/g, ' ').trim()
  return t.length > max ? `${t.slice(0, max - 1).trimEnd()}…` : t
}

function setMeta(html, attr, key, value) {
  const re = new RegExp(`<meta\\s+${attr}="${key}"\\s+content="[^"]*"\\s*/>`)
  return html.replace(re, () => `<meta ${attr}="${key}" content="${escAttr(value)}" />`)
}

/**
 * Aplica metadata a una página: título, descripción, canonical, Open Graph, Twitter,
 * JSON-LD propio, noindex y un bloque <noscript> con el contenido principal.
 */
export function applyHead(html, { title, description, canonical, image, type, jsonLd, noindex, noscript }) {
  let out = html
  if (title) {
    out = out.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${escText(title)}</title>`)
    out = setMeta(out, 'property', 'og:title', title)
    out = setMeta(out, 'name', 'twitter:title', title)
  }
  if (description) {
    out = setMeta(out, 'name', 'description', description)
    out = setMeta(out, 'property', 'og:description', description)
    out = setMeta(out, 'name', 'twitter:description', description)
  }
  if (canonical) {
    out = out.replace(/(<link rel="canonical" href=")[^"]*(")/, (_, a, b) => `${a}${escAttr(canonical)}${b}`)
    out = setMeta(out, 'property', 'og:url', canonical)
  }
  if (image) {
    out = setMeta(out, 'property', 'og:image', image)
    out = setMeta(out, 'name', 'twitter:image', image)
  }
  if (type) out = setMeta(out, 'property', 'og:type', type)

  const extra = []
  if (noindex) extra.push('<meta name="robots" content="noindex, follow" />')
  if (jsonLd) extra.push(`<script type="application/ld+json" id="ld-page">${safeJson(jsonLd)}</script>`)
  if (extra.length) out = out.replace('</head>', () => `    ${extra.join('\n    ')}\n  </head>`)
  if (noscript) out = out.replace('<div id="root">', () => `<noscript>${noscript}</noscript>\n    <div id="root">`)
  return out
}
