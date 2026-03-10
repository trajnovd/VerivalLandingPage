import { useLanguage } from '@/i18n/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-border px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2 font-heading text-xl font-bold">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              VERIVAL
            </a>
            <p className="mt-4 text-sm leading-relaxed text-text-dim">
              {t.footer.tagline}
            </p>
            <p className="mt-2 text-xs text-text-dim">
              Ulica Jozeta Jame 14
              <br />
              1000 Ljubljana, Slovenija
            </p>
            <p className="mt-2 text-xs text-text-dim">
              info@verival.si
            </p>
          </div>

          {t.footer.columns.map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 font-heading text-sm font-semibold text-text">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-text-dim transition-colors hover:text-text-muted">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-text-dim">
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <div className="flex gap-6">
            {['LinkedIn'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-sm text-text-dim transition-colors hover:text-text-muted"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
