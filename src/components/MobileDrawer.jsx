import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import { contactLink } from '../data/navLinks.js'
import SocialLinks from './SocialLinks.jsx'

const SECTION_OFFSET = 0.35 // la sección "activa" es la que cruza el 35 % superior de la pantalla

// Id de la sección de la home que está a la vista (para resaltarla en el menú).
function currentSectionId(ids) {
  let active = null
  for (const id of ids) {
    const el = document.getElementById(id)
    if (el && el.getBoundingClientRect().top <= window.innerHeight * SECTION_OFFSET) active = id
  }
  return active
}

const FOCUSABLE = 'a[href], button:not([disabled])'

/**
 * Menú lateral deslizable. Se dibuja en <body> (portal) para no depender del header,
 * cuyo backdrop-filter rompería el posicionamiento fijo.
 */
export default function MobileDrawer({ open, onClose, links, returnFocusRef }) {
  const { pathname, hash, key } = useLocation()
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const wasOpen = useRef(false)
  const activeId = useRef(null)

  // Sección activa: se calcula al abrir (con la página quieta, detrás del menú).
  if (open && !wasOpen.current && pathname === '/') {
    activeId.current = currentSectionId(links.map((l) => l.to?.hash?.slice(1)).filter(Boolean))
  }

  // Cerrar al navegar.
  useEffect(() => { onClose() }, [key]) // eslint-disable-line react-hooks/exhaustive-deps

  // Foco, Escape y trampa de Tab mientras está abierto; devuelve el foco al botón al cerrar.
  useEffect(() => {
    if (!open) {
      if (wasOpen.current) returnFocusRef?.current?.focus()
      wasOpen.current = false
      return
    }
    wasOpen.current = true
    const t = setTimeout(() => closeRef.current?.focus(), 60)

    const onKey = (e) => {
      if (e.key === 'Escape') return onClose()
      if (e.key !== 'Tab') return
      const items = [...panelRef.current.querySelectorAll(FOCUSABLE)]
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)

    // Si la pantalla crece y aparece el menú de escritorio, no tiene sentido seguir abierto.
    const mq = window.matchMedia('(min-width: 981px)')
    const onChange = (e) => e.matches && onClose()
    mq.addEventListener('change', onChange)

    return () => {
      clearTimeout(t)
      document.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onChange)
    }
  }, [open, onClose, returnFocusRef])

  const isActive = (l) =>
    typeof l.to === 'string'
      ? pathname.startsWith(l.to)
      : pathname === '/' && l.to.hash && `#${activeId.current}` === l.to.hash

  return createPortal(
    <div className={`drawer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <div className="drawer__backdrop" onClick={onClose} />

      <aside
        className="drawer__panel"
        id="site-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        ref={panelRef}
      >
        <div className="drawer__head">
          <span className="drawer__brand">
            World<span>Connection</span>
          </span>
          <button
            type="button"
            className="drawer__close"
            aria-label="Cerrar menú"
            onClick={onClose}
            ref={closeRef}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            </svg>
          </button>
        </div>

        <nav className="drawer__nav" aria-label="Secciones del sitio">
          <ul>
            {links.map((l, i) => (
              <li key={l.label} style={{ '--i': i }}>
                <Link
                  to={l.to}
                  className={isActive(l) ? 'is-active' : ''}
                  aria-current={isActive(l) ? 'page' : undefined}
                  onClick={onClose}
                >
                  <span className="drawer__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="drawer__label">{l.label}</span>
                  <span className="drawer__arrow" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="drawer__foot" style={{ '--i': links.length }}>
          <Link to={contactLink} className="btn btn--primary drawer__cta" onClick={onClose}>
            Contactanos
          </Link>
          <ul className="drawer__contact">
            <li><a href="mailto:comercial@wconnectionarg.com">comercial@wconnectionarg.com</a></li>
            <li><a href="tel:+5491123963911">+54 9 11 2396-3911</a></li>
            <li>Lunes a Viernes · 9 a 18 h</li>
          </ul>
          <SocialLinks className="drawer__social" />
        </div>
      </aside>
    </div>,
    document.body
  )
}
