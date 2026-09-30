// Números de página con elipsis: 1 … 4 5 6 … 12
function pageItems(current, total) {
  const set = new Set([1, total, current - 1, current, current + 1])
  const nums = [...set].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b)
  const items = []
  nums.forEach((n, i) => {
    if (i && n - nums[i - 1] > 1) items.push(`gap-${n}`)
    items.push(n)
  })
  return items
}

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null
  return (
    <nav className="pager" aria-label="Paginación de noticias">
      <button
        type="button"
        className="pager__btn"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        ← Anterior
      </button>

      <ul className="pager__list">
        {pageItems(page, totalPages).map((it) =>
          typeof it === 'string' ? (
            <li key={it} className="pager__gap" aria-hidden="true">…</li>
          ) : (
            <li key={it}>
              <button
                type="button"
                className={`pager__num ${it === page ? 'is-current' : ''}`}
                aria-current={it === page ? 'page' : undefined}
                aria-label={`Página ${it}`}
                onClick={() => onChange(it)}
              >
                {it}
              </button>
            </li>
          )
        )}
      </ul>

      <button
        type="button"
        className="pager__btn"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
      >
        Siguiente →
      </button>
    </nav>
  )
}
