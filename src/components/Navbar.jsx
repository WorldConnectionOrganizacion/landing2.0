import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { contactLink } from '../data/navLinks.js'
import useNavLinks from '../hooks/useNavLinks.js'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navLinks = useNavLinks()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <Link to={navLinks[0].to} className="nav__brand" onClick={() => setOpen(false)}>
          <img
            src="/logo-header.png"
            alt="World Connection"
            className="nav__brand-img"
            width="52"
            height="52"
          />
        </Link>

        <nav className={`nav__menu ${open ? 'is-open' : ''}`}>
          {navLinks.map((l) => (
            <Link key={l.label} to={l.to} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link to={contactLink} className="btn btn--primary btn--sm nav__cta" onClick={() => setOpen(false)}>
            Contactanos
          </Link>
        </nav>

        <button
          className={`nav__toggle ${open ? 'is-open' : ''}`}
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  )
}
