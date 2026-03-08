import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative overflow-hidden px-4 py-24 md:py-32">
      <div className="mx-auto max-w-4xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="relative overflow-hidden rounded-3xl border border-border bg-bg-card p-12 text-center md:p-20"
        >
          {/* Animated gradient background */}
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(ellipse at 30% 50%, rgba(14,165,233,0.3) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(249,115,22,0.2) 0%, transparent 60%)',
            }}
          />

          {/* Grid pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <div className="relative z-10">
            <h2 className="mb-6 font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Ready to Transform
              <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Your Workflow?
              </span>
            </h2>

            <p className="mx-auto mb-10 max-w-xl text-base text-text-muted md:text-lg">
              Join 10,000+ teams already building the future with Verival.
              Start free, upgrade when you're ready.
            </p>

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="#"
                className="group flex cursor-pointer items-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-accent px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:shadow-[0_0_30px_rgba(14,165,233,0.4)]"
              >
                Get Started for Free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#"
                className="cursor-pointer rounded-2xl border border-border px-8 py-4 text-base font-medium text-text-muted transition-all duration-200 hover:border-text-dim hover:text-text"
              >
                Talk to Sales
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
