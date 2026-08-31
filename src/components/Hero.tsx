import { ArrowUpRight, ArrowDown } from 'lucide-react'
import { useLanguage } from '@/i18n/LanguageContext'
import ParcelExhibit from './ParcelExhibit'

const APP_URL = 'https://revalu8.verival.si/'

/* Splits "Transparent. Standardized. Trusted." and sets each full stop in amber. */
function AmberStops({ text }: { text: string }) {
  const parts = text.split('.').map((s) => s.trim()).filter(Boolean)
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          <span className="whitespace-nowrap">
            {part}
            <span className="text-amber-mid">.</span>
          </span>
          {i < parts.length - 1 ? ' ' : ''}
        </span>
      ))}
    </>
  )
}

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="px-4 pb-20 pt-28 sm:px-6 md:pt-36">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Claim */}
          <div className="lg:col-span-7">
            <div className="hero-rise">
              {/* Amber = in-progress state: the product is honestly a prototype */}
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-tint px-3.5 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-mark" aria-hidden="true" />
                <span className="font-mono text-xs font-medium text-amber-ink">
                  {t.hero.badge}
                </span>
              </span>
            </div>

            <h1 className="hero-rise mt-6 font-display text-4xl leading-[1.08] tracking-tight text-balance sm:text-5xl md:text-[3.4rem] [animation-delay:80ms]">
              {t.hero.headline1}
              <br />
              <span className="font-bold">
                <AmberStops text={t.hero.headline2} />
              </span>
            </h1>

            <p className="hero-rise mt-6 max-w-xl text-base leading-relaxed text-ink-2 md:text-lg [animation-delay:160ms]">
              {t.hero.subheadline}
            </p>

            <div className="hero-rise mt-8 flex flex-wrap items-center gap-3 [animation-delay:240ms]">
              <a href={APP_URL} target="_blank" rel="noopener" className="btn btn-primary !h-12 !px-6 !text-base">
                {t.nav.tryApp}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href="#early-access" className="btn btn-ghost !h-12 !px-6 !text-base">
                {t.hero.ctaPrimary}
              </a>
              <a
                href="#how-it-works"
                className="group ml-1 inline-flex items-center gap-1.5 text-sm text-ink-2 underline decoration-line-strong transition-colors hover:text-ink"
              >
                {t.hero.ctaSecondary}
                <ArrowDown
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>

            {/* Compliance claims, set like a report footer */}
            <p className="hero-rise mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-ink-3 [animation-delay:320ms]">
              {t.hero.trustBar.map((item, i) => (
                <span key={i} className="flex items-center gap-x-3">
                  {i > 0 && <span aria-hidden="true">·</span>}
                  {item}
                </span>
              ))}
            </p>
          </div>

          {/* Proof: the cadastral exhibit */}
          <div className="hero-rise lg:col-span-5 [animation-delay:280ms]">
            <ParcelExhibit />
          </div>
        </div>

        {/* Project facts as a report table */}
        <div className="hero-rise mt-16 [animation-delay:420ms]">
          <div className="overflow-hidden rounded-lg border border-line bg-card">
            <div className="border-b border-line px-4 py-2.5">
              <span className="microlabel text-ink-3">{t.hero.statsCaption}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="report-table">
                <tbody>
                  <tr>
                    {t.hero.stats.map((stat) => (
                      <td key={stat.label} className="min-w-36 !py-4">
                        <div className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                          {stat.value}
                        </div>
                        <div className="mt-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-ink-3">
                          {stat.label}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
