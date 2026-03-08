import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Layers,
  Zap,
  Shield,
  BarChart3,
  Globe,
  Sparkles,
} from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Workflows',
    description: 'Intelligent automation that learns from your team and suggests optimal workflows in real time.',
    gradient: 'from-violet-500/20 to-purple-500/20',
    iconColor: 'text-violet-400',
    span: 'lg:col-span-2 lg:row-span-2',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Sub-100ms response times with edge computing and global CDN.',
    gradient: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-400',
    span: 'lg:col-span-1',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SOC 2 Type II, GDPR, and HIPAA compliant with zero-trust architecture.',
    gradient: 'from-emerald-500/20 to-green-500/20',
    iconColor: 'text-emerald-400',
    span: 'lg:col-span-1',
  },
  {
    icon: Layers,
    title: 'Seamless Integration',
    description: 'Connect with 200+ tools your team already uses. One-click setup.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-400',
    span: 'lg:col-span-1',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Analytics',
    description: 'Live dashboards with predictive insights and custom reporting.',
    gradient: 'from-rose-500/20 to-pink-500/20',
    iconColor: 'text-rose-400',
    span: 'lg:col-span-1',
  },
  {
    icon: Globe,
    title: 'Global Scale',
    description: 'Deploy to 40+ regions worldwide with automatic failover and load balancing.',
    gradient: 'from-sky-500/20 to-blue-500/20',
    iconColor: 'text-sky-400',
    span: 'lg:col-span-2',
  },
]

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-bg-card p-6 transition-all duration-300 hover:border-text-dim hover:bg-bg-card-hover ${feature.span}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
      <div className="relative z-10">
        <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ${feature.iconColor}`}>
          <feature.icon className="h-6 w-6" />
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
}

export default function Features() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="features" className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
            Features
          </span>
          <h2 className="mb-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Ship Faster
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-text-muted md:text-lg">
            A comprehensive toolkit designed for modern teams who demand
            performance, reliability, and beautiful design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
