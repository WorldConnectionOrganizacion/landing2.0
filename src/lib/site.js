// URL pública del sitio (sin barra final). Se configura con VITE_SITE_URL.
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://world-connection.vercel.app').replace(/\/+$/, '')

export const SITE_NAME = 'World Connection'
export const DEFAULT_TITLE = 'World Connection Mendoza | Call Center y Telecomunicaciones'
export const DEFAULT_DESCRIPTION =
  'World Connection: call center y venta de telecomunicaciones en Mendoza, Argentina. Venta telefónica, leads digitales y equipos comerciales para marcas líderes.'
export const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`
