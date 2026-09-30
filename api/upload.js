import crypto from 'node:crypto'
import { requireAdmin } from './_lib/auth.js'
import { MEDIA_BUCKET, supabaseAdmin } from './_lib/supabaseAdmin.js'

const TYPES = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
}

// Emite una URL firmada de subida. El archivo va directo del navegador a Storage
// (evita el límite de 4.5 MB del body en Vercel). Tamaño y tipos: ver límites del bucket.
export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const ext = TYPES[req.body?.contentType]
  if (!ext) return res.status(400).json({ error: 'Formato no permitido (JPG, PNG, WebP o GIF)' })

  const db = supabaseAdmin()
  const path = `posts/${crypto.randomUUID()}.${ext}`
  const { data, error } = await db.storage.from(MEDIA_BUCKET).createSignedUploadUrl(path)
  if (error) {
    console.error(error)
    return res.status(500).json({ error: 'No se pudo preparar la subida' })
  }
  const { data: pub } = db.storage.from(MEDIA_BUCKET).getPublicUrl(path)
  return res.status(200).json({ path, token: data.token, publicUrl: pub.publicUrl })
}
