import { supabase } from './supabase.js'

const CARD_FIELDS = 'id, slug, title, category, excerpt, cover_url, published_at'

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export async function fetchLatestPosts(limit = 8) {
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
