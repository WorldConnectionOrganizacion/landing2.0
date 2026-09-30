// Interpreta un link de YouTube/Vimeo/Instagram. Devuelve { src, kind } o null si no se reconoce.
// kind: 'video' (16:9) | 'instagram' (vertical, tarjeta de Instagram).
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
  return null
}

export const toEmbedUrl = (raw) => parseEmbed(raw)?.src ?? null
