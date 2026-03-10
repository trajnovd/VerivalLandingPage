import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Shield, Eye, UserCheck, Scale } from 'lucide-react'
import { useLanguage } from '@/i18n/LanguageContext'

const valueIcons = [Shield, Eye, UserCheck, Scale]

export default function About() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <span className="mb-4 inline-block rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent">
              {t.about.label}
            </span>
            <h2 className="mb-6 font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {t.about.heading1}{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t.about.heading2}
              </span>
            </h2>
            <p className="mb-6 text-base leading-relaxed text-text-muted md:text-lg">
              {t.about.story1prefix}
              <span className="font-semibold text-text">
                {t.about.story1bold}
              </span>
            </p>
            <p className="mb-8 text-base leading-relaxed text-text-muted md:text-lg">
              {t.about.story2}
            </p>

            <div className="grid grid-cols-2 gap-4">
              {t.about.companyDetails.map((item) => (
                <div key={item.label} className="rounded-xl border border-border bg-bg-card p-4">
                  <div className="font-heading text-sm font-bold text-text">{item.value}</div>
                  <div className="mt-1 text-xs text-text-dim">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="space-y-6"
          >
            <h3 className="font-heading text-xl font-semibold text-text">{t.about.valuesHeading}</h3>
            {t.about.values.map((value, i) => {
              const Icon = valueIcons[i]
              const isHighlighted = i < 2 // Trust and Transparency

              return (
                <div
                  key={value.title}
                  className={`rounded-2xl border p-6 transition-colors hover:border-text-dim ${
                    isHighlighted
                      ? 'border-primary/30 bg-gradient-to-br from-primary/[0.08] to-bg-card shadow-[0_0_20px_rgba(14,165,233,0.06)]'
                      : 'border-border bg-bg-card'
                  }`}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      isHighlighted ? 'bg-primary/10 text-primary' : 'bg-white/5 text-primary'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="font-heading text-base font-semibold text-text">
                      {value.title}
                    </h4>
                  </div>
                  <p className="text-sm leading-relaxed text-text-muted">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
