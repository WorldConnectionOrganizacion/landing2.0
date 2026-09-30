import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchLatestPosts } from '../lib/posts.js'
import NewsCard from './NewsCard.jsx'

const AUTOPLAY_MS = 4500

export default function News() {
  const [posts, setPosts] = useState([])
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)
  const [manual, setManual] = useState(0) // se incrementa al usar las flechas: reinicia el temporizador
  const trackRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    let active = true
    fetchLatestPosts()
      .then((data) => active && setPosts(data))
      .catch(() => {}) // sin noticias, la sección simplemente no se muestra
    return () => { active = false }
  }, [])

  // Solo avanza mientras la sección está en pantalla.
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.2,
    })
    obs.observe(el)
    return () => obs.disconnect()
  }, [posts.length])

  // Avanza una tarjeta; al llegar al final (o al inicio, hacia atrás) da la vuelta.
  const step = useCallback((dir) => {
    const el = trackRef.current
    if (!el) return
    const card = el.firstElementChild
    if (!card) return
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    const amount = card.getBoundingClientRect().width + gap
    const max = el.scrollWidth - el.clientWidth
    if (max <= 4) return // todo entra en pantalla: nada que mover
    if (dir > 0 && el.scrollLeft >= max - 4) el.scrollTo({ left: 0, behavior: 'smooth' })
    else if (dir < 0 && el.scrollLeft <= 4) el.scrollTo({ left: max, behavior: 'smooth' })
    else el.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }, [])

  const onArrow = (dir) => {
    step(dir)
    setManual((n) => n + 1)
  }

  useEffect(() => {
    if (posts.length < 2 || hovering || !visible) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      if (!document.hidden) step(1)
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [posts.length, hovering, visible, manual, step])

  if (!posts.length) return null

  return (
    <section id="noticias" className="section section--soft news" ref={sectionRef}>
      <div className="container">
        <div className="section-head section-head--center">
          <span className="eyebrow">Noticias</span>
          <h2 className="section-title">Mantenete al día con World Connection</h2>
        </div>

        <div
          className="news__carousel"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onFocus={() => setHovering(true)}
          onBlur={() => setHovering(false)}
          onTouchStart={() => setHovering(true)}
          onTouchEnd={() => setTimeout(() => setHovering(false), 3000)}
        >
          <button
            type="button"
            className="news__nav news__nav--prev"
            aria-label="Noticias anteriores"
            onClick={() => onArrow(-1)}
          >
            ‹
          </button>

          <div className="news__track" ref={trackRef}>
            {posts.map((p) => (
              <NewsCard key={p.id} post={p} />
            ))}
          </div>

          <button
            type="button"
            className="news__nav news__nav--next"
            aria-label="Noticias siguientes"
            onClick={() => onArrow(1)}
          >
            ›
          </button>
        </div>

        <div className="news__all">
          <Link to="/noticias" className="btn btn--primary">Entérate de todo</Link>
        </div>
      </div>
    </section>
  )
}
