import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_IMAGE,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
} from '../lib/site.js'

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  el.href = href
}

const trim = (s, max) => {
  const t = String(s || '').replace(/\s+/g, ' ').trim()
  return t.length > max ? `${t.slice(0, max - 1).trimEnd()}…` : t
}

/**
 * Título, descripción, canonical, Open Graph / Twitter y datos estructurados por página.
 * `jsonLd`: objeto schema.org adicional de la página (se reemplaza al cambiar de ruta).
 * `noindex`: pide a los buscadores no indexar la página.
 */
export default function useSeo({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  type = 'website',
  jsonLd,
  noindex = false,
} = {}) {
  const { pathname, search } = useLocation()
  const ld = jsonLd ? JSON.stringify(jsonLd) : ''

  useEffect(() => {
    const desc = trim(description, 160)
    const url = `${SITE_URL}${pathname === '/' ? '/' : pathname}${search}`

    document.title = title
    setMeta('name', 'description', desc)
    setCanonical(url)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', image)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', desc)
    setMeta('name', 'twitter:image', image)

    // robots: solo existe mientras se pide noindex (lo gestiona este hook)
    document.head.querySelector('meta[name="robots"][data-seo]')?.remove()
    if (noindex) {
      const robots = document.createElement('meta')
      robots.name = 'robots'
      robots.content = 'noindex, follow'
      robots.setAttribute('data-seo', '')
      document.head.appendChild(robots)
    }

    // JSON-LD de la página (distinto del de la organización, que vive en index.html)
    document.getElementById('ld-page')?.remove()
    if (ld) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = 'ld-page'
      script.textContent = ld
      document.head.appendChild(script)
    }
    return () => document.getElementById('ld-page')?.remove()
  }, [title, description, image, type, noindex, ld, pathname, search])
}
