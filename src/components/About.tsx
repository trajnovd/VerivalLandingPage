import { Shield, Eye, UserCheck, Scale } from 'lucide-react'
import { useLanguage } from '@/i18n/LanguageContext'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'

const valueIcons = [Shield, Eye, UserCheck, Scale]

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="scroll-mt-16 px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          num="02"
          label={t.about.label}
          title={
            <>
              {t.about.heading1} <span className="italic">{t.about.heading2}</span>
            </>
          }
        />

        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="text-base leading-relaxed text-ink-2 md:text-lg">
              {t.about.story1prefix}
              <span className="font-semibold text-ink">{t.about.story1bold}</span>
            </p>
            <p className="mt-5 text-base leading-relaxed text-ink-2 md:text-lg">
              {t.about.story2}
            </p>

            {/* Company facts, set like the identification table of a report */}
            <div className="mt-8 overflow-hidden rounded-lg border border-line bg-card">
              <table className="report-table">
                <tbody>
                  {t.about.companyDetails.map((item) => (
                    <tr key={item.label}>
                      <th scope="row" className="w-40 !border-r !border-line">
                        {item.label}
                      </th>
                      <td className="text-sm font-medium">{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.1em] text-ink-3">
              {t.about.valuesHeading}
            </h3>
            <ul className="mt-2 list-none divide-y divide-line p-0">
              {t.about.values.map((value, i) => {
                const Icon = valueIcons[i]
                return (
                  <li key={value.title} className="py-5">
                    <div className="flex items-center gap-3">
                      <Icon className="h-[18px] w-[18px] text-ink-3" aria-hidden="true" />
                      <h4 className="m-0 font-sans text-base font-semibold">{value.title}</h4>
                    </div>
                    <p className="mt-2 pl-[30px] text-sm leading-relaxed text-ink-2">
                      {value.description}
                    </p>
                  </li>
                )
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
