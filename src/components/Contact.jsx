import { useState } from 'react'

const initial = { name: '', email: '', phone: '', message: '' }
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY

export default function Contact() {
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [serverError, setServerError] = useState('')
  // Honeypot anti-spam: si se completa, descartamos el envío.
  const [botcheck, setBotcheck] = useState('')

  const update = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    setErrors((err) => ({ ...err, [e.target.name]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Ingresá tu nombre'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Email inválido'
    if (!form.message.trim()) next.message = 'Contanos en qué te ayudamos'
    return next
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (botcheck) return // bot detectado
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length) return

    if (!ACCESS_KEY || ACCESS_KEY === 'REEMPLAZAR_POR_TU_ACCESS_KEY') {
      setStatus('error')
      setServerError(
        'El formulario todavía no tiene configurada la access key de Web3Forms.'
      )
      return
    }

    setStatus('sending')
    setServerError('')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: 'Nuevo contacto desde la web · World Connection',
          from_name: 'Web World Connection',
          name: form.name,
          email: form.email,
          phone: form.phone || 'No indicado',
          message: form.message,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setForm(initial)
      } else {
        setStatus('error')
        setServerError(data.message || 'No pudimos enviar el mensaje.')
      }
    } catch {
      setStatus('error')
      setServerError('Hubo un problema de conexión. Probá nuevamente.')
    }
  }

  return (
    <section id="contacto" className="section contact">
      <div className="container contact__grid">
        <div className="contact__info reveal">
          <span className="eyebrow">Contacto</span>
          <h2 className="section-title">Hablemos de tu próxima campaña</h2>
          <p className="lead">
            Contanos sobre tu marca y tus objetivos comerciales. Te respondemos a la
            brevedad para coordinar una reunión.
          </p>

          <ul className="contact__details">
            <li>
              <span className="contact__icon">✉️</span>
              <a href="mailto:comercial@wconnectionarg.com">comercial@wconnectionarg.com</a>
            </li>
            <li>
              <span className="contact__icon">📞</span>
              <a
                href="https://wa.me/5491123963911?text=Hola%20World%20Connection,%20quiero%20m%C3%A1s%20informaci%C3%B3n"
                target="_blank"
                rel="noreferrer"
              >
                +54 9 11 2396-3911
              </a>
            </li>
            <li>
              <span className="contact__icon">📍</span>
              <a
                href="https://www.google.com/maps/search/?api=1&query=-32.887300298702925,-68.83764853413197"
                target="_blank"
                rel="noreferrer"
              >
                Av. San Martín 1425, Piso 1, Of. 2 · Galería Bamac, Mendoza
              </a>
            </li>
            <li>
              <span className="contact__icon">🕘</span>
              Lunes a Viernes · 9 a 18 h
            </li>
          </ul>

          <div className="contact__map">
            <iframe
              title="Ubicación World Connection · Galería Bamac"
              src="https://www.google.com/maps?q=-32.887300298702925,-68.83764853413197&z=17&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        <div className="contact__form-wrap reveal" data-reveal-delay="120">
          {status === 'success' ? (
            <div className="contact__success">
              <span className="contact__success-icon">✅</span>
              <h3>¡Gracias por escribirnos!</h3>
              <p>Recibimos tu mensaje y te vamos a contactar muy pronto.</p>
              <button className="btn btn--primary" onClick={() => setStatus('idle')}>
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form className="contact__form" onSubmit={onSubmit} noValidate>
              {/* Honeypot oculto */}
              <input
                type="checkbox"
                name="botcheck"
                tabIndex="-1"
                autoComplete="off"
                checked={!!botcheck}
                onChange={(e) => setBotcheck(e.target.checked ? '1' : '')}
                style={{ display: 'none' }}
                aria-hidden="true"
              />

              <div className="field">
                <label htmlFor="name">Nombre*</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={update}
                  className={errors.name ? 'is-error' : ''}
                  placeholder="Tu nombre"
                />
                {errors.name && <span className="field__error">{errors.name}</span>}
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="email">Email*</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={update}
                    className={errors.email ? 'is-error' : ''}
                    placeholder="tu@email.com"
                  />
                  {errors.email && <span className="field__error">{errors.email}</span>}
                </div>
                <div className="field">
                  <label htmlFor="phone">Teléfono</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={update}
                    placeholder="(opcional)"
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="message">Mensaje*</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={form.message}
                  onChange={update}
                  className={errors.message ? 'is-error' : ''}
                  placeholder="Contanos en qué te podemos ayudar"
                />
                {errors.message && <span className="field__error">{errors.message}</span>}
              </div>

              {status === 'error' && (
                <p className="contact__form-error">⚠️ {serverError}</p>
              )}

              <button
                type="submit"
                className="btn btn--primary contact__submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
