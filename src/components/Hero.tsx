import { motion } from 'framer-motion'
import { ArrowRight, Eye } from 'lucide-react'
import { useLanguage } from '@/i18n/LanguageContext'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0.3 + i * 0.2,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    },
  }),
}

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-20">
      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-accent/[0.05] blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/80" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5"
        >
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="text-sm tracking-wide text-text-muted">
            {t.hero.badge}
          </span>
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-6 font-heading text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">
            {t.hero.headline1}
          </span>
          <br />
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            {t.hero.headline2}
          </span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg md:text-xl"
        >
          {t.hero.subheadline}
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="#early-access"
            className="group flex cursor-pointer items-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-accent px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:shadow-[0_0_30px_rgba(14,165,233,0.4)]"
          >
            {t.hero.ctaPrimary}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#how-it-works"
            className="flex cursor-pointer items-center gap-2 rounded-2xl border border-border px-8 py-4 text-base font-medium text-text-muted transition-all duration-200 hover:border-text-dim hover:text-text"
          >
            <Eye className="h-4 w-4" />
            {t.hero.ctaSecondary}
          </a>
        </motion.div>

        {/* Trust Bar */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-text-dim"
        >
          {t.hero.trustBar.map((item, i) => (
            <span key={i}>
              {i > 0 && <span className="mr-6 hidden sm:inline">&#183;</span>}
              {item}
            </span>
          ))}
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-12 grid grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-4"
        >
          {t.hero.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading text-2xl font-bold text-text sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-text-dim sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
