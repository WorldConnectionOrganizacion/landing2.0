// URL pública del sitio (sin barra final). Se configura con VITE_SITE_URL.
export const DEFAULT_SITE_URL = 'https://world-connection.vercel.app'

export function siteUrl() {
  return (process.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, '')
}
