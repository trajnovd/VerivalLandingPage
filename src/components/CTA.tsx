import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/i18n/LanguageContext'
import Reveal from './Reveal'

const APP_URL = 'https://revalu8.verival.si/'

export default function CTA() {
  const { t } = useLanguage()

  return (
    <section className="px-4 pb-24 pt-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-lg bg-ink px-6 py-16 text-center sm:px-12 md:py-20">
            {/* The parcel, surveying the close */}
            <svg
              viewBox="0 0 520 300"
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 top-1/2 hidden h-[150%] -translate-y-1/2 opacity-[0.07] md:block"
            >
              <path
                d="M150 150 L285 95 L400 120 L395 170 L330 235 L200 250 Z"
                fill="none"
                stroke="#fff"
                strokeWidth="1.5"
              />
              <g fill="var(--color-ink)" stroke="#fff" strokeWidth="1.2">
                <rect x="146" y="146" width="8" height="8" />
                <rect x="281" y="91" width="8" height="8" />
                <rect x="396" y="116" width="8" height="8" />
                <rect x="391" y="166" width="8" height="8" />
                <rect x="326" y="231" width="8" height="8" />
                <rect x="196" y="246" width="8" height="8" />
              </g>
            </svg>

            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-3xl leading-[1.15] tracking-tight text-balance text-white sm:text-4xl">
                {t.cta.heading1}
                <br />
                <span className="italic">{t.cta.heading2}</span>
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-on-ink-2">
                {t.cta.description}
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a href="#early-access" className="btn btn-inverse group !h-12 !px-6 !text-base">
                  {t.cta.button}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
                <a
                  href={APP_URL}
                  target="_blank"
                  rel="noopener"
                  className="btn btn-inverse-ghost !h-12 !px-6 !text-base"
                >
                  {t.nav.tryApp}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
