// Convierte un link de YouTube/Vimeo en URL embebible. Devuelve null si no se reconoce.
export function toEmbedUrl(raw) {
  let u
  try {
    u = new URL(raw)
  } catch {
    return null
  }
  const host = u.hostname.replace(/^www\./, '')

  if (host === 'youtu.be') {
    const id = u.pathname.slice(1)
    return id ? `https://www.youtube-nocookie.com/embed/${id}` : null
  }
  if (host === 'youtube.com' || host === 'm.youtube.com') {
    if (u.pathname === '/watch') {
      const id = u.searchParams.get('v')
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null
    }
    const m = u.pathname.match(/^\/(shorts|embed)\/([\w-]+)/)
    return m ? `https://www.youtube-nocookie.com/embed/${m[2]}` : null
  }
  if (host === 'vimeo.com') {
    const m = u.pathname.match(/^\/(\d+)/)
    return m ? `https://player.vimeo.com/video/${m[1]}` : null
  }
  return null
}
