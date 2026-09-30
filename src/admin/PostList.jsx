import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api, ApiError } from './api.js'
import { useAdmin } from './AdminContext.jsx'
import { formatDate } from '../lib/posts.js'

export default function PostList() {
  const { expire } = useAdmin()
  const [posts, setPosts] = useState(null)
  const [error, setError] = useState('')

  const handle = useCallback(
    (err) => {
      if (err instanceof ApiError && err.status === 401) return expire()
      setError(err.message)
    },
    [expire]
  )

  useEffect(() => {
    api.list().then(setPosts).catch(handle)
  }, [handle])

  const remove = async (post) => {
    if (!window.confirm(`¿Borrar "${post.title}"? Esta acción no se puede deshacer.`)) return
    try {
      await api.remove(post.id)
      setPosts((list) => list.filter((p) => p.id !== post.id))
    } catch (err) {
      handle(err)
    }
  }

  return (
    <>
      <div className="adm-bar">
        <h1 className="adm-title">Noticias</h1>
        <Link to="nueva" className="btn btn--primary btn--sm">+ Nueva noticia</Link>
      </div>

      {error && <p className="adm-error" role="alert">{error}</p>}
      {!posts && !error && <p className="adm-muted">Cargando…</p>}
      {posts && !posts.length && (
        <div className="adm-card adm-empty">Todavía no hay noticias. Creá la primera.</div>
      )}

      {!!posts?.length && (
        <div className="adm-card adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Categoría</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th aria-label="Acciones" />
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id}>
                  <td className="adm-table__title">{p.title}</td>
                  <td>{p.category}</td>
                  <td>{formatDate(p.published_at)}</td>
                  <td>
                    <span className={`adm-badge ${p.published ? 'is-on' : ''}`}>
                      {p.published ? 'Publicada' : 'Borrador'}
                    </span>
                  </td>
                  <td className="adm-actions">
                    {p.published && (
                      <a href={`/noticias/${p.slug}`} target="_blank" rel="noreferrer">Ver</a>
                    )}
                    <Link to={`editar/${p.id}`}>Editar</Link>
                    <button type="button" className="adm-link-danger" onClick={() => remove(p)}>
                      Borrar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
