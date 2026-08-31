import { useEffect, useRef, useState } from 'react'
import { Check, ArrowRight, Mail, Loader2 } from 'lucide-react'
import { useLanguage } from '@/i18n/LanguageContext'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'

const inputClass =
  'w-full rounded-lg border border-line bg-card px-3.5 py-2.5 text-sm text-ink placeholder-ink-3 outline-none transition-colors focus:border-amber-mid focus:ring-1 focus:ring-amber-mid'

type CaptchaRenderApi = {
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
  ready?: (cb: () => void) => void
}

type CaptchaApi = CaptchaRenderApi & {
  enterprise?: CaptchaRenderApi
}

declare global {
  interface Window {
    grecaptcha?: CaptchaApi
    __ENV__?: { RECAPTCHA_SITE_KEY?: string }
  }
}

export default function Pricing() {
  const { t } = useLanguage()
  const signupEndpoint = import.meta.env.VITE_SIGNUP_ENDPOINT ?? '/api/early-access'
  const recaptchaSiteKey =
    (typeof window !== 'undefined' ? window.__ENV__?.RECAPTCHA_SITE_KEY : '') ||
    import.meta.env.VITE_RECAPTCHA_SITE_KEY
  const captchaContainerRef = useRef<HTMLDivElement | null>(null)
  const captchaWidgetIdRef = useRef<string | number | null>(null)
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [captchaToken, setCaptchaToken] = useState('')

  const hasRenderableCaptcha = () => resolveCaptchaApi() !== null

  function resolveCaptchaApi(): CaptchaRenderApi | null {
    const api = window.grecaptcha?.enterprise ?? window.grecaptcha
    if (api && typeof api.render === 'function') {
      return api
    }

    return null
  }

  const resetCaptcha = () => {
    const grecaptcha = resolveCaptchaApi()
    if (!recaptchaSiteKey || !grecaptcha) {
      return
    }

    if (captchaWidgetIdRef.current !== null) {
      grecaptcha.reset(captchaWidgetIdRef.current)
    }

    setCaptchaToken('')
  }

  useEffect(() => {
    if (!recaptchaSiteKey) {
      return
    }

    const renderWidget = () => {
      const grecaptcha = resolveCaptchaApi()
      if (!grecaptcha || !captchaContainerRef.current || captchaWidgetIdRef.current !== null) {
        return
      }

      captchaWidgetIdRef.current = grecaptcha.render(captchaContainerRef.current, {
        sitekey: recaptchaSiteKey,
        callback: (token) => {
          setCaptchaToken(token)
          setError(null)
        },
        'expired-callback': () => {
          setCaptchaToken('')
        },
        'error-callback': () => {
          setCaptchaToken('')
          setError(t.earlyAccess.captchaErrorMessage)
        },
      })
    }

    const onScriptLoad = () => {
      const api = window.grecaptcha?.enterprise ?? window.grecaptcha
      if (api && typeof api.ready === 'function') {
        api.ready(renderWidget)
      } else {
        renderWidget()
      }
    }

    const scriptId = 'google-recaptcha-script'
    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null
    if (existingScript) {
      if (hasRenderableCaptcha()) {
        renderWidget()
      } else {
        existingScript.remove()
        ;(window as Window & { grecaptcha?: CaptchaApi }).grecaptcha = undefined
        captchaWidgetIdRef.current = null

        const replacementScript = document.createElement('script')
        replacementScript.id = scriptId
        replacementScript.src = 'https://www.google.com/recaptcha/api.js?render=explicit'
        replacementScript.async = true
        replacementScript.defer = true
        replacementScript.addEventListener('load', onScriptLoad, { once: true })
        document.head.appendChild(replacementScript)
      }
      return
    }

    const script = document.createElement('script')
    script.id = scriptId
    script.src = 'https://www.google.com/recaptcha/api.js?render=explicit'
    script.async = true
    script.defer = true
    script.addEventListener('load', onScriptLoad, { once: true })
    document.head.appendChild(script)

    return () => {
      script.removeEventListener('load', onScriptLoad)
    }
  }, [recaptchaSiteKey, t.earlyAccess.captchaErrorMessage])

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
      if (recaptchaSiteKey && !captchaToken) {
        setError(t.earlyAccess.captchaRequiredMessage)
        setSubmitting(false)
        return
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

        resetCaptcha()
        return
      }

      setSubmitted(true)
    } catch (submitError) {
      console.error('Early access submission failed:', submitError)
      setError(t.earlyAccess.errorMessage)
      resetCaptcha()
    } finally {
      setSubmitting(false)
    }
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
                          onChange={(e) => updateField('firstName', e.target.value)}
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
                          onChange={(e) => updateField('lastName', e.target.value)}
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
                        onChange={(e) => updateField('email', e.target.value)}
                        className={inputClass}
                        placeholder="janez@example.com"
                      />
                    </div>
                    {recaptchaSiteKey ? <div ref={captchaContainerRef} /> : null}
                    {error ? (
                      <p className="m-0 rounded-lg bg-red-tint px-4 py-3 text-[13px] leading-relaxed text-red-ink" role="alert">
                        {error}
                      </p>
                    ) : null}
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
