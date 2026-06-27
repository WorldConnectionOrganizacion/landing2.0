import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Stats from './components/Stats.jsx'
// import Clients from './components/Clients.jsx' // Oculto por el momento — probablemente se use en el futuro
import Services from './components/Services.jsx'
import WhyUs from './components/WhyUs.jsx'
import CtaBanner from './components/CtaBanner.jsx'
import Differentiators from './components/Differentiators.jsx'
import Careers from './components/Careers.jsx'
import History from './components/History.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'
import useScrollReveal from './hooks/useScrollReveal.js'
import './App.css'

export default function App() {
  useScrollReveal()
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stats />
        {/* <Clients /> */} {/* Oculto por el momento — probablemente se use en el futuro */}
        <Services />
        <WhyUs />
        <CtaBanner />
        <Differentiators />
        <Careers />
        <History />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
