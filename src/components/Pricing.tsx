import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Check, ArrowRight, Mail, Loader2 } from 'lucide-react'
import { useLanguage } from '@/i18n/LanguageContext'

type CaptchaApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string
      callback: (token: string) => void
      'expired-callback'?: () => void
      'error-callback'?: () => void
    },
  ) => string | number
  reset: (widgetId?: string | number) => void
  ready: (cb: () => void) => void
  execute: (siteKey: string, options: { action: string }) => Promise<string>
}

declare global {
  interface Window {
    grecaptcha?: CaptchaApi
  }
}

export default function Pricing() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const signupEndpoint = import.meta.env.VITE_SIGNUP_ENDPOINT ?? '/api/early-access'
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [recaptchaReady, setRecaptchaReady] = useState(false)

  useEffect(() => {
    if (!recaptchaSiteKey) {
      return
    }

    const scriptId = 'google-recaptcha-script'
    const existingScript = document.getElementById(scriptId)
    if (existingScript) {
      return
    }

    const script = document.createElement('script')
    script.id = scriptId
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(recaptchaSiteKey)}`
    script.async = true
    script.defer = true
    script.onload = () => {
      if (!window.grecaptcha) {
        return
      }

      window.grecaptcha.ready(() => {
        setRecaptchaReady(true)
      })
    }
    document.head.appendChild(script)

    if (window.grecaptcha) {
      window.grecaptcha.ready(() => {
        setRecaptchaReady(true)
      })
    }
  }, [recaptchaSiteKey])

  const updateField = (field: 'firstName' | 'lastName' | 'email', value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (error) {
      setError(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setSubmitting(true)
    setError(null)

    try {
      let captchaToken = ''

      // Get reCAPTCHA v3 token right before submit.
      if (recaptchaSiteKey) {
        if (!window.grecaptcha || !recaptchaReady) {
          setError(t.earlyAccess.captchaErrorMessage)
          setSubmitting(false)
          return
        }

        try {
          await new Promise<void>((resolve) => {
            window.grecaptcha?.ready(() => resolve())
          })
          captchaToken = await window.grecaptcha.execute(recaptchaSiteKey, { action: 'submit' })

          if (!captchaToken) {
            setError(t.earlyAccess.captchaErrorMessage)
            setSubmitting(false)
            return
          }
        } catch (err) {
          console.error('reCAPTCHA execute failed:', err)
          setError(t.earlyAccess.captchaErrorMessage)
          setSubmitting(false)
          return
        }
      }

      const response = await fetch(signupEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          captchaToken,
        }),
      })

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => null)
        const apiError = typeof errorPayload?.error === 'string' ? errorPayload.error : ''

        if (apiError.includes('Captcha')) {
          setError(t.earlyAccess.captchaErrorMessage)
        } else {
          setError(t.earlyAccess.errorMessage)
        }

        return
      }

      setSubmitted(true)
    } catch (submitError) {
      console.error('Early access submission failed:', submitError)
      setError(t.earlyAccess.errorMessage)
    } finally {
      setSubmitting(false)
    }
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
              <a href="mailto:support@verival.si" className="text-primary hover:underline">support@verival.si</a>
            </div>
          </motion.div>

          {/* Signup Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative overflow-visible rounded-2xl border border-primary/40 bg-gradient-to-b from-primary/10 to-bg-card pt-10 pb-8 px-8 shadow-[0_0_40px_rgba(14,165,233,0.1)]"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2 text-xs font-semibold text-white whitespace-nowrap">
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
                        onChange={(e) => updateField('firstName', e.target.value)}
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
                        onChange={(e) => updateField('lastName', e.target.value)}
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
                      onChange={(e) => updateField('email', e.target.value)}
                      className="w-full rounded-xl border border-border bg-bg/50 px-4 py-3 text-sm text-text placeholder-text-dim outline-none transition-colors focus:border-primary"
                      placeholder="janez@example.com"
                    />
                  </div>
                  {error ? (
                    <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                      {error}
                    </p>
                  ) : null}
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
