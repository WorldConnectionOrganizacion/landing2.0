import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'
import ScrollManager from './components/ScrollManager.jsx'
import Home from './pages/Home.jsx'
import NewsList from './pages/NewsList.jsx'
import NewsPost from './pages/NewsPost.jsx'
import './App.css'

// El panel se carga aparte: no pesa en la landing pública.
const Admin = lazy(() => import('./admin/Admin.jsx'))

function SiteLayout() {
  return (
    <>
      <ScrollManager />
      <Navbar />
      <Outlet />
      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/noticias" element={<NewsList />} />
        <Route path="/noticias/:slug" element={<NewsPost />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
      <Route
        path="/paginas-admin/*"
        element={
          <Suspense fallback={null}>
            <Admin />
          </Suspense>
        }
      />
    </Routes>
  )
}
