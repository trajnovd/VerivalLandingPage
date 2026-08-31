import { useLanguage } from '@/i18n/LanguageContext'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'

const team = [
  {
    name: 'Prof. dr. Dimitar Trajanov',
    role: { en: 'AI Advisor', si: 'AI mentor' },
    bio: {
      en: 'Visiting Research Professor at Boston University and Full Professor at FINKI, Ss. Cyril and Methodius University. Elected Associate Member of the Macedonian Academy of Sciences and Arts in 2025. Author of 200+ papers and 7 books, with research in AI, Data Science, and NLP.',
      si: 'Gostujoči raziskovalni profesor na Boston University in redni profesor na FINKI, Univerza Sv. Cirila in Metoda. Leta 2025 izvoljen za izrednega člana Makedonske akademije znanosti in umetnosti. Avtor več kot 200 člankov in 7 knjig s področij umetne inteligence, podatkovnih znanosti in NLP.',
    },
    initials: 'DT',
    image: '/images/Dimitar Trajanov pp.jpeg',
  },
  {
    name: 'Vladimir Chakarov',
    role: { en: 'CEO', si: 'Direktor' },
    bio: {
      en: 'CEO of VERIVAL and project lead for reValu8. Founder of PELAGUS IT with deep experience in B2B software solutions and data systems. Co-founded ParkSpot, a parking tech startup in North Macedonia.',
      si: 'Direktor VERIVAL in vodja izvedbe projekta reValu8. Ustanovitelj PELAGUS IT z dolgoletnimi izkušnjami pri razvoju kompleksnih B2B rešitev in podatkovnih sistemov. Soustanovitelj ParkSpot, startup podjetja na področju parkiranja v Severni Makedoniji.',
    },
    initials: 'VC',
    image: '/images/Vladimir Chararov pp.jpeg',
  },
  {
    name: 'Mag. Ermina Bender',
    role: { en: 'Domain Expert', si: 'Strokovna nosilka' },
    bio: {
      en: 'Licensed real estate valuator and domain expert for reValu8. Holds an MSc in Economics (Finance) and a degree in Electrical Engineering, with 15+ years of experience in insolvency proceedings where valuations are a key decision-making tool.',
      si: 'Pooblaščena ocenjevalka vrednosti nepremičnin in strokovna nosilka domenskega področja v projektu reValu8. Magistrica ekonomije (finance) in univ. dipl. inž. elektrotehnike z več kot 15-letnimi izkušnjami v insolvenčnih postopkih, kjer so cenitve ključno orodje za odločanje.',
    },
    initials: 'EB',
    image: '/images/ErminaBenderpp.png',
  },
  {
    name: 'Mag. Risto Trajanov',
    role: { en: 'AI/ML Lead', si: 'Vodja AI/ML' },
    bio: {
      en: 'Data Scientist at Deutser and Fulbright Scholar with an M.S. in Data Science from Rice University. Leads AI/ML development at VERIVAL, designing the multi-agent architecture for automated property appraisals. Previously co-founded Amectron (Boston), securing a $50,000 NSF grant.',
      si: 'Podatkovni znanstvenik v podjetju Deutser in Fulbrightov štipendist z magisterijem iz podatkovnih znanosti na Rice University. Vodi AI/ML razvoj v podjetju VERIVAL ter načrtuje večagentni sistem za avtomatizirane cenitve nepremičnin. Prej soustanovitelj Amectron (Boston), kjer je pridobil 50.000 USD nepovratnih sredstev NSF.',
    },
    initials: 'RT',
    image: '/images/Risto Trajanov pp.jpeg',
  },
  {
    name: 'Andrej Krstevski',
    role: { en: 'System Architect', si: 'Sistemski arhitekt' },
    bio: {
      en: 'CTO & Solutions Delivery Lead at PELAGUS IT with 10+ years building scalable systems and infrastructure. Leads system architecture at VERIVAL, focusing on security, access management, and data source integrations.',
      si: 'CTO in vodja izvedbe rešitev v PELAGUS IT z več kot desetletjem izkušenj pri razvoju skalabilnih sistemov in infrastrukture. V projektu reValu8 vodi sistemsko arhitekturo s poudarkom na varnosti, upravljanju dostopov in integracijah podatkovnih virov.',
    },
    initials: 'AK',
    image: '/images/Andrej Krstevski pp.jpeg',
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
  },
]

export default function Team() {
  const { lang, t } = useLanguage()

  return (
    <section className="px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          num="03"
          label={t.team.label}
          title={
            <>
              {t.team.heading1} <span className="italic">{t.team.heading2}</span>
            </>
          }
          description={t.team.description}
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={(i % 3) * 80}>
              <article className="group h-full rounded-lg border border-line bg-card p-6">
                <div className="flex items-center gap-4">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      className="h-16 w-16 shrink-0 rounded-lg border border-line object-cover grayscale transition-[filter] duration-300 group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-ink font-display text-lg font-semibold text-white">
                      {member.initials}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="m-0 font-sans text-base font-semibold">{member.name}</h3>
                    <p className="m-0 mt-1 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-ink-3">
                      {member.role[lang]}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-[13px] leading-relaxed text-ink-2">{member.bio[lang]}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
