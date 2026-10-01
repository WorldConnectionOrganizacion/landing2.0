import { Link } from 'react-router-dom'
import useNavLinks from '../hooks/useNavLinks.js'
import SocialLinks from './SocialLinks.jsx'

export default function Footer() {
  const navLinks = useNavLinks()
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <span className="nav__name footer__logo">
            World<span>Connection</span>
          </span>
          <p className="footer__tagline">
            Call center y gestión comercial multicanal en Mendoza: soluciones de
            telecomunicaciones medibles y cercanas.
          </p>
        </div>

        <div className="footer__col">
          <h4>Navegación</h4>
          <ul>
            {navLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Contacto</h4>
          <ul>
            <li><a href="mailto:comercial@wconnectionarg.com">comercial@wconnectionarg.com</a></li>
            <li><a href="tel:+5491123963911">+54 9 11 2396-3911</a></li>
            <li>
              <a
                href="https://www.google.com/maps/search/?api=1&query=-32.887300298702925,-68.83764853413197"
                target="_blank"
                rel="noreferrer"
              >
                Av. San Martín 1425, Piso 1, Of. 2 · Galería Bamac, Mendoza
              </a>
            </li>
            <li>Lunes a Viernes · 9 a 18 h</li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Seguinos</h4>
          <SocialLinks className="footer__social" />
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span>© World Connection — {new Date().getFullYear()}. Todos los derechos reservados.</span>
          <span>Gran Mendoza, Argentina</span>
        </div>
      </div>
    </footer>
  )
}
