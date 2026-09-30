import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Scroll al hash (#seccion) o al tope en cada cambio de ruta.
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    const id = decodeURIComponent(hash.slice(1))
    const t = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView()
    }, 0)
    return () => clearTimeout(t)
  }, [pathname, hash])

  return null
}
