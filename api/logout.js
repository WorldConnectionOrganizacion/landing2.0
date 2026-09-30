import { clearSessionCookie } from './_lib/auth.js'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Método no permitido' })
  }
  clearSessionCookie(req, res)
  return res.status(200).json({ ok: true })
}
