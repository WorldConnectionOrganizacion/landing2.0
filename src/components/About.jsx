export default function About() {
  return (
    <section id="nosotros" className="section about">
      <div className="container about__grid">
        <div className="about__media reveal">
          <img
            src="/images/about-equipo.jpg"
            alt="Equipo comercial de World Connection trabajando"
            className="about__img about__img--tall"
            loading="lazy"
          />
          <img
            src="/images/about-capacitacion.jpg"
            alt="Capacitación del equipo comercial"
            className="about__img"
            loading="lazy"
          />
        </div>

        <div className="about__copy reveal" data-reveal-delay="120">
          <span className="eyebrow">¿Quiénes somos?</span>
          <h2 className="section-title">
            Una de las principales empresas de telecomunicaciones del Gran Mendoza.
          </h2>
          <p className="lead">
            En World Connection promovemos productos y servicios de telecomunicaciones
            de clientes nacionales e internacionales. Combinamos equipos comerciales
            entrenados, procesos claros y tecnología para llegar a más personas y
            generar resultados que se pueden medir.
          </p>
          <ul className="about__list">
            <li>
              <span className="about__dot" />
              Gestión comercial integral: prospección, venta y postventa.
            </li>
            <li>
              <span className="about__dot" />
              Equipos formados y acompañados día a día.
            </li>
            <li>
              <span className="about__dot" />
              Foco en la experiencia del cliente y en resultados sostenibles.
            </li>
          </ul>
          <a href="#servicios" className="btn btn--link">Ver lo que hacemos →</a>
        </div>
      </div>
    </section>
  )
}
