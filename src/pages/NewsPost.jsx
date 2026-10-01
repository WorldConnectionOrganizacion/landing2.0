import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchPostBySlug, formatDate } from '../lib/posts.js'
import { parseEmbed } from '../lib/video.js'
import useSeo from '../hooks/useSeo.js'
import { DEFAULT_IMAGE, SITE_NAME, SITE_URL } from '../lib/site.js'

function Block({ block }) {
  if (block.hidden) return null
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
    const embed = parseEmbed(block.url)
    if (embed?.kind === 'instagram') {
      return (
        <div className="post__ig">
          <iframe src={embed.src} title="Publicación de Instagram" loading="lazy" allowFullScreen />
        </div>
      )
    }
    if (embed?.kind === 'linkedin') {
      return (
        <div className="post__li">
          <iframe src={embed.src} title="Publicación de LinkedIn" loading="lazy" allowFullScreen />
        </div>
      )
    }
    return embed ? (
      <div className="post__video">
        <iframe
          src={embed.src}
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


// Datos SEO de una noticia: descripción (extracto o primer texto), imagen y NewsArticle.
function postSeo(post, status) {
  if (status === 'notfound' || status === 'error') {
    return { title: `Noticia no encontrada | ${SITE_NAME}`, noindex: true }
  }
  if (!post) return { title: `Noticias | ${SITE_NAME}` }

  const hidden = post.hidden_fields || []
  const firstText = (post.blocks || []).find((b) => b.type === 'text' && !b.hidden && b.text)?.text
  const description = post.excerpt || firstText || undefined
  const image = post.cover_url && !hidden.includes('cover') ? post.cover_url : DEFAULT_IMAGE
  const url = `${SITE_URL}/noticias/${post.slug}`

  return {
    title: `${post.title} | ${SITE_NAME}`,
    description,
    image,
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: post.title.slice(0, 110),
      description,
      image: [image],
      datePublished: post.published_at,
      dateModified: post.updated_at || post.published_at,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo-header.png` },
      },
    },
  }
}

export default function NewsPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [status, setStatus] = useState('loading') // loading | ready | notfound | error

  useSeo(postSeo(post, status))

  useEffect(() => {
    setStatus('loading')
    setPost(null)
    let active = true
    fetchPostBySlug(slug)
      .then((data) => {
        if (!active) return
        if (!data) return setStatus('notfound')
        setPost(data)
        setStatus('ready')
      })
      .catch(() => active && setStatus('error'))
    return () => { active = false }
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

  const hidden = post.hidden_fields || []
  const show = {
    category: !hidden.includes('category') && post.category,
    cover: !hidden.includes('cover') && post.cover_url,
    date: !hidden.includes('date'),
    excerpt: !hidden.includes('excerpt') && post.excerpt,
  }

  return (
    <main className="page-top">
      <article className="section post">
        <div className="container post__narrow">
          <Link to="/noticias" className="btn btn--link post__back">← Todas las noticias</Link>
          <header className="post__head">
            {show.category && <span className="news-card__tag">{post.category}</span>}
            <h1 className="post__title">{post.title}</h1>
            {show.date && (
              <time className="post__date" dateTime={post.published_at}>
                {formatDate(post.published_at)}
              </time>
            )}
          </header>
          {show.cover && <img src={post.cover_url} alt="" className="post__cover" />}
          {show.excerpt && <p className="lead post__lead">{post.excerpt}</p>}
          {(post.blocks || []).map((b, i) => (
            <Block key={i} block={b} />
          ))}
        </div>
      </article>
    </main>
  )
}
