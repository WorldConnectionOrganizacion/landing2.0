import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { contactLink } from '../data/navLinks.js'
import useNavLinks from '../hooks/useNavLinks.js'
import MobileDrawer from './MobileDrawer.jsx'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false) // el menú lateral usa un portal: solo en el navegador
  const toggleRef = useRef(null)
  const navLinks = useNavLinks()
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Bloquea el scroll de la página mientras el menú está abierto.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <Link to={navLinks[0].to} className="nav__brand">
          <img
            src="/logo-header.png"
            alt="World Connection"
            className="nav__brand-img"
            width="52"
            height="52"
          />
        </Link>

        {/* Menú de escritorio */}
        <nav className="nav__menu" aria-label="Principal">
          {navLinks.map((l) => (
            <Link key={l.label} to={l.to}>
              {l.label}
            </Link>
          ))}
          <Link to={contactLink} className="btn btn--primary btn--sm nav__cta">
            Contactanos
          </Link>
        </nav>

        {/* Botón de las tres rayitas (celular y tablet) */}
        <button
          type="button"
          ref={toggleRef}
          className={`nav__toggle ${open ? 'is-open' : ''}`}
          aria-label="Abrir menú"
          aria-expanded={open}
          aria-controls="site-drawer"
          onClick={() => setOpen(true)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      {mounted && (
        <MobileDrawer open={open} onClose={close} links={navLinks} returnFocusRef={toggleRef} />
      )}
    </header>
  )
}
