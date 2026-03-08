import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

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
            Now in Public Beta
          </span>
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-6 font-heading text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <span className="bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">
            Build the Future
          </span>
          <br />
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            With Verival
          </span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg md:text-xl"
        >
          The all-in-one platform that transforms how teams design, develop, and
          deploy digital experiences. Powered by AI, crafted for humans.
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="#pricing"
            className="group flex cursor-pointer items-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-accent px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:shadow-[0_0_30px_rgba(14,165,233,0.4)]"
          >
            Start Building Free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#about"
            className="flex cursor-pointer items-center gap-2 rounded-2xl border border-border px-8 py-4 text-base font-medium text-text-muted transition-all duration-200 hover:border-text-dim hover:text-text"
          >
            <Play className="h-4 w-4" />
            Watch Demo
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-16 grid grid-cols-3 gap-8 border-t border-border pt-8"
        >
          {[
            { value: '10K+', label: 'Active Teams' },
            { value: '99.9%', label: 'Uptime SLA' },
            { value: '2.5x', label: 'Faster Delivery' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading text-2xl font-bold text-text sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-text-dim">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
