import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchPostBySlug, formatDate } from '../lib/posts.js'
import { toEmbedUrl } from '../lib/video.js'

function Block({ block }) {
  if (block.type === 'text') {
    return (
      <div className="post__text">
        {String(block.text || '')
          .split(/\n{2,}/)
          .filter(Boolean)
          .map((para, i) => (
            <p key={i}>{para}</p>
          ))}
      </div>
    )
  }
  if (block.type === 'image' && block.url) {
    return (
      <figure className="post__figure">
        <img src={block.url} alt={block.caption || ''} loading="lazy" />
        {block.caption && <figcaption>{block.caption}</figcaption>}
      </figure>
    )
  }
  if (block.type === 'video' && block.url) {
    const embed = toEmbedUrl(block.url)
    return embed ? (
      <div className="post__video">
        <iframe
          src={embed}
          title="Video"
          loading="lazy"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    ) : (
      <p className="post__text">
        <a href={block.url} target="_blank" rel="noreferrer noopener" className="btn btn--link">
          Ver video →
        </a>
      </p>
    )
  }
  return null
}

const DEFAULT_TITLE = 'World Connection | Telecomunicaciones y Gestión Comercial'

export default function NewsPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [status, setStatus] = useState('loading') // loading | ready | notfound | error

  useEffect(() => {
    setStatus('loading')
    let active = true
    fetchPostBySlug(slug)
      .then((data) => {
        if (!active) return
        if (!data) return setStatus('notfound')
        setPost(data)
        setStatus('ready')
        document.title = `${data.title} | World Connection`
      })
      .catch(() => active && setStatus('error'))
    return () => {
      active = false
      document.title = DEFAULT_TITLE
    }
  }, [slug])

  if (status !== 'ready') {
    return (
      <main className="page-top">
        <section className="section">
          <div className="container post__narrow">
            <p className="page-msg">
              {status === 'loading' && 'Cargando…'}
              {status === 'notfound' && 'La noticia que buscás no existe o ya no está disponible.'}
              {status === 'error' && 'No pudimos cargar la noticia. Probá nuevamente más tarde.'}
            </p>
            {status !== 'loading' && (
              <p className="page-msg">
                <Link to="/noticias" className="btn btn--link">← Volver a Noticias</Link>
              </p>
            )}
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="page-top">
      <article className="section post">
        <div className="container post__narrow">
          <Link to="/noticias" className="btn btn--link post__back">← Todas las noticias</Link>
          <span className="news-card__tag">{post.category}</span>
          <h1 className="post__title">{post.title}</h1>
          <time className="post__date" dateTime={post.published_at}>
            {formatDate(post.published_at)}
          </time>
          {post.cover_url && (
            <img src={post.cover_url} alt="" className="post__cover" />
          )}
          {post.excerpt && <p className="lead post__lead">{post.excerpt}</p>}
          {(post.blocks || []).map((b, i) => (
            <Block key={i} block={b} />
          ))}
        </div>
      </article>
    </main>
  )
}
