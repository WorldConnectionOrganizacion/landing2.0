import { createClient } from '@supabase/supabase-js'
import { applyHead, escText, trimText } from './_lib/head.js'
import { siteUrl } from './_lib/site.js'

const SITE_NAME = 'World Connection'

// Sirve el shell de la app con la metadata real de la noticia en el HTML (para buscadores y
// redes sociales que no ejecutan JavaScript). Noticia inexistente: mismo shell, con 404 real.
// Vercel reescribe /noticias/:slug a esta función (ver vercel.json).
export default async function handler(req, res) {
  const proto = req.headers['x-forwarded-proto'] || 'https'
  const host = req.headers['x-forwarded-host'] || req.headers.host
  const slug = String(req.query?.slug || '')

  let shell
  try {
    const r = await fetch(`${proto}://${host}/app-shell.html`)
    if (!r.ok) throw new Error(`shell ${r.status}`)
    shell = await r.text()
  } catch (err) {
    console.error('news-meta: no se pudo leer el shell', err)
    res.status(500).setHeader('Content-Type', 'text/plain; charset=utf-8')
    return res.end('Error interno')
  }

  const base = siteUrl()
  let post = null
  try {
    const url = process.env.VITE_SUPABASE_URL
    const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY
    if (url && key && slug) {
      const db = createClient(url, key, { auth: { persistSession: false } })
      const { data, error } = await db
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle()
      if (error) throw error
      post = data
    }
  } catch (err) {
    console.error('news-meta: error leyendo la noticia', err)
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8')

  if (!post) {
    res.setHeader('Cache-Control', 'public, s-maxage=60')
    res.status(404)
    return res.end(applyHead(shell, { title: `Noticia no encontrada | ${SITE_NAME}`, noindex: true }))
  }

  const hidden = post.hidden_fields || []
  const blocks = (post.blocks || []).filter((b) => !b.hidden)
  const texts = blocks.filter((b) => b.type === 'text' && b.text).map((b) => b.text)
  const description = trimText(post.excerpt || texts[0] || '', 160) || undefined
  const image = post.cover_url && !hidden.includes('cover') ? post.cover_url : `${base}/og-image.jpg`
  const canonical = `${base}/noticias/${post.slug}`

  const noscript =
    `<article><h1>${escText(post.title)}</h1>` +
    (post.excerpt ? `<p>${escText(post.excerpt)}</p>` : '') +
    texts.map((t) => `<p>${escText(t).replace(/\n/g, '<br />')}</p>`).join('') +
    `<p><a href="${escText(base)}/noticias">Todas las noticias</a></p></article>`

  const html = applyHead(shell, {
    title: `${post.title} | ${SITE_NAME}`,
    description,
    canonical,
    image,
    type: 'article',
    noscript,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: post.title.slice(0, 110),
      description,
      image: [image],
      datePublished: post.published_at,
      dateModified: post.updated_at || post.published_at,
      articleBody: texts.join('\n\n') || undefined,
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
      author: { '@type': 'Organization', name: SITE_NAME, url: base },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        logo: { '@type': 'ImageObject', url: `${base}/logo-header.png` },
      },
    },
  })

  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=3600')
  return res.status(200).end(html)
}
