import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchLatestPosts, formatDate } from '../lib/posts.js'

export default function News() {
  const [posts, setPosts] = useState([])
  const trackRef = useRef(null)

  useEffect(() => {
    let active = true
    fetchLatestPosts()
      .then((data) => active && setPosts(data))
      .catch(() => {}) // sin noticias, la sección simplemente no se muestra
    return () => { active = false }
  }, [])

  if (!posts.length) return null

  const scrollBy = (dir) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <section id="noticias" className="section section--soft news">
      <div className="container">
        <div className="section-head section-head--center">
          <span className="eyebrow">Noticias</span>
          <h2 className="section-title">Mantenete al día con World Connection</h2>
        </div>

        <div className="news__carousel">
          <button
            type="button"
            className="news__nav news__nav--prev"
            aria-label="Noticias anteriores"
            onClick={() => scrollBy(-1)}
          >
            ‹
          </button>

          <div className="news__track" ref={trackRef}>
            {posts.map((p) => (
              <Link key={p.id} to={`/noticias/${p.slug}`} className="news-card">
                <span className="news-card__tag">{p.category}</span>
                {p.cover_url && (
                  <img
                    src={p.cover_url}
                    alt=""
                    className="news-card__img"
                    loading="lazy"
                  />
                )}
                <time className="news-card__date" dateTime={p.published_at}>
                  {formatDate(p.published_at)}
                </time>
                <h3 className="news-card__title">{p.title}</h3>
                {p.excerpt && <p className="news-card__text">{p.excerpt}</p>}
                <span className="news-card__more">Más información →</span>
              </Link>
            ))}
          </div>

          <button
            type="button"
            className="news__nav news__nav--next"
            aria-label="Noticias siguientes"
            onClick={() => scrollBy(1)}
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
