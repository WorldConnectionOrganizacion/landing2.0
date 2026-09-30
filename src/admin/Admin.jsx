import { useCallback, useEffect, useMemo, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { api } from './api.js'
import { AdminContext } from './AdminContext.jsx'
import Login from './Login.jsx'
import PostList from './PostList.jsx'
import PostEditor from './PostEditor.jsx'
import './admin.css'

export default function Admin() {
  const [auth, setAuth] = useState('checking') // checking | out | in

  // El panel no debe indexarse.
  useEffect(() => {
    document.title = 'Panel | World Connection'
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => meta.remove()
  }, [])

  useEffect(() => {
    api.me().then((r) => setAuth(r.authenticated ? 'in' : 'out')).catch(() => setAuth('out'))
  }, [])

  const expire = useCallback(() => setAuth('out'), [])
  const ctx = useMemo(() => ({ expire }), [expire])

  const logout = async () => {
    await api.logout().catch(() => {})
    setAuth('out')
  }

  if (auth === 'checking') return <div className="adm"><p className="adm-muted adm-center">Cargando…</p></div>
  if (auth === 'out') return <div className="adm"><Login onSuccess={() => setAuth('in')} /></div>

  return (
    <AdminContext.Provider value={ctx}>
      <div className="adm">
        <header className="adm-header">
          <div className="adm-header__inner">
            <img src="/logo-header.png" alt="World Connection" className="adm-header__logo" />
            <span className="adm-header__label">Panel de noticias</span>
            <button type="button" className="adm-btn adm-btn--ghost" onClick={logout}>Salir</button>
          </div>
        </header>
        <main className="adm-main">
          <Routes>
            <Route index element={<PostList />} />
            <Route path="nueva" element={<PostEditor />} />
            <Route path="editar/:id" element={<PostEditor />} />
            <Route path="*" element={<Navigate to="." replace />} />
          </Routes>
        </main>
      </div>
    </AdminContext.Provider>
  )
}
