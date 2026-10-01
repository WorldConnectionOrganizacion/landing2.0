import { DEFAULT_SITE_URL } from '../api/_lib/site.js'

// Genera robots.txt en el build con la URL pública configurada (VITE_SITE_URL).
// No lista /paginas-admin a propósito: robots.txt es público y revelaría la URL interna;
// el panel ya se protege con `noindex` (meta + cabecera X-Robots-Tag).
export default function seo(env) {
  const site = (env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, '')
  return {
    name: 'seo',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${site}/sitemap.xml\n`,
      })
    },
  }
}
