import { Link } from 'react-router-dom'
import { formatDate } from '../lib/posts.js'

// `decorative`: copia duplicada del carrusel infinito; fuera del árbol de accesibilidad y del tab.
export default function NewsCard({ post, decorative = false, ...rest }) {
  return (
    <Link
      to={`/noticias/${post.slug}`}
      className="news-card"
      aria-hidden={decorative || undefined}
      tabIndex={decorative ? -1 : undefined}
      {...rest}
    >
      <span className="news-card__tag">{post.category}</span>
      {post.cover_url && (
        <img src={post.cover_url} alt="" className="news-card__img" loading="lazy" />
      )}
      <time className="news-card__date" dateTime={post.published_at}>
        {formatDate(post.published_at)}
      </time>
      <h3 className="news-card__title">{post.title}</h3>
      {post.excerpt && <p className="news-card__text">{post.excerpt}</p>}
      <span className="news-card__more">Más información →</span>
    </Link>
  )
}
