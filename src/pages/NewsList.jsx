import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchPostsPage } from '../lib/posts.js'
import NewsCard from '../components/NewsCard.jsx'
import Pagination from '../components/Pagination.jsx'
import useSeo from '../hooks/useSeo.js'

const PAGE_SIZE = 9

export default function NewsList() {
  const [params, setParams] = useSearchParams()
  const page = Math.max(1, parseInt(params.get('pagina'), 10) || 1)
  const [posts, setPosts] = useState([])
  const [total, setTotal] = useState(0)
  const [status, setStatus] = useState('loading') // loading | ready | error
  const topRef = useRef(null)
  const first = useRef(true)

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  const goTo = (n) => setParams(n > 1 ? { pagina: String(n) } : {})

  useSeo({
    title: page > 1 ? `Noticias (página ${page}) | World Connection Mendoza` : 'Noticias | World Connection Mendoza',
    description:
      'Novedades, comunicados y noticias de World Connection: telecomunicaciones y gestión comercial multicanal en Mendoza, Argentina.',
  })

  useEffect(() => {
    let active = true
    setStatus('loading')
    fetchPostsPage(page, PAGE_SIZE)
      .then(({ posts, total, outOfRange }) => {
        if (!active) return
        if (outOfRange && page > 1) return setParams({}, { replace: true })
        setPosts(posts)
        setTotal(total)
        setStatus('ready')
      })
      .catch(() => active && setStatus('error'))
    return () => { active = false }
  }, [page, setParams])

  // Al cambiar de página, volver al inicio del listado (no en la primera carga).
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [page])

  return (
    <main className="page-top">
      <section className="section section--soft newslist">
        <div className="container">
          <div className="section-head section-head--center" ref={topRef}>
            <span className="eyebrow">Noticias</span>
            <h1 className="section-title">Novedades de World Connection</h1>
          </div>

          {status === 'loading' && !posts.length && <p className="page-msg">Cargando…</p>}
          {status === 'error' && (
            <p className="page-msg">No pudimos cargar las noticias. Probá nuevamente más tarde.</p>
          )}
          {status === 'ready' && !posts.length && (
            <p className="page-msg">Todavía no hay noticias publicadas.</p>
          )}

          {!!posts.length && (
            <>
              <div
                className={`newslist__grid ${status === 'loading' ? 'is-loading' : ''}`}
                aria-busy={status === 'loading'}
              >
                {posts.map((p) => (
                  <NewsCard key={p.id} post={p} />
                ))}
              </div>
              <Pagination page={page} totalPages={totalPages} onChange={goTo} />
            </>
          )}
        </div>
      </section>
    </main>
  )
}
