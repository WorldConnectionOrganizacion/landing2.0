import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchLatestPosts } from '../lib/posts.js'
import NewsCard from './NewsCard.jsx'

const SPEED = 40 // px por segundo: desplazamiento lento y continuo
const ARROW_PAUSE_MS = 900 // tiempo que dura el desplazamiento suave de una flecha

export default function News() {
  const [posts, setPosts] = useState([])
  const [loop, setLoop] = useState(false) // true: hay más tarjetas que ancho → se duplica para el bucle
  const trackRef = useRef(null)
  const sectionRef = useRef(null)
  const state = useRef({ hover: false, visible: false, until: 0 })

  useEffect(() => {
    let active = true
    fetchLatestPosts()
      .then((data) => active && setPosts(data))
      .catch(() => {}) // sin noticias, la sección simplemente no se muestra
    return () => { active = false }
  }, [])

  // Decide si hace falta el bucle (las tarjetas no entran en el ancho visible).
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const measure = () => {
      const cards = el.children
      if (!cards.length) return
      const dup = el.querySelector('[data-dup]')
      if (dup) {
        const setWidth = dup.offsetLeft - cards[0].offsetLeft
        setLoop(setWidth > el.clientWidth + 8)
      } else {
        setLoop(el.scrollWidth > el.clientWidth + 8)
      }
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [posts.length, loop])

  // Solo se mueve mientras la sección está en pantalla.
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { state.current.visible = e.isIntersecting }, {
      threshold: 0.2,
    })
    obs.observe(el)
    return () => obs.disconnect()
  }, [posts.length])

  // Ancho de un juego completo de tarjetas (con su gap): el largo del bucle.
  const setWidth = () => {
    const el = trackRef.current
    const dup = el?.querySelector('[data-dup]')
    return dup ? dup.offsetLeft - el.firstElementChild.offsetLeft : 0
  }

  // Desplazamiento continuo con requestAnimationFrame.
  useEffect(() => {
    if (!loop) return
    const el = trackRef.current
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf
    let last = performance.now()
    let pos = el.scrollLeft

    const tick = (now) => {
      const dt = Math.min(now - last, 100) / 1000
      last = now
      const s = state.current
      const w = setWidth()
      const busy = s.hover || !s.visible || document.hidden || now < s.until

      if (busy) {
        pos = el.scrollLeft // seguir la posición real (mouse, dedo o flechas)
        // Con el usuario moviendo a mano, normalizamos sin que se note.
        if (w && now >= s.until && pos >= w) {
          el.scrollLeft = pos - w
          pos -= w
        }
      } else if (w) {
        pos += SPEED * dt
        if (pos >= w) pos -= w
        el.scrollLeft = pos
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [loop, posts.length])

  const onArrow = useCallback((dir) => {
    const el = trackRef.current
    if (!el) return
    const card = el.firstElementChild
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    const amount = card.getBoundingClientRect().width + gap
    const w = setWidth()
    state.current.until = performance.now() + ARROW_PAUSE_MS
    // Al inicio del bucle, saltamos a la copia idéntica para poder retroceder.
    if (loop && w && dir < 0 && el.scrollLeft < amount) el.scrollLeft += w
    el.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }, [loop])

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
          onMouseEnter={() => (state.current.hover = true)}
          onMouseLeave={() => (state.current.hover = false)}
          onFocus={() => (state.current.hover = true)}
          onBlur={() => (state.current.hover = false)}
          onTouchStart={() => (state.current.hover = true)}
          onTouchEnd={() => setTimeout(() => (state.current.hover = false), 2500)}
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
            {loop &&
              posts.map((p, i) => (
                <NewsCard
                  key={`dup-${p.id}`}
                  post={p}
                  decorative
                  data-dup={i === 0 ? '' : undefined}
                />
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
