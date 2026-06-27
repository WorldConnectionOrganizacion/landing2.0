const clients = [
  'Movistar',
  'Claro',
  'Personal',
  'DirecTV',
  'Telecentro',
  'Flow',
  'Fibertel',
]

export default function Clients() {
  const track = [...clients, ...clients]
  return (
    <section className="section section--soft clients">
      <div className="container">
        <div className="clients__head reveal">
          <span className="eyebrow">Confían en nosotros</span>
          <h2 className="section-title clients__title">
            Trabajamos junto a marcas líderes del sector
          </h2>
        </div>
      </div>

      <div className="clients__marquee reveal">
        <div className="clients__track">
          {track.map((c, i) => (
            <div key={`${c}-${i}`} className="clients__logo" title={`Logo: ${c}`}>
              {c}
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        <p className="clients__note">
          Logos de referencia · reemplazá por las marcas reales con las que trabaja
          World Connection.
        </p>
      </div>
    </section>
  )
}
