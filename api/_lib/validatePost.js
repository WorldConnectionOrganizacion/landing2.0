const MAX_BLOCKS = 100

export function slugify(input) {
  return String(input)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

const isHttpsUrl = (v) => {
  try {
    return new URL(v).protocol === 'https:'
  } catch {
    return false
  }
}

const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

function cleanBlock(b) {
  if (!b || typeof b !== 'object') throw new Error('Bloque inválido')
  if (b.type === 'text') return { type: 'text', text: str(b.text, 20000) }
  if (b.type === 'image') {
    if (!isHttpsUrl(b.url)) throw new Error('Imagen con URL inválida')
    return { type: 'image', url: b.url, caption: str(b.caption, 300) }
  }
  if (b.type === 'video') {
    if (!isHttpsUrl(b.url)) throw new Error('Video con URL inválida')
    return { type: 'video', url: b.url }
  }
  throw new Error('Tipo de bloque desconocido')
}

// Devuelve { value } con solo los campos permitidos, o { error }.
// `partial` = en updates solo se validan los campos presentes.
export function validatePost(body, { partial = false } = {}) {
  if (!body || typeof body !== 'object') return { error: 'Cuerpo inválido' }
  const out = {}
  const has = (k) => body[k] !== undefined

  if (!partial || has('title')) {
    const title = str(body.title, 200)
    if (!title) return { error: 'El título es obligatorio' }
    out.title = title
  }
  if (has('slug') || (!partial && out.title)) {
    const slug = slugify(body.slug || out.title || '')
    if (!slug) return { error: 'Slug inválido' }
    out.slug = slug
  }
  if (has('category')) out.category = str(body.category, 40) || 'Noticias'
  if (has('excerpt')) out.excerpt = str(body.excerpt, 500)
  if (has('cover_url')) {
    if (body.cover_url && !isHttpsUrl(body.cover_url)) return { error: 'Portada con URL inválida' }
    out.cover_url = body.cover_url || null
  }
  if (has('blocks')) {
    if (!Array.isArray(body.blocks) || body.blocks.length > MAX_BLOCKS) {
      return { error: 'Bloques inválidos' }
    }
    try {
      out.blocks = body.blocks.map(cleanBlock)
    } catch (e) {
      return { error: e.message }
    }
  }
  if (has('published')) out.published = Boolean(body.published)
  if (has('published_at')) {
    const d = new Date(body.published_at)
    if (Number.isNaN(d.getTime())) return { error: 'Fecha inválida' }
    out.published_at = d.toISOString()
  }
  return { value: out }
}
