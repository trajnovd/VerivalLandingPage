import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Upload, Bot, SlidersHorizontal, FileOutput, Scale, TrendingUp, Hammer, ShieldCheck } from 'lucide-react'
import { useLanguage } from '@/i18n/LanguageContext'

const stepIcons = [Upload, Bot, SlidersHorizontal, FileOutput]
const stepGradients = [
  'from-blue-500 to-cyan-500',
  'from-violet-500 to-purple-500',
  'from-emerald-500 to-green-500',
  'from-amber-500 to-orange-500',
]
const methodIcons = [Scale, TrendingUp, Hammer, ShieldCheck]

export default function Testimonials() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const methodRef = useRef(null)
  const methodInView = useInView(methodRef, { once: true, margin: '-80px' })

  return (
    <section id="how-it-works" className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-5xl" ref={sectionRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-secondary/20 bg-secondary/5 px-4 py-1.5 text-sm text-secondary">
            {t.howItWorks.label}
          </span>
          <h2 className="mb-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {t.howItWorks.heading1}{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t.howItWorks.heading2}
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-text-muted md:text-lg">
            {t.howItWorks.description}
          </p>
        </motion.div>

        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-border via-primary/30 to-border md:block" />

          {t.howItWorks.steps.map((step, i) => {
            const Icon = stepIcons[i]
            const num = String(i + 1).padStart(2, '0')

            return (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative rounded-2xl border border-border bg-bg-card p-8 transition-all duration-300 hover:border-text-dim hover:bg-bg-card-hover"
              >
                <div className="mb-6 flex items-center gap-4">
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${stepGradients[i]} text-lg font-bold text-white`}>
                    {num}
                  </div>
                  <div>
                    <Icon className="h-5 w-5 text-text-dim" />
                  </div>
                </div>
                <h3 className="mb-3 font-heading text-xl font-semibold text-text">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-muted">
                  {step.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Valuation Methodologies */}
        <div ref={methodRef} className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={methodInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-12 text-center"
          >
            <h3 className="mb-3 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
              {t.howItWorks.methodologiesHeading}
            </h3>
            <p className="mx-auto max-w-2xl text-sm text-text-muted md:text-base">
              {t.howItWorks.methodologiesDescription}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {t.howItWorks.methodologies.map((method, i) => {
              const Icon = methodIcons[i]

              return (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={methodInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-2xl border border-border bg-bg-card p-6 transition-all duration-300 hover:border-text-dim hover:bg-bg-card-hover"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-heading text-base font-semibold text-text">
                        {method.title}
                      </h4>
                      <p className="text-xs text-text-dim">{method.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-text-muted">
                    {method.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
