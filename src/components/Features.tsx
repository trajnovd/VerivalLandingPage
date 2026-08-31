import { useLanguage } from '@/i18n/LanguageContext'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'

function StatusBadge({ status }: { status: string }) {
  const built = status === 'Built' || status === 'Zgrajeno'
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[11px] font-medium ${
        built ? 'bg-emerald-tint text-emerald-ink' : 'bg-amber-tint text-amber-ink'
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${built ? 'bg-emerald-ink' : 'bg-amber-mark'}`}
        aria-hidden="true"
      />
      {status}
    </span>
  )
}

export default function Features() {
  const { t } = useLanguage()

  return (
    <section id="product" className="scroll-mt-16 px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          num="01"
          label={t.features.label}
          title={
            <>
              {t.features.heading1} <span className="italic">{t.features.heading2}</span>
            </>
          }
          description={t.features.description}
        />

        <Reveal className="mt-10" delay={100}>
          {/* Desktop: the report table itself */}
          <div className="hidden overflow-hidden rounded-lg border border-line bg-card md:block">
            <table className="report-table">
              <thead>
                <tr>
                  <th scope="col" className="w-14">{t.features.table.num}</th>
                  <th scope="col" className="w-64">{t.features.table.agent}</th>
                  <th scope="col">{t.features.table.description}</th>
                  <th scope="col" className="w-40">{t.features.table.status}</th>
                </tr>
              </thead>
              <tbody>
                {t.features.items.map((feature, i) => (
                  <tr key={feature.title}>
                    <td className="font-mono text-xs text-ink-3">
                      {String(i + 1).padStart(2, '0')}
                    </td>
                    <td className="text-sm font-semibold">{feature.title}</td>
                    <td className="text-sm leading-relaxed text-ink-2">{feature.description}</td>
                    <td>
                      <StatusBadge status={feature.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: same rows, stacked */}
          <div className="overflow-hidden rounded-lg border border-line bg-card md:hidden">
            {t.features.items.map((feature, i) => (
              <div
                key={feature.title}
                className={`p-4 ${i > 0 ? 'border-t border-line' : ''} ${i % 2 === 1 ? 'bg-paper/60' : ''}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-mono text-xs text-ink-3">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-sans text-sm font-semibold">{feature.title}</h3>
                  </div>
                  <StatusBadge status={feature.status} />
                </div>
                <p className="mt-2 pl-7 text-sm leading-relaxed text-ink-2">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
