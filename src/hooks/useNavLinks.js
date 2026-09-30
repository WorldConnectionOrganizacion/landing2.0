import { useEffect, useState } from 'react'
import { fetchLatestPosts } from '../lib/posts.js'
import { navLinks } from '../data/navLinks.js'

// Una sola consulta por carga de página, compartida por Navbar y Footer.
let hasNewsPromise
const checkHasNews = () => {
  hasNewsPromise ??= fetchLatestPosts(1).then((posts) => posts.length > 0).catch(() => false)
  return hasNewsPromise
}

// Links de navegación; "Noticias" solo aparece si hay al menos una noticia publicada.
export default function useNavLinks() {
  const [hasNews, setHasNews] = useState(false)

  useEffect(() => {
    let active = true
    checkHasNews().then((v) => active && setHasNews(v))
    return () => { active = false }
  }, [])

  return navLinks.filter((l) => !l.requiresNews || hasNews)
}
