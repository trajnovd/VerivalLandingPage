import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check, ArrowRight } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: '$0',
    period: '/month',
    description: 'Perfect for individuals and small projects.',
    features: [
      '5 Team Members',
      '10 Projects',
      'Basic Analytics',
      'Community Support',
      '1GB Storage',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'For growing teams that need more power.',
    features: [
      'Unlimited Members',
      'Unlimited Projects',
      'Advanced Analytics',
      'Priority Support',
      '100GB Storage',
      'API Access',
      'Custom Integrations',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Tailored solutions for large organizations.',
    features: [
      'Everything in Pro',
      'Dedicated Support',
      'SLA Guarantee',
      'On-Premise Option',
      'Unlimited Storage',
      'SSO & SAML',
      'Custom Contracts',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

export default function Pricing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="pricing" className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent">
            Pricing
          </span>
          <h2 className="mb-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Simple,{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Transparent Pricing
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-text-muted md:text-lg">
            No hidden fees. No surprises. Choose the plan that fits your needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ${
                plan.popular
                  ? 'border-primary/40 bg-gradient-to-b from-primary/10 to-bg-card shadow-[0_0_40px_rgba(14,165,233,0.1)]'
                  : 'border-border bg-bg-card hover:border-text-dim'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-accent px-4 py-1 text-xs font-semibold text-white">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="mb-2 font-heading text-xl font-semibold text-text">
                  {plan.name}
                </h3>
                <p className="text-sm text-text-dim">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="font-heading text-4xl font-bold text-text">
                  {plan.price}
                </span>
                <span className="text-text-dim">{plan.period}</span>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-text-muted">
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={`group flex cursor-pointer items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-primary to-accent text-white hover:shadow-[0_0_20px_rgba(14,165,233,0.3)]'
                    : 'border border-border text-text-muted hover:border-text-dim hover:text-text'
                }`}
              >
                {plan.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
