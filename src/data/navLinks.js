// Links de navegación compartidos por Navbar y Footer.
// `to` con hash apunta a una sección de la home; sin hash, a otra página.
export const navLinks = [
  { label: 'Inicio', to: { pathname: '/', hash: '#inicio' } },
  { label: 'Nosotros', to: { pathname: '/', hash: '#nosotros' } },
  { label: 'Servicios', to: { pathname: '/', hash: '#servicios' } },
  { label: 'Noticias', to: '/noticias' },
  { label: 'Trabajá con nosotros', to: { pathname: '/', hash: '#trabaja' } },
]

export const contactLink = { pathname: '/', hash: '#contacto' }
