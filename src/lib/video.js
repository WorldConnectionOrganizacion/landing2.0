// Interpreta un link de YouTube/Vimeo/Instagram/LinkedIn. Devuelve { src, kind } o null si no se reconoce.
// kind: 'video' (16:9) | 'instagram' | 'linkedin' (tarjetas verticales de cada red).
const video = (src) => ({ src, kind: 'video' })

export function parseEmbed(raw) {
  let u
  try {
    u = new URL(raw)
  } catch {
    return null
  }
  const host = u.hostname.replace(/^www\./, '')

  if (host === 'youtu.be') {
    const id = u.pathname.slice(1)
    return id ? video(`https://www.youtube-nocookie.com/embed/${id}`) : null
  }
  if (host === 'youtube.com' || host === 'm.youtube.com') {
    if (u.pathname === '/watch') {
      const id = u.searchParams.get('v')
      return id ? video(`https://www.youtube-nocookie.com/embed/${id}`) : null
    }
    const m = u.pathname.match(/^\/(shorts|embed)\/([\w-]+)/)
    return m ? video(`https://www.youtube-nocookie.com/embed/${m[2]}`) : null
  }
  if (host === 'vimeo.com') {
    const m = u.pathname.match(/^\/(\d+)/)
    return m ? video(`https://player.vimeo.com/video/${m[1]}`) : null
  }
  if (host === 'instagram.com') {
    // /p/CODE, /reel/CODE, /reels/CODE, /tv/CODE (también con /usuario/ delante)
    const m = u.pathname.match(/\/(p|reel|reels|tv)\/([\w-]+)/)
    if (!m) return null
    const type = m[1] === 'reels' ? 'reel' : m[1]
    return { src: `https://www.instagram.com/${type}/${m[2]}/embed/`, kind: 'instagram' }
  }
  if (host === 'linkedin.com') {
    // Publicación con video: /posts/usuario_texto-activity-123…-xxxx, /feed/update/urn:li:share:123…
    // o el link de /embed/feed/update/urn:li:… que da LinkedIn en "Insertar esta publicación".
    const path = decodeURIComponent(u.pathname)
    const m =
      path.match(/urn:li:(share|ugcPost|activity):(\d+)/) ||
      path.match(/-(share|ugcPost|activity)-(\d+)/)
    if (!m) return null
    return { src: `https://www.linkedin.com/embed/feed/update/urn:li:${m[1]}:${m[2]}`, kind: 'linkedin' }
  }
  return null
}

export const toEmbedUrl = (raw) => parseEmbed(raw)?.src ?? null
