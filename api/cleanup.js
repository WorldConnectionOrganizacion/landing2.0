import { requireAdmin } from './_lib/auth.js'
import { sweepOrphans } from './_lib/media.js'
import { supabaseAdmin } from './_lib/supabaseAdmin.js'

// POST { dryRun: true } cuenta; POST {} borra imágenes sin uso con más de 24 h.
export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Método no permitido' })
  }
  try {
    const count = await sweepOrphans(supabaseAdmin(), { dryRun: Boolean(req.body?.dryRun) })
    return res.status(200).json({ count })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'No se pudo completar la limpieza' })
  }
}
