import { requireAdmin } from './_lib/auth.js'
import { supabaseAdmin } from './_lib/supabaseAdmin.js'
import { validatePost } from './_lib/validatePost.js'

const UUID = /^[0-9a-f-]{36}$/i

function fail(res, error) {
  if (error.code === '23505') {
    return res.status(409).json({ error: 'Ya existe una noticia con ese slug' })
  }
  console.error(error)
  return res.status(500).json({ error: 'Error al acceder a la base de datos' })
}

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return

  const db = supabaseAdmin()
  const id = req.query?.id

  if (id !== undefined && !UUID.test(id)) {
    return res.status(400).json({ error: 'id inválido' })
  }

  if (req.method === 'GET') {
    if (id) {
      const { data, error } = await db.from('posts').select('*').eq('id', id).maybeSingle()
      if (error) return fail(res, error)
      return data ? res.status(200).json(data) : res.status(404).json({ error: 'No encontrada' })
    }
    const { data, error } = await db
      .from('posts')
      .select('id, slug, title, category, published, published_at, updated_at')
      .order('published_at', { ascending: false })
    if (error) return fail(res, error)
    return res.status(200).json(data)
  }

  if (req.method === 'POST') {
    const { value, error: msg } = validatePost(req.body)
    if (msg) return res.status(400).json({ error: msg })
    const { data, error } = await db.from('posts').insert(value).select().single()
    if (error) return fail(res, error)
    return res.status(201).json(data)
  }

  if (req.method === 'PUT') {
    if (!id) return res.status(400).json({ error: 'Falta id' })
    const { value, error: msg } = validatePost(req.body, { partial: true })
    if (msg) return res.status(400).json({ error: msg })
    if (!Object.keys(value).length) return res.status(400).json({ error: 'Nada para actualizar' })
    const { data, error } = await db.from('posts').update(value).eq('id', id).select().maybeSingle()
    if (error) return fail(res, error)
    return data ? res.status(200).json(data) : res.status(404).json({ error: 'No encontrada' })
  }

  if (req.method === 'DELETE') {
    if (!id) return res.status(400).json({ error: 'Falta id' })
    const { error } = await db.from('posts').delete().eq('id', id)
    if (error) return fail(res, error)
    return res.status(200).json({ ok: true })
  }

  res.setHeader('Allow', 'GET, POST, PUT, DELETE')
  return res.status(405).json({ error: 'Método no permitido' })
}
