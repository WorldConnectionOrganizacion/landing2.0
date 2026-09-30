import Hero from '../components/Hero.jsx'
import About from '../components/About.jsx'
import Stats from '../components/Stats.jsx'
// import Clients from '../components/Clients.jsx' // Oculto por el momento — probablemente se use en el futuro
import Services from '../components/Services.jsx'
import WhyUs from '../components/WhyUs.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import Differentiators from '../components/Differentiators.jsx'
import Careers from '../components/Careers.jsx'
import History from '../components/History.jsx'
import Contact from '../components/Contact.jsx'
import useScrollReveal from '../hooks/useScrollReveal.js'

export default function Home() {
  useScrollReveal()
  return (
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
  )
}
