import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Features', href: '#features' },
  { name: 'About', href: '#about' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Pricing', href: '#pricing' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        className={cn(
          'mx-auto mt-4 flex max-w-5xl items-center justify-between rounded-2xl px-6 py-3 transition-all duration-300',
          scrolled
            ? 'bg-bg/60 border border-border backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
        )}
      >
        <a href="#" className="flex items-center gap-2 font-heading text-xl font-bold tracking-tight">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="bg-gradient-to-r from-text to-text-muted bg-clip-text text-transparent">
            Verival
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm text-text-muted transition-colors duration-200 hover:text-text"
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#"
            className="rounded-xl px-4 py-2 text-sm text-text-muted transition-colors hover:text-text"
          >
            Log In
          </a>
          <a
            href="#"
            className="cursor-pointer rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-[0_0_20px_rgba(14,165,233,0.3)]"
          >
            Get Started
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="cursor-pointer text-text-muted md:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mx-4 mt-2 rounded-2xl border border-border bg-bg/90 p-6 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base text-text-muted transition-colors hover:text-text"
                >
                  {item.name}
                </a>
              ))}
              <hr className="border-border" />
              <a href="#" className="text-base text-text-muted">Log In</a>
              <a
                href="#"
                className="cursor-pointer rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-center text-sm font-semibold text-white"
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
