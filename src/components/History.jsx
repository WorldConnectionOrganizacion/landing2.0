const milestones = [
  {
    year: 'Inicios',
    title: 'Una idea, un equipo',
    text: 'World Connection nace en el Gran Mendoza con la misión de conectar marcas de telecomunicaciones con más personas.',
  },
  {
    year: 'Crecimiento',
    title: 'Equipos que se multiplican',
    text: 'Pasamos de un grupo pequeño a más de 200 colaboradores, profesionalizando cada proceso comercial.',
  },
  {
    year: 'Hoy',
    title: 'Referentes del sector',
    text: 'Somos una de las empresas de telecomunicaciones de mayor crecimiento de la región, con clientes nacionales e internacionales.',
  },
]

export default function History() {
  return (
    <section className="section history">
      <div className="container">
        <div className="section-head section-head--center reveal">
          <span className="eyebrow">Nuestra historia</span>
          <h2 className="section-title">¿Por qué elegir World Connection?</h2>
        </div>
        <div className="history__timeline">
          {milestones.map((m, i) => (
            <div key={m.year} className="history__item reveal" data-reveal-delay={i * 110}>
              <div className="history__marker">
                <span>{i + 1}</span>
              </div>
              <div className="history__content">
                <span className="history__year">{m.year}</span>
                <h3 className="history__title">{m.title}</h3>
                <p className="history__text">{m.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
