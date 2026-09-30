import { createClient } from '@supabase/supabase-js'

let client

// Cliente con secret key: ignora RLS. Usar solo detrás de requireAdmin.
export function supabaseAdmin() {
  if (client) return client
  const url = process.env.VITE_SUPABASE_URL
  const key = process.env.SUPABASE_SECRET_KEY
  if (!url || !key) throw new Error('Supabase no configurado en el servidor')
  client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
  return client
}

export const MEDIA_BUCKET = 'news-media'
