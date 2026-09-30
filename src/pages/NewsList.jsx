import { useEffect, useState } from 'react'
import { fetchAllPosts } from '../lib/posts.js'
import NewsCard from '../components/NewsCard.jsx'

const DEFAULT_TITLE = 'World Connection | Telecomunicaciones y Gestión Comercial'

export default function NewsList() {
  const [posts, setPosts] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error

  useEffect(() => {
    document.title = 'Noticias | World Connection'
    let active = true
    fetchAllPosts()
      .then((data) => active && (setPosts(data), setStatus('ready')))
      .catch(() => active && setStatus('error'))
    return () => {
      active = false
      document.title = DEFAULT_TITLE
    }
  }, [])

  return (
    <main className="page-top">
      <section className="section section--soft newslist">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">Noticias</span>
            <h1 className="section-title">Novedades de World Connection</h1>
          </div>

          {status === 'loading' && <p className="page-msg">Cargando…</p>}
          {status === 'error' && (
            <p className="page-msg">No pudimos cargar las noticias. Probá nuevamente más tarde.</p>
          )}
          {status === 'ready' && !posts.length && (
            <p className="page-msg">Todavía no hay noticias publicadas.</p>
          )}
          {!!posts.length && (
            <div className="newslist__grid">
              {posts.map((p) => (
                <NewsCard key={p.id} post={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
