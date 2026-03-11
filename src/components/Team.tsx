import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'

const team = [
  {
    name: 'Prof. dr. Dimitar Trajanov',
    role: { en: 'Co-Founder & AI Advisor', si: 'Soustanovitelj in AI mentor' },
    bio: {
      en: 'Visiting Research Professor at Boston University and Full Professor at FINKI, Ss. Cyril and Methodius University. Elected Associate Member of the Macedonian Academy of Sciences and Arts in 2025. Author of 200+ papers and 7 books, with research in AI, Data Science, and NLP.',
      si: 'Gostujoči raziskovalni profesor na Boston University in redni profesor na FINKI, Univerza Sv. Cirila in Metoda. Leta 2025 izvoljen za izrednega člana Makedonske akademije znanosti in umetnosti. Avtor več kot 200 člankov in 7 knjig s področij umetne inteligence, podatkovnih znanosti in NLP.',
    },
    initials: 'DT',
    image: '/images/Dimitar Trajanov pp.jpeg',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Vladimir Chakarov',
    role: { en: 'Co-Founder & CEO', si: 'Soustanovitelj in direktor' },
    bio: {
      en: 'CEO of VERIVAL and project lead for reValu8. Founder of PELAGUS IT with deep experience in B2B software solutions and data systems. Co-founded ParkSpot, a parking tech startup in North Macedonia.',
      si: 'Direktor VERIVAL in vodja izvedbe projekta reValu8. Ustanovitelj PELAGUS IT z dolgoletnimi izkušnjami pri razvoju kompleksnih B2B rešitev in podatkovnih sistemov. Soustanovitelj ParkSpot, startup podjetja na področju parkiranja v Severni Makedoniji.',
    },
    initials: 'VC',
    image: '/images/Vladimir Chararov pp.jpeg',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    name: 'Mag. Ermina Bender',
    role: { en: 'Co-Founder & Domain Expert', si: 'Soustanoviteljica in strokovna nosilka' },
    bio: {
      en: 'Licensed real estate valuator and domain expert for reValu8. Holds an MSc in Economics (Finance) and a degree in Electrical Engineering, with 15+ years of experience in insolvency proceedings where valuations are a key decision-making tool.',
      si: 'Pooblaščena ocenjevalka vrednosti nepremičnin in strokovna nosilka domenskega področja v projektu reValu8. Magistrica ekonomije (finance) in univ. dipl. inž. elektrotehnike z več kot 15-letnimi izkušnjami v insolvenčnih postopkih, kjer so cenitve ključno orodje za odločanje.',
    },
    initials: 'EB',
    image: null,
    gradient: 'from-emerald-500 to-green-500',
  },
  {
    name: 'Mag. Risto Trajanov',
    role: { en: 'Co-Founder & AI/ML Lead', si: 'Soustanovitelj in vodja AI/ML' },
    bio: {
      en: 'Data Scientist at Deutser and Fulbright Scholar with an M.S. in Data Science from Rice University. Leads AI/ML development at VERIVAL, designing the multi-agent architecture for automated property appraisals. Previously co-founded Amectron (Boston), securing a $50,000 NSF grant.',
      si: 'Podatkovni znanstvenik v podjetju Deutser in Fulbrightov štipendist z magisterijem iz podatkovnih znanosti na Rice University. Vodi AI/ML razvoj v podjetju VERIVAL ter načrtuje večagentni sistem za avtomatizirane cenitve nepremičnin. Prej soustanovitelj Amectron (Boston), kjer je pridobil 50.000 USD nepovratnih sredstev NSF.',
    },
    initials: 'RT',
    image: '/images/Risto Trajanov pp.jpeg',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    name: 'Andrej Krstevski',
    role: { en: 'Co-Founder & System Architect', si: 'Soustanovitelj in sistemski arhitekt' },
    bio: {
      en: 'CTO & Solutions Delivery Lead at PELAGUS IT with 10+ years building scalable systems and infrastructure. Leads system architecture at VERIVAL, focusing on security, access management, and data source integrations.',
      si: 'CTO in vodja izvedbe rešitev v PELAGUS IT z več kot desetletjem izkušenj pri razvoju skalabilnih sistemov in infrastrukture. V projektu reValu8 vodi sistemsko arhitekturo s poudarkom na varnosti, upravljanju dostopov in integracijah podatkovnih virov.',
    },
    initials: 'AK',
    image: '/images/Andrej Krstevski pp.jpeg',
    gradient: 'from-rose-500 to-pink-500',
  },
  {
    name: 'Darko Trajanov',
    role: { en: 'Software Developer', si: 'Razvijalec programske opreme' },
    bio: {
      en: 'Computer Science student at FINKI and full-stack developer specializing in AI-powered products. Published researcher at CIIT 2025 on multi-agent AI systems and winner of multiple hackathons.',
      si: 'Študent računalništva na FINKI in full-stack razvijalec, specializiran za produkte, ki jih poganja umetna inteligenca. Objavljeni raziskovalec na CIIT 2025 o večagentnih AI sistemih in zmagovalec več hekatonov.',
    },
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
                </div>
              </div>
              {member.bio[lang] && (
                <p className="mt-4 text-xs leading-relaxed text-text-dim">{member.bio[lang]}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
