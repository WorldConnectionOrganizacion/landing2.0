import { supabase } from './supabase.js'

const CARD_FIELDS = 'id, slug, title, category, excerpt, cover_url, published_at, hidden_fields'

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export async function fetchLatestPosts(limit = 6) {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('posts')
    .select(CARD_FIELDS)
    .eq('published', true)
    .order('published_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data ?? []
}

// Página `page` (desde 1) de noticias publicadas, más recientes primero.
export async function fetchPostsPage(page, pageSize) {
  if (!supabase) return { posts: [], total: 0 }
  const from = (page - 1) * pageSize
  const { data, error, count } = await supabase
    .from('posts')
    .select(CARD_FIELDS, { count: 'exact' })
    .eq('published', true)
    .order('published_at', { ascending: false })
    .range(from, from + pageSize - 1)
  if (error) {
    // Página fuera de rango (PGRST103): se trata como vacía; el llamador redirige.
    if (error.code === 'PGRST103') return { posts: [], total: 0, outOfRange: true }
    throw error
  }
  return { posts: data ?? [], total: count ?? 0 }
}

// Devuelve null si no existe o no está publicada (RLS lo filtra).
export async function fetchPostBySlug(slug) {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle()
  if (error) throw error
  return data
}
