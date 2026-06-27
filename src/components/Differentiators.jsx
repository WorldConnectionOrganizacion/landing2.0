const items = [
  {
    icon: '🔀',
    title: 'Multicanalidad real',
    text: 'Telefónico y digital trabajando de forma integrada.',
  },
  {
    icon: '🧩',
    title: 'Flexibilidad total',
    text: 'Adaptamos cada campaña a los objetivos y tiempos del cliente.',
  },
  {
    icon: '👥',
    title: 'Cultura de equipo',
    text: 'Personas formadas, motivadas y comprometidas con cada marca.',
  },
  {
    icon: '📈',
    title: 'Resultados sostenibles',
    text: 'Crecimiento medible y decisiones basadas en datos.',
  },
]

export default function Differentiators() {
  return (
    <section className="section diff">
      <div className="container">
        <div className="section-head section-head--center reveal">
          <span className="eyebrow">Lo que nos hace únicos</span>
          <h2 className="section-title">Cuatro razones para confiar en nosotros</h2>
        </div>
        <div className="diff__grid">
          {items.map((item, i) => (
            <div key={item.title} className="diff__card reveal" data-reveal-delay={i * 90}>
              <span className="diff__icon">{item.icon}</span>
              <h3 className="diff__title">{item.title}</h3>
              <p className="diff__text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
