import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'
import Home from './pages/Home.jsx'
import './App.css'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
