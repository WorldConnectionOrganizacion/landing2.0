import { supabase } from '../lib/supabase.js'

export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

async function request(path, { method = 'GET', body } = {}) {
  let res
  try {
    res = await fetch(`/api/${path}`, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new ApiError('Sin conexión con el servidor', 0)
  }
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new ApiError(data.error || 'Error inesperado', res.status)
  return data
}

export const api = {
  me: () => request('me'),
  login: (user, password) => request('login', { method: 'POST', body: { user, password } }),
  logout: () => request('logout', { method: 'POST' }),
  list: () => request('posts'),
  get: (id) => request(`posts?id=${id}`),
  create: (post) => request('posts', { method: 'POST', body: post }),
  update: (id, post) => request(`posts?id=${id}`, { method: 'PUT', body: post }),
  remove: (id) => request(`posts?id=${id}`, { method: 'DELETE' }),
}

const MAX_BYTES = 5 * 1024 * 1024
const BUCKET = 'news-media'

// Sube una imagen a Supabase Storage con URL firmada y devuelve su URL pública.
export async function uploadImage(file) {
  if (!supabase) throw new ApiError('Supabase no está configurado', 0)
  if (file.size > MAX_BYTES) throw new ApiError('La imagen supera los 5 MB', 400)
  const { path, token, publicUrl } = await request('upload', {
    method: 'POST',
    body: { contentType: file.type },
  })
  const { error } = await supabase.storage.from(BUCKET).uploadToSignedUrl(path, token, file)
  if (error) throw new ApiError('No se pudo subir la imagen', 500)
  return publicUrl
}
