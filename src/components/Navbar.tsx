import { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/i18n/LanguageContext'
import Wordmark from './Wordmark'

const APP_URL = 'https://revalu8.verival.si/'

export default function Navbar() {
  const { lang, setLang, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = [
    { name: t.nav.product, href: '#product' },
    { name: t.nav.howItWorks, href: '#how-it-works' },
    { name: t.nav.earlyAccess, href: '#early-access' },
    { name: t.nav.about, href: '#about' },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLang = () => setLang(lang === 'en' ? 'si' : 'en')

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-paper transition-[border-color] duration-200',
        scrolled || mobileOpen ? 'border-b border-line' : 'border-b border-transparent'
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#" aria-label="VERIVAL — home">
          <Wordmark />
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm text-ink-2 transition-colors duration-150 hover:text-ink"
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={toggleLang}
            className="cursor-pointer rounded-full border border-line bg-card px-3 py-1.5 font-mono text-xs font-medium text-ink-2 transition-colors hover:border-line-strong hover:text-ink"
            aria-label={lang === 'en' ? 'Preklopi v slovenščino' : 'Switch to English'}
          >
            {lang === 'en' ? 'SI' : 'EN'}
          </button>
          <a href="#early-access" className="btn btn-ghost !h-9 !px-4">
            {t.nav.joinPilot}
          </a>
          <a href={APP_URL} target="_blank" rel="noopener" className="btn btn-primary !h-9 !px-4">
            {t.nav.tryApp}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="cursor-pointer p-1 text-ink lg:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-line bg-paper px-4 pb-6 pt-4 sm:px-6 lg:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-base text-ink-2 transition-colors hover:text-ink"
              >
                {item.name}
              </a>
            ))}
            <hr className="border-t border-line" />
            <button
              onClick={toggleLang}
              className="cursor-pointer self-start rounded-full border border-line bg-card px-3 py-1.5 font-mono text-xs font-medium text-ink-2"
            >
              {lang === 'en' ? 'Slovenščina' : 'English'}
            </button>
            <a
              href="#early-access"
              onClick={() => setMobileOpen(false)}
              className="btn btn-ghost w-full"
            >
              {t.nav.joinPilot}
            </a>
            <a href={APP_URL} target="_blank" rel="noopener" className="btn btn-primary w-full">
              {t.nav.tryApp}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
