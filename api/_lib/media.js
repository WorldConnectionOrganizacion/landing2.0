import { MEDIA_BUCKET } from './supabaseAdmin.js'

const FOLDER = 'posts'
const DAY_MS = 24 * 60 * 60 * 1000

// Extrae el path de Storage (posts/xxx.png) de una URL pública de nuestro bucket.
export function storagePath(url) {
  if (typeof url !== 'string') return null
  const marker = `/storage/v1/object/public/${MEDIA_BUCKET}/`
  const i = url.indexOf(marker)
  if (i === -1) return null
  const path = decodeURIComponent(url.slice(i + marker.length).split('?')[0])
  return path.startsWith(`${FOLDER}/`) ? path : null
}

// Paths de Storage usados por una noticia (portada + bloques de imagen).
export function pathsOfPost(post) {
  const urls = [post?.cover_url, ...(post?.blocks || []).map((b) => b?.type === 'image' && b.url)]
  return new Set(urls.map(storagePath).filter(Boolean))
}

// Paths usados por CUALQUIER noticia (publicada o borrador). Lanza si falla la lectura:
// nunca se debe borrar nada sin conocer el conjunto completo.
export async function referencedPaths(db) {
  const { data, error } = await db.from('posts').select('cover_url, blocks')
  if (error) throw error
  const all = new Set()
  for (const post of data) for (const p of pathsOfPost(post)) all.add(p)
  return all
}

async function removeFiles(db, paths) {
  for (let i = 0; i < paths.length; i += 100) {
    const { error } = await db.storage.from(MEDIA_BUCKET).remove(paths.slice(i, i + 100))
    if (error) throw error
  }
}

// Borra, entre `candidates`, los archivos que ninguna noticia usa. Nunca lanza:
// una falla de limpieza no debe romper el guardado ni el borrado de la noticia.
export async function removeUnreferenced(db, candidates) {
  try {
    const list = [...candidates]
    if (!list.length) return 0
    const used = await referencedPaths(db)
    const orphans = list.filter((p) => !used.has(p))
    await removeFiles(db, orphans)
    return orphans.length
  } catch (err) {
    console.error('Limpieza de imágenes falló', err)
    return 0
  }
}

// Barrido: archivos del bucket sin referencia y con más de `minAgeMs` de antigüedad
// (protege subidas recientes cuyo formulario todavía no se guardó).
export async function sweepOrphans(db, { dryRun = false, minAgeMs = DAY_MS } = {}) {
  const used = await referencedPaths(db)
  const cutoff = Date.now() - minAgeMs
  const orphans = []

  for (let offset = 0; ; offset += 1000) {
    const { data, error } = await db.storage
      .from(MEDIA_BUCKET)
      .list(FOLDER, { limit: 1000, offset })
    if (error) throw error
    for (const f of data) {
      if (!f.id) continue // carpeta
      const path = `${FOLDER}/${f.name}`
      const created = new Date(f.created_at).getTime()
      if (!used.has(path) && created < cutoff) orphans.push(path)
    }
    if (data.length < 1000) break
  }

  if (!dryRun) await removeFiles(db, orphans)
  return orphans.length
}
