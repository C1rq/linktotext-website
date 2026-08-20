import { useState, useCallback } from 'react'
import IntroOverlay from './components/IntroOverlay'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Download from './components/Download'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [introDone, setIntroDone] = useState(false)

  const handleIntroComplete = useCallback(() => {
    setIntroDone(true)
  }, [])

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0f' }}>
      <IntroOverlay onComplete={handleIntroComplete} />

      {introDone && (
        <>
          <Navbar />
          <main>
            <Hero />
            <Features />
            <Download />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  )
}
