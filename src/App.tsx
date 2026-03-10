import { Suspense, lazy } from 'react'
import { LanguageProvider } from './i18n/LanguageContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import About from './components/About'
import Team from './components/Team'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import CTA from './components/CTA'
import Footer from './components/Footer'

const Scene3D = lazy(() => import('./components/Scene3D'))

function App() {
  return (
    <LanguageProvider>
      <div className="relative min-h-screen overflow-x-hidden bg-bg">
        {/* 3D Background - only in hero area */}
        <div className="pointer-events-none fixed inset-0 z-0 h-screen">
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <Navbar />
          <Hero />
          <Features />
          <About />
          <Team />
          <Testimonials />
          <Pricing />
          <CTA />
          <Footer />
        </div>
      </div>
    </LanguageProvider>
  )
}

export default App
