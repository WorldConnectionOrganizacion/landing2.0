import { createClient } from '@supabase/supabase-js'
import { siteUrl } from './_lib/site.js'

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const entry = (loc, { lastmod, changefreq, priority } = {}) =>
  `  <url>\n    <loc>${esc(loc)}</loc>\n` +
  (lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : '') +
  (changefreq ? `    <changefreq>${changefreq}</changefreq>\n` : '') +
  (priority ? `    <priority>${priority}</priority>\n` : '') +
  `  </url>`

// Sitemap dinámico: páginas fijas + una entrada por cada noticia publicada.
export default async function handler(req, res) {
  const base = siteUrl()
  const entries = [
    entry(`${base}/`, { changefreq: 'weekly', priority: '1.0' }),
    entry(`${base}/noticias`, { changefreq: 'daily', priority: '0.8' }),
  ]

  try {
    const url = process.env.VITE_SUPABASE_URL
    const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY
    if (url && key) {
      const db = createClient(url, key, { auth: { persistSession: false } })
      const { data, error } = await db
        .from('posts')
        .select('slug, updated_at')
        .eq('published', true)
        .order('published_at', { ascending: false })
        .limit(5000)
      if (error) throw error
      for (const p of data) {
        entries.push(
          entry(`${base}/noticias/${encodeURIComponent(p.slug)}`, {
            lastmod: new Date(p.updated_at).toISOString().slice(0, 10),
            changefreq: 'monthly',
            priority: '0.6',
          })
        )
      }
    }
  } catch (err) {
    // Si la base falla, igual devolvemos las páginas fijas.
    console.error('sitemap: no se pudieron leer las noticias', err)
  }

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`

  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
  res.status(200).end(xml)
}
