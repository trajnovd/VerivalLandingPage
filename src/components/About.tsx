import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 2000
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      start = Math.round(eased * target)
      setCount(start)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, target])

  return (
    <span ref={ref} className="font-heading text-4xl font-bold text-text sm:text-5xl">
      {count}{suffix}
    </span>
  )
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <span className="mb-4 inline-block rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent">
              About Us
            </span>
            <h2 className="mb-6 font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              We're Redefining How{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Teams Collaborate
              </span>
            </h2>
            <p className="mb-6 text-base leading-relaxed text-text-muted md:text-lg">
              Founded in 2024, Verival brings together AI research, beautiful design, and
              enterprise-grade infrastructure. We believe the best tools should feel
              invisible, letting your team focus on what matters most.
            </p>
            <p className="text-base leading-relaxed text-text-muted md:text-lg">
              Our platform is trusted by startups and Fortune 500 companies alike,
              processing millions of workflows daily across 40+ countries.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              { value: 10000, suffix: '+', label: 'Teams Worldwide' },
              { value: 50, suffix: 'M+', label: 'Workflows Processed' },
              { value: 99, suffix: '.9%', label: 'Platform Uptime' },
              { value: 40, suffix: '+', label: 'Countries Served' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-bg-card p-6 text-center transition-colors hover:border-text-dim"
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <div className="mt-2 text-sm text-text-dim">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
