const services = [
  {
    icon: '📞',
    title: 'Venta telefónica',
    text: 'Campañas outbound y cierre de ventas inbound con guiones, métricas y seguimiento.',
  },
  {
    icon: '💬',
    title: 'Gestión de leads digitales',
    text: 'Seguimiento de formularios web y redes sociales para convertir interesados en clientes.',
  },
  {
    icon: '📊',
    title: 'Encuestas y activaciones',
    text: 'Relevamiento de información, auditorías y acciones promocionales en punto de venta.',
  },
  {
    icon: '✅',
    title: 'Control de calidad y postventa',
    text: 'Validación de datos, acompañamiento administrativo y reportes de efectividad.',
  },
  {
    icon: '🎓',
    title: 'Formación de equipos comerciales',
    text: 'Capacitación continua para que cada vendedor represente la marca con excelencia.',
  },
  {
    icon: '⚙️',
    title: 'Sistemas y tecnología',
    text: 'Sistemas de uso interno, automatizaciones y CRM que centralizan nuestras tecnologías y protegen los datos con foco en la seguridad.',
  },
  {
    icon: '🗂️',
    title: 'Administración y back office',
    text: 'Equipo administrativo disponible para dar soluciones, gestionar procesos y dar soporte operativo a cada campaña.',
  },
]

export default function Services() {
  return (
    <section id="servicios" className="section services">
      <div className="container">
        <div className="section-head section-head--center reveal">
          <span className="eyebrow">Qué hacemos</span>
          <h2 className="section-title">
            Una estructura completa de gestión comercial multicanal
          </h2>
        </div>

        <div className="services__grid">
          {services.map((s, i) => (
            <article
              key={s.title}
              className="service-card reveal"
              data-reveal-delay={(i % 3) * 90}
            >
              <span className="service-card__icon">{s.icon}</span>
              <h3 className="service-card__title">{s.title}</h3>
              <p className="service-card__text">{s.text}</p>
              <a href="#contacto" className="btn btn--link service-card__link">
                Conocé más →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
