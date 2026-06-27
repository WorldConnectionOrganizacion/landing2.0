const pillars = [
  {
    icon: '🎯',
    title: 'Propósito',
    text: 'Conectamos personas para transformar su vida cotidiana, generando oportunidades reales de crecimiento, aprendizaje y vínculos significativos con otros.',
  },
  {
    icon: '🚀',
    title: 'Misión',
    text: 'Somos una empresa de servicios de telecomunicación que conecta personas y organizaciones, brindando soluciones confiables y cercanas con el objetivo de mejorar la experiencia de la comunicación.',
  },
  {
    icon: '🌎',
    title: 'Visión',
    text: 'Ser una organización líder en la comercialización de servicios, reconocida por la calidez y conexión humana a nivel mundial.',
  },
]

const values = [
  'Logro de resultados',
  'Bienestar personal',
  'Compromiso',
  'Empatía',
]

export default function WhyUs() {
  return (
    <section className="section section--soft why">
      <div className="container">
        <div className="section-head section-head--center reveal">
          <span className="eyebrow">¿Por qué elegirnos?</span>
          <h2 className="section-title">Nuestro propósito y visión</h2>
          <p className="lead why__intro">
            World Connection fue fundada el 7 de abril de 2020, con la convicción de
            que comunicar es conectar personas.
          </p>
        </div>

        <div className="why__pillars">
          {pillars.map((p, i) => (
            <article key={p.title} className="why__pillar reveal" data-reveal-delay={i * 100}>
              <span className="why__pillar-icon">{p.icon}</span>
              <h3 className="why__pillar-title">{p.title}</h3>
              <p className="why__pillar-text">{p.text}</p>
            </article>
          ))}
        </div>

        <div className="why__values reveal">
          <h3 className="why__values-title">Nuestros valores</h3>
          <ul className="why__values-list">
            {values.map((v) => (
              <li key={v} className="why__value">
                <span className="why__value-check">✓</span>
                {v}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
