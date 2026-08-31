import { useLanguage } from '@/i18n/LanguageContext'
import Wordmark from './Wordmark'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-line px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <a href="#" aria-label="VERIVAL — home">
              <Wordmark />
            </a>
            <p className="mt-4 text-sm leading-relaxed text-ink-2">{t.footer.tagline}</p>
            <p className="mt-3 text-xs leading-relaxed text-ink-3">
              Ulica Jozeta Jame 14
              <br />
              1000 Ljubljana, Slovenija
            </p>
            <p className="mt-2 text-xs text-ink-3">
              <a href="mailto:support@verival.si" className="hover:text-ink-2">
                support@verival.si
              </a>
            </p>
          </div>

          {t.footer.columns.map((section) => (
            <div key={section.title}>
              <h4 className="m-0 mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink-3">
                {section.title}
              </h4>
              <ul className="m-0 list-none space-y-2.5 p-0">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-ink-2 transition-colors hover:text-ink">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-7 md:flex-row">
          <p className="m-0 text-[13px] text-ink-3">
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <a href="#" className="text-[13px] text-ink-3 transition-colors hover:text-ink">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
