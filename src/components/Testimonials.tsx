import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const testimonials = [
  {
    quote: 'The attention to detail and innovative features have completely transformed our workflow. This is exactly what we\'ve been looking for.',
    name: 'Sarah Chen',
    role: 'Product Manager at TechFlow',
    avatar: 'SC',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    quote: 'Implementation was seamless and the results exceeded our expectations. The platform\'s flexibility is remarkable.',
    name: 'Michael Rodriguez',
    role: 'CTO at InnovateSphere',
    avatar: 'MR',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    quote: 'This solution has significantly improved our team\'s productivity. The intuitive interface makes complex tasks simple.',
    name: 'Emily Watson',
    role: 'Operations Director at CloudScale',
    avatar: 'EW',
    gradient: 'from-emerald-500 to-green-500',
  },
  {
    quote: 'Outstanding support and robust features. It\'s rare to find a product that delivers on all its promises.',
    name: 'James Kim',
    role: 'Engineering Lead at DataPro',
    avatar: 'JK',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    quote: 'The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.',
    name: 'Lisa Thompson',
    role: 'VP of Technology at FutureNet',
    avatar: 'LT',
    gradient: 'from-rose-500 to-pink-500',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const next = () => setActive((p) => (p + 1) % testimonials.length)
  const prev = () => setActive((p) => (p - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    const interval = setInterval(next, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="testimonials" className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-4xl" ref={sectionRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-secondary/20 bg-secondary/5 px-4 py-1.5 text-sm text-secondary">
            Testimonials
          </span>
          <h2 className="mb-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Loved by{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Teams Everywhere
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-bg-card p-8 md:p-12"
        >
          <div className="absolute right-8 top-8 font-heading text-6xl font-bold text-white/[0.03] md:text-8xl">
            "
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-8 flex items-center gap-4">
                <div className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${testimonials[active].gradient} text-base font-bold text-white`}>
                  {testimonials[active].avatar}
                </div>
                <div>
                  <h4 className="font-heading text-lg font-semibold text-text">
                    {testimonials[active].name}
                  </h4>
                  <p className="text-sm text-text-dim">
                    {testimonials[active].role}
                  </p>
                </div>
              </div>

              <blockquote className="mb-8 text-lg leading-relaxed text-text-muted md:text-xl">
                "{testimonials[active].quote}"
              </blockquote>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                    i === active ? 'w-8 bg-primary' : 'w-2 bg-border hover:bg-text-dim'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={prev}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border transition-colors hover:border-text-dim hover:bg-white/5"
                aria-label="Previous testimonial"
              >
                <ArrowLeft className="h-4 w-4 text-text-muted" />
              </button>
              <button
                onClick={next}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border transition-colors hover:border-text-dim hover:bg-white/5"
                aria-label="Next testimonial"
              >
                <ArrowRight className="h-4 w-4 text-text-muted" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
