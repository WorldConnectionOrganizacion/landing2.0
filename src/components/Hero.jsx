export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__grid"></span>
        <span className="hero__glow hero__glow--1"></span>
        <span className="hero__glow hero__glow--2"></span>
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="eyebrow eyebrow--light">Gestión comercial multicanal</span>
          <h1 className="hero__title">
            Conectamos marcas y personas con soluciones de{' '}
            <span className="text-gradient">telecomunicaciones</span> que generan
            resultados.
          </h1>
          <p className="hero__sub">
            Promovemos productos y servicios de clientes nacionales e internacionales
            con equipos comerciales entrenados, tecnología y una gestión cercana y medible.
          </p>
          <div className="hero__actions">
            <a href="#contacto" className="btn btn--primary">Agendá una reunión</a>
            <a href="#servicios" className="btn btn--ghost">Conocé nuestros servicios</a>
          </div>

          <ul className="hero__stats">
            <li>
              <strong>+6</strong>
              <span>años en el rubro</span>
            </li>
            <li>
              <strong>+200</strong>
              <span>colaboradores</span>
            </li>
            <li>
              <strong>Multicanal</strong>
              <span>telefónico · digital</span>
            </li>
          </ul>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="hero__card hero__card--main">
            <img src="/logoGrande.jpeg" alt="World Connection" className="hero__logo-img" />
          </div>
          <div className="hero__card hero__card--float">
            <span className="hero__chip">📈 Crecimiento sostenido</span>
            <span className="hero__chip">🤝 Clientes nacionales e internacionales</span>
          </div>
        </div>
      </div>

      <a href="#nosotros" className="hero__scroll" aria-label="Bajar">
        <span className="hero__mouse"><span></span></span>
        <span className="hero__scroll-text">Descubrí más</span>
      </a>
    </section>
  )
}
