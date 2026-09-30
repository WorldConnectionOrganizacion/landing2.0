import {
  authConfigured,
  clearFailures,
  clientIp,
  isRateLimited,
  recordFailure,
  safeEqual,
  setSessionCookie,
} from './_lib/auth.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Método no permitido' })
  }
  if (!authConfigured()) {
    return res.status(500).json({ error: 'Autenticación no configurada en el servidor' })
  }

  const ip = clientIp(req)
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Demasiados intentos. Probá más tarde.' })
  }

  const { user, password } = req.body || {}
  // Evaluamos ambas comparaciones siempre para no filtrar cuál falló.
  const okUser = safeEqual(user ?? '', process.env.ADMIN_USER)
  const okPass = safeEqual(password ?? '', process.env.ADMIN_PASSWORD)

  if (!(okUser && okPass)) {
    recordFailure(ip)
    await new Promise((r) => setTimeout(r, 500))
    return res.status(401).json({ error: 'Usuario o contraseña incorrectos' })
  }

  clearFailures(ip)
  setSessionCookie(req, res)
  return res.status(200).json({ ok: true })
}
