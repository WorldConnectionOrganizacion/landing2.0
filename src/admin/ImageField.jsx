import { useRef, useState } from 'react'
import { uploadImage } from './api.js'
import { useAdmin } from './AdminContext.jsx'

// Campo de imagen: sube el archivo y devuelve la URL pública vía onChange.
export default function ImageField({ url, onChange, label = 'Imagen' }) {
  const { expire } = useAdmin()
  const inputRef = useRef(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const pick = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setBusy(true)
    setError('')
    try {
      onChange(await uploadImage(file))
    } catch (err) {
      if (err.status === 401) return expire()
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="adm-image">
      {url && <img src={url} alt="" className="adm-image__preview" />}
      <div className="adm-image__row">
        <button type="button" className="adm-btn" disabled={busy} onClick={() => inputRef.current.click()}>
          {busy ? 'Subiendo…' : url ? `Cambiar ${label.toLowerCase()}` : `Subir ${label.toLowerCase()}`}
        </button>
        {url && !busy && (
          <button type="button" className="adm-btn adm-btn--ghost" onClick={() => onChange('')}>
            Quitar
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={pick}
        hidden
      />
      {error && <p className="adm-error" role="alert">{error}</p>}
    </div>
  )
}
