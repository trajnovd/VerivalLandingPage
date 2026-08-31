import { useState } from 'react'
import { Check, ArrowRight, Mail, Loader2 } from 'lucide-react'
import { useLanguage } from '@/i18n/LanguageContext'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'

const inputClass =
  'w-full rounded-lg border border-line bg-card px-3.5 py-2.5 text-sm text-ink placeholder-ink-3 outline-none transition-colors focus:border-amber-mid focus:ring-1 focus:ring-amber-mid'

export default function Pricing() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 1000)
  }

  return (
    <section id="early-access" className="scroll-mt-16 px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          num="05"
          label={t.earlyAccess.label}
          title={
            <>
              {t.earlyAccess.heading1} <span className="italic">{t.earlyAccess.heading2}</span>
            </>
          }
          description={t.earlyAccess.description}
        />

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-2">
          {/* What the pilot includes */}
          <Reveal>
            <div className="rounded-lg border border-line bg-card p-7">
              <h3 className="m-0 font-sans text-lg font-semibold">
                {t.earlyAccess.includesHeading}
              </h3>
              <p className="mt-1.5 text-sm text-ink-2">{t.earlyAccess.includesSubtitle}</p>

              <ul className="mt-6 list-none space-y-3.5 p-0">
                {t.earlyAccess.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-ink-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-ink" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Amber = in preparation */}
              <div className="mt-7 rounded-lg bg-amber-tint p-4">
                <p className="m-0 text-[13px] leading-relaxed text-ink-2">
                  <span className="font-semibold text-amber-ink">{t.earlyAccess.pricingNote}</span>{' '}
                  {t.earlyAccess.pricingDescription}
                </p>
              </div>

              <p className="m-0 mt-6 flex flex-wrap items-center gap-2 text-sm text-ink-2">
                <Mail className="h-4 w-4 text-ink-3" aria-hidden="true" />
                <span>{t.earlyAccess.contactLabel}</span>
                <a
                  href="mailto:support@verival.si"
                  className="font-medium text-ink underline decoration-line-strong hover:decoration-ink"
                >
                  support@verival.si
                </a>
              </p>
            </div>
          </Reveal>

          {/* Sign-up form */}
          <Reveal delay={100}>
            <div className="rounded-lg border border-line bg-card p-7">
              {/* Emerald = open / accepting */}
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-tint px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-ink" aria-hidden="true" />
                <span className="font-mono text-[11px] font-medium text-emerald-ink">
                  {t.earlyAccess.formBadge}
                </span>
              </span>

              {submitted ? (
                <div className="py-12 text-center" role="status">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-tint">
                    <Check className="h-7 w-7 text-emerald-ink" aria-hidden="true" />
                  </div>
                  <h3 className="m-0 font-sans text-lg font-semibold">
                    {t.earlyAccess.successHeading}
                  </h3>
                  <p className="mt-2 text-sm text-ink-2">{t.earlyAccess.successMessage}</p>
                </div>
              ) : (
                <>
                  <h3 className="m-0 mt-5 font-sans text-lg font-semibold">
                    {t.earlyAccess.formHeading}
                  </h3>
                  <p className="mt-1.5 text-sm text-ink-2">{t.earlyAccess.formSubtitle}</p>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="mb-1.5 block font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-ink-3"
                        >
                          {t.earlyAccess.firstName}
                        </label>
                        <input
                          id="firstName"
                          type="text"
                          required
                          autoComplete="given-name"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className={inputClass}
                          placeholder="Janez"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="mb-1.5 block font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-ink-3"
                        >
                          {t.earlyAccess.lastName}
                        </label>
                        <input
                          id="lastName"
                          type="text"
                          required
                          autoComplete="family-name"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className={inputClass}
                          placeholder="Novak"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1.5 block font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-ink-3"
                      >
                        {t.earlyAccess.email}
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={inputClass}
                        placeholder="janez@example.com"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn btn-primary group w-full disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                          {t.earlyAccess.submitting}
                        </>
                      ) : (
                        <>
                          {t.earlyAccess.submitButton}
                          <ArrowRight
                            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
