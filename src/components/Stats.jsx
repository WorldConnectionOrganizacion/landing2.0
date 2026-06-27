import useInView from '../hooks/useInView.js'
import useCountUp from '../hooks/useCountUp.js'

const stats = [
  { value: 6, prefix: '+', suffix: '', label: 'años en el rubro' },
  { value: 200, prefix: '+', suffix: '', label: 'colaboradores' },
  { value: 50000, prefix: '+', suffix: '', label: 'contactos gestionados' },
  { value: 98, prefix: '', suffix: '%', label: 'clientes que nos recomiendan' },
]

function formatValue(n) {
  return n >= 1000 ? n.toLocaleString('es-AR') : n
}

function StatItem({ stat, run }) {
  const value = useCountUp(stat.value, run)
  return (
    <div className="stats__item">
      <div className="stats__number">
        {stat.prefix}
        {formatValue(value)}
        {stat.suffix}
      </div>
      <div className="stats__label">{stat.label}</div>
    </div>
  )
}

export default function Stats() {
  const [ref, inView] = useInView(0.35)
  return (
    <section className="stats" ref={ref}>
      <div className="container stats__grid">
        {stats.map((s) => (
          <StatItem key={s.label} stat={s} run={inView} />
        ))}
      </div>
    </section>
  )
}
