import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Database,
  FileText,
  BarChart3,
  AlertTriangle,
  FileCheck,
  UserCheck,
} from 'lucide-react'
import { useLanguage } from '@/i18n/LanguageContext'

const icons = [Database, FileText, BarChart3, AlertTriangle, FileCheck, UserCheck]
const gradients = [
  'from-blue-500/20 to-cyan-500/20',
  'from-violet-500/20 to-purple-500/20',
  'from-emerald-500/20 to-green-500/20',
  'from-amber-500/20 to-orange-500/20',
  'from-rose-500/20 to-pink-500/20',
  'from-sky-500/20 to-blue-500/20',
]
const iconColors = ['text-blue-400', 'text-violet-400', 'text-emerald-400', 'text-amber-400', 'text-rose-400', 'text-sky-400']
const spans = ['lg:col-span-2 lg:row-span-2', 'lg:col-span-1', 'lg:col-span-1', 'lg:col-span-1', 'lg:col-span-1', 'lg:col-span-2']

export default function Features() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="product" className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
            {t.features.label}
          </span>
          <h2 className="mb-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {t.features.heading1}{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t.features.heading2}
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-text-muted md:text-lg">
            {t.features.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {t.features.items.map((feature, i) => {
            const Icon = icons[i]
            const ref = useRef(null)
            const inView = useInView(ref, { once: true, margin: '-50px' })

            return (
              <motion.div
                key={feature.title}
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-bg-card p-6 transition-all duration-300 hover:border-text-dim hover:bg-bg-card-hover ${spans[i]}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${gradients[i]} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
                <div className="relative z-10">
                  <div className="mb-4 flex items-center justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ${iconColors[i]}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                      feature.status === 'Built' || feature.status === 'Zgrajeno'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {feature.status}
                    </span>
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-semibold text-text">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-muted">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
