import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Check, ArrowRight, Mail, Loader2 } from 'lucide-react'
import { useLanguage } from '@/i18n/LanguageContext'

export default function Pricing() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
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
    <section id="early-access" className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent">
            {t.earlyAccess.label}
          </span>
          <h2 className="mb-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {t.earlyAccess.heading1}{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t.earlyAccess.heading2}
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-text-muted md:text-lg">
            {t.earlyAccess.description}
          </p>
        </motion.div>

        <div className="grid items-start gap-8 lg:grid-cols-2">
          {/* What's included */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl border border-border bg-bg-card p-8"
          >
            <h3 className="mb-2 font-heading text-xl font-bold text-text">
              {t.earlyAccess.includesHeading}
            </h3>
            <p className="mb-6 text-sm text-text-dim">
              {t.earlyAccess.includesSubtitle}
            </p>

            <ul className="mb-8 space-y-4">
              {t.earlyAccess.includes.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-text-muted">
                  <Check className="h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="rounded-xl border border-border bg-bg/50 p-4">
              <p className="text-xs text-text-dim">
                <span className="font-semibold text-text-muted">{t.earlyAccess.pricingNote}</span>{' '}
                {t.earlyAccess.pricingDescription}
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-text-dim">
              <Mail className="h-4 w-4" />
              <span>{t.earlyAccess.contactLabel} </span>
              <a href="mailto:info@verival.si" className="text-primary hover:underline">info@verival.si</a>
            </div>
          </motion.div>

          {/* Signup Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative overflow-hidden rounded-2xl border border-primary/40 bg-gradient-to-b from-primary/10 to-bg-card p-8 shadow-[0_0_40px_rgba(14,165,233,0.1)]"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-accent px-4 py-1 text-xs font-semibold text-white">
              {t.earlyAccess.formBadge}
            </div>

            {submitted ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                  <Check className="h-8 w-8 text-emerald-400" />
                </div>
                <h3 className="mb-2 font-heading text-xl font-bold text-text">
                  {t.earlyAccess.successHeading}
                </h3>
                <p className="text-sm text-text-muted">
                  {t.earlyAccess.successMessage}
                </p>
              </div>
            ) : (
              <>
                <h3 className="mb-1 mt-4 font-heading text-xl font-bold text-text">
                  {t.earlyAccess.formHeading}
                </h3>
                <p className="mb-6 text-sm text-text-dim">
                  {t.earlyAccess.formSubtitle}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="mb-1.5 block text-xs font-medium text-text-muted">
                        {t.earlyAccess.firstName}
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full rounded-xl border border-border bg-bg/50 px-4 py-3 text-sm text-text placeholder-text-dim outline-none transition-colors focus:border-primary"
                        placeholder="Janez"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="mb-1.5 block text-xs font-medium text-text-muted">
                        {t.earlyAccess.lastName}
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full rounded-xl border border-border bg-bg/50 px-4 py-3 text-sm text-text placeholder-text-dim outline-none transition-colors focus:border-primary"
                        placeholder="Novak"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-text-muted">
                      {t.earlyAccess.email}
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-border bg-bg/50 px-4 py-3 text-sm text-text placeholder-text-dim outline-none transition-colors focus:border-primary"
                      placeholder="janez@example.com"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:shadow-[0_0_20px_rgba(14,165,233,0.3)] disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t.earlyAccess.submitting}
                      </>
                    ) : (
                      <>
                        {t.earlyAccess.submitButton}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
