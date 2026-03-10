import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'

const team = [
  {
    name: 'Dimitar Trajanov',
    role: { en: 'Co-Founder', si: 'Soustanovitelj' },
    bio: { en: 'PhD in Computer Science', si: 'Doktor računalniških znanosti' },
    initials: 'DT',
    image: '/images/Dimitar Trajanov pp.jpeg',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Vladimir Chakarov',
    role: { en: 'Co-Founder', si: 'Soustanovitelj' },
    bio: { en: 'Serial entrepreneur with multiple businesses', si: 'Serijski podjetnik z več podjetji' },
    initials: 'VC',
    image: '/images/Vladimir Chararov pp.jpeg',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    name: 'Ermina Chakarova',
    role: { en: 'Co-Founder', si: 'Soustanoviteljica' },
    bio: { en: 'Licensed real estate valuator in Slovenia', si: 'Pooblaščena cenilka nepremičnin v Sloveniji' },
    initials: 'EC',
    image: null,
    gradient: 'from-emerald-500 to-green-500',
  },
  {
    name: 'Risto Trajanov',
    role: { en: 'Data Scientist & Developer', si: 'Podatkovni znanstvenik in razvijalec' },
    bio: { en: '', si: '' },
    initials: 'RT',
    image: '/images/Risto Trajanov pp.jpeg',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    name: 'Andrej Krstevski',
    role: { en: 'Backend Engineer & System Architect', si: 'Backend inženir in sistemski arhitekt' },
    bio: { en: '', si: '' },
    initials: 'AK',
    image: '/images/Andrej Krstevski pp.jpeg',
    gradient: 'from-rose-500 to-pink-500',
  },
  {
    name: 'Darko Trajanov',
    role: { en: 'Software Developer', si: 'Razvijalec programske opreme' },
    bio: { en: '', si: '' },
    initials: 'DT',
    image: '/images/darkopp.jpeg',
    gradient: 'from-sky-500 to-blue-500',
  },
]

export default function Team() {
  const { lang, t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
            {t.team.label}
          </span>
          <h2 className="mb-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {t.team.heading1}{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t.team.heading2}
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-text-muted md:text-lg">
            {t.team.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-bg-card p-8 transition-all duration-300 hover:border-text-dim hover:bg-bg-card-hover"
            >
              <div className="flex items-center gap-5">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-20 w-20 shrink-0 rounded-2xl object-cover"
                  />
                ) : (
                  <div className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${member.gradient} text-xl font-bold text-white`}>
                    {member.initials}
                  </div>
                )}
                <div className="min-w-0">
                  <h3 className="font-heading text-lg font-semibold text-text">
                    {member.name}
                  </h3>
                  <p className="text-sm text-text-muted">{member.role[lang]}</p>
                  {member.bio[lang] && (
                    <p className="mt-1.5 text-xs text-text-dim">{member.bio[lang]}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
