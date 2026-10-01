import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { api, ApiError } from './api.js'
import { useAdmin } from './AdminContext.jsx'
import ImageField from './ImageField.jsx'
import { toEmbedUrl } from '../lib/video.js'

const CATEGORIES = ['Noticias', 'Comunicados de prensa']

const newKey = () => crypto.randomUUID()
const toLocalInput = (iso) => {
  const d = iso ? new Date(iso) : new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 16)
}

const empty = () => ({
  title: '',
  slug: '',
  category: 'Noticias',
  excerpt: '',
  cover_url: '',
  published: false,
  published_at: toLocalInput(),
  hidden_fields: [],
  blocks: [],
})

// Interruptor "Mostrar / Oculto" que va al lado de cada campo opcional.
function Switch({ on, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      className={`adm-switch ${on ? 'is-on' : ''}`}
      onClick={() => onChange(!on)}
    >
      <span className="adm-switch__knob" />
      <span className="adm-switch__text">{on ? 'Se muestra' : 'Oculto'}</span>
    </button>
  )
}

const blank = { text: { type: 'text', text: '' }, image: { type: 'image', url: '', caption: '' }, video: { type: 'video', url: '' } }

export default function PostEditor() {
  const { id } = useParams()
  const isNew = !id
  const navigate = useNavigate()
  const { expire } = useAdmin()
  const [form, setForm] = useState(empty)
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  const handle = (err) => {
    if (err instanceof ApiError && err.status === 401) return expire()
    setError(err.message)
  }

  useEffect(() => {
    if (isNew) return
    api
      .get(id)
      .then((p) =>
        setForm({
          title: p.title,
          slug: p.slug,
          category: p.category,
          excerpt: p.excerpt || '',
          cover_url: p.cover_url || '',
          published: p.published,
          published_at: toLocalInput(p.published_at),
          hidden_fields: p.hidden_fields || [],
          blocks: (p.blocks || []).map((b) => ({ ...b, _key: newKey() })),
        })
      )
      .catch(handle)
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const set = (patch) => {
    setSaved(false)
    setForm((f) => ({ ...f, ...patch }))
  }
  const isShown = (field) => !form.hidden_fields.includes(field)
  const setShown = (field, shown) =>
    set({
      hidden_fields: shown
        ? form.hidden_fields.filter((f) => f !== field)
        : [...form.hidden_fields, field],
    })
  const setBlock = (key, patch) =>
    set({ blocks: form.blocks.map((b) => (b._key === key ? { ...b, ...patch } : b)) })
  const addBlock = (type) => set({ blocks: [...form.blocks, { ...blank[type], _key: newKey() }] })
  const removeBlock = (key) => set({ blocks: form.blocks.filter((b) => b._key !== key) })
  const moveBlock = (i, dir) => {
    const j = i + dir
    if (j < 0 || j >= form.blocks.length) return
    const next = [...form.blocks]
    ;[next[i], next[j]] = [next[j], next[i]]
    set({ blocks: next })
  }

  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const payload = {
      title: form.title,
      category: form.category,
      excerpt: form.excerpt,
      cover_url: form.cover_url || null,
      published: form.published,
      published_at: new Date(form.published_at).toISOString(),
      hidden_fields: form.hidden_fields,
      blocks: form.blocks.map(({ _key, ...b }) => b),
    }
    // En noticias nuevas el slug se genera desde el título si queda vacío.
    if (form.slug || !isNew) payload.slug = form.slug
    try {
      if (isNew) {
        const created = await api.create(payload)
        navigate(`/paginas-admin/editar/${created.id}`, { replace: true })
      } else {
        const updated = await api.update(id, payload)
        setForm((f) => ({ ...f, slug: updated.slug }))
        setSaved(true)
      }
    } catch (err) {
      handle(err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="adm-muted">Cargando…</p>

  return (
    <form onSubmit={save}>
      <div className="adm-bar">
        <h1 className="adm-title">{isNew ? 'Nueva noticia' : 'Editar noticia'}</h1>
        <Link to="/paginas-admin" className="adm-btn adm-btn--ghost">← Volver</Link>
      </div>

      <div className="adm-card adm-grid">
        <label className="adm-field adm-span">
          <span>Título*</span>
          <input value={form.title} onChange={(e) => set({ title: e.target.value })} maxLength={200} required />
        </label>

        <div className={`adm-field ${isShown('category') ? '' : 'is-off'}`}>
          <div className="adm-field__head">
            <label htmlFor="f-category">Categoría</label>
            <Switch label="Mostrar categoría" on={isShown('category')} onChange={(v) => setShown('category', v)} />
          </div>
          <input
            id="f-category"
            value={form.category}
            onChange={(e) => set({ category: e.target.value })}
            maxLength={40}
            disabled={!isShown('category')}
          />
          <div className="adm-chips">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                className={`adm-chip ${form.category === c ? 'is-active' : ''}`}
                disabled={!isShown('category')}
                onClick={() => set({ category: c })}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className={`adm-field ${isShown('date') ? '' : 'is-off'}`}>
          <div className="adm-field__head">
            <label htmlFor="f-date">Fecha de publicación</label>
            <Switch label="Mostrar fecha" on={isShown('date')} onChange={(v) => setShown('date', v)} />
          </div>
          <input
            id="f-date"
            type="datetime-local"
            value={form.published_at}
            onChange={(e) => set({ published_at: e.target.value })}
            required
          />
          {!isShown('date') && (
            <p className="adm-hint">La fecha no se muestra, pero sigue ordenando las noticias.</p>
          )}
        </div>

        <div className={`adm-field adm-span ${isShown('excerpt') ? '' : 'is-off'}`}>
          <div className="adm-field__head">
            <label htmlFor="f-excerpt">Extracto (se muestra en las tarjetas y bajo la portada)</label>
            <Switch label="Mostrar extracto" on={isShown('excerpt')} onChange={(v) => setShown('excerpt', v)} />
          </div>
          <textarea
            id="f-excerpt"
            rows="2"
            value={form.excerpt}
            onChange={(e) => set({ excerpt: e.target.value })}
            maxLength={500}
            disabled={!isShown('excerpt')}
          />
        </div>

        <label className="adm-field adm-span">
          <span>Slug (URL){isNew ? ' — opcional, se genera del título' : ''}</span>
          <input
            value={form.slug}
            onChange={(e) => set({ slug: e.target.value })}
            placeholder="mi-noticia"
          />
        </label>

        <div className={`adm-field adm-span ${isShown('cover') ? '' : 'is-off'}`}>
          <div className="adm-field__head">
            <span>Imagen de portada</span>
            <Switch label="Mostrar portada" on={isShown('cover')} onChange={(v) => setShown('cover', v)} />
          </div>
          <ImageField label="portada" url={form.cover_url} onChange={(cover_url) => set({ cover_url })} disabled={!isShown('cover')} />
        </div>
      </div>

      <h2 className="adm-subtitle">Contenido</h2>
      {!form.blocks.length && (
        <div className="adm-card adm-empty">Agregá bloques de texto, imagen o video.</div>
      )}

      {form.blocks.map((b, i) => (
        <div className={`adm-card adm-block ${b.hidden ? 'is-off' : ''}`} key={b._key}>
          <div className="adm-block__head">
            <strong>{{ text: 'Texto', image: 'Imagen', video: 'Video' }[b.type]}</strong>
            <div className="adm-block__tools">
              <Switch label="Mostrar bloque" on={!b.hidden} onChange={(v) => setBlock(b._key, { hidden: !v })} />
              <button type="button" className="adm-icon" onClick={() => moveBlock(i, -1)} disabled={i === 0} aria-label="Subir">↑</button>
              <button type="button" className="adm-icon" onClick={() => moveBlock(i, 1)} disabled={i === form.blocks.length - 1} aria-label="Bajar">↓</button>
              <button type="button" className="adm-icon adm-icon--danger" onClick={() => removeBlock(b._key)} aria-label="Quitar bloque">✕</button>
            </div>
          </div>

          {b.type === 'text' && (
            <textarea
              rows="6"
              value={b.text}
              onChange={(e) => setBlock(b._key, { text: e.target.value })}
              placeholder="Escribí el texto. Una línea en blanco separa párrafos."
            />
          )}

          {b.type === 'image' && (
            <>
              <ImageField url={b.url} onChange={(url) => setBlock(b._key, { url })} />
              <input
                value={b.caption}
                onChange={(e) => setBlock(b._key, { caption: e.target.value })}
                placeholder="Pie de imagen (opcional)"
                maxLength={300}
              />
            </>
          )}

          {b.type === 'video' && (
            <>
              <input
                type="url"
                value={b.url}
                onChange={(e) => setBlock(b._key, { url: e.target.value })}
                placeholder="Link de YouTube, Vimeo, Instagram o LinkedIn (https://…)"
              />
              {b.url && !toEmbedUrl(b.url) && (
                <p className="adm-muted">Link no reconocido: se mostrará como botón "Ver video".</p>
              )}
            </>
          )}
        </div>
      ))}

      <div className="adm-add">
        <button type="button" className="adm-btn" onClick={() => addBlock('text')}>+ Texto</button>
        <button type="button" className="adm-btn" onClick={() => addBlock('image')}>+ Imagen</button>
        <button type="button" className="adm-btn" onClick={() => addBlock('video')}>+ Video</button>
      </div>

      <div className="adm-card adm-savebar">
        <label className="adm-check">
          <input type="checkbox" checked={form.published} onChange={(e) => set({ published: e.target.checked })} />
          Publicada (visible en la web)
        </label>
        <div className="adm-savebar__right">
          {saved && <span className="adm-ok">Guardado ✓</span>}
          {error && <span className="adm-error" role="alert">{error}</span>}
          <button className="btn btn--primary btn--sm" disabled={saving}>
            {saving ? 'Guardando…' : 'Guardar'}
          </button>
        </div>
      </div>
    </form>
  )
}
