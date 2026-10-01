// URL pública del sitio (sin barra final). Se configura con VITE_SITE_URL.
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://world-connection.vercel.app').replace(/\/+$/, '')

export const SITE_NAME = 'World Connection'
export const DEFAULT_TITLE = 'World Connection Mendoza | Telecomunicaciones y Gestión Comercial'
export const DEFAULT_DESCRIPTION =
  'Empresa de telecomunicaciones y gestión comercial multicanal en Mendoza, Argentina. Venta telefónica, leads digitales y equipos comerciales.'
export const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`
