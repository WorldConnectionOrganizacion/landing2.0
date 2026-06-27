export default function Careers() {
  return (
    <section id="trabaja" className="section section--soft careers">
      <div className="container careers__grid">
        <div className="careers__copy reveal">
          <span className="eyebrow">Trabajá con nosotros</span>
          <h2 className="section-title">Sumate a nuestro equipo</h2>
          <p className="lead">
            Creemos en el crecimiento de las personas. Buscamos talento con ganas de
            aprender, superarse y crecer dentro de una empresa en plena expansión.
            Si te gustan los desafíos comerciales, este es tu lugar.
          </p>
          <a
            href="https://wa.me/5492613993207?text=Hola%20World%20Connection,%20quiero%20enviar%20mi%20CV"
            target="_blank"
            rel="noreferrer"
            className="btn btn--primary"
          >
            Enviá tu CV
          </a>
        </div>
        <div className="careers__media reveal" data-reveal-delay="120">
          <img
            src="/images/careers-equipo.jpg"
            alt="Equipo de World Connection celebrando resultados"
            className="careers__img"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
