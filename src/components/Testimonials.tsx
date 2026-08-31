import { useLanguage } from '@/i18n/LanguageContext'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'

/* How It Works — the valuation procedure, numbered like a report's method chapter. */
export default function Testimonials() {
  const { t } = useLanguage()

  return (
    <section id="how-it-works" className="scroll-mt-16 px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          num="04"
          label={t.howItWorks.label}
          title={
            <>
              {t.howItWorks.heading1} <span className="italic">{t.howItWorks.heading2}</span>
            </>
          }
          description={t.howItWorks.description}
        />

        {/* The 4-step procedure */}
        <ol className="mt-12 grid list-none grid-cols-1 gap-x-10 gap-y-0 p-0 lg:grid-cols-2 lg:gap-y-10">
          {t.howItWorks.steps.map((step, i) => (
            <Reveal key={step.title} delay={(i % 2) * 80}>
              <li className="relative flex gap-5 pb-10 lg:pb-0">
                {/* Rule connecting the steps on mobile */}
                {i < t.howItWorks.steps.length - 1 && (
                  <span
                    className="absolute left-[19px] top-12 bottom-0 w-px bg-line lg:hidden"
                    aria-hidden="true"
                  />
                )}
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-card font-mono text-sm font-medium text-ink">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="m-0 font-sans text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 max-w-prose text-sm leading-relaxed text-ink-2">
                    {step.description}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>

        {/* Supported methodologies */}
        <Reveal className="mt-20">
          <h3 className="max-w-2xl font-display text-2xl leading-snug tracking-tight sm:text-3xl">
            {t.howItWorks.methodologiesHeading}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-2 md:text-base">
            {t.howItWorks.methodologiesDescription}
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {t.howItWorks.methodologies.map((method, i) => (
            <Reveal key={method.title} delay={(i % 2) * 80}>
              <article className="h-full rounded-lg border border-line bg-card p-6">
                <p className="m-0 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink-3">
                  {method.subtitle}
                </p>
                <h4 className="m-0 mt-2 font-sans text-base font-semibold">{method.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{method.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
