import { Link } from 'react-router-dom'
import useSeo from '../hooks/useSeo.js'

export default function NotFound() {
  useSeo({ title: 'Página no encontrada | World Connection', noindex: true })
  return (
    <main className="page-top">
      <section className="section">
        <div className="container post__narrow">
          <span className="eyebrow">Error 404</span>
          <h1 className="section-title">Página no encontrada</h1>
          <p className="lead" style={{ margin: '16px 0 28px' }}>
            La dirección que buscás no existe o fue movida.
          </p>
          <Link to="/" className="btn btn--primary">Volver al inicio</Link>
        </div>
      </section>
    </main>
  )
}
