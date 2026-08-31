import type { ReactNode } from 'react'
import Reveal from './Reveal'

/* Sections are numbered like the chapters of a valuation report. */
export default function SectionHeader({
  num,
  label,
  title,
  description,
}: {
  num: string
  label: string
  title: ReactNode
  description?: string
}) {
  return (
    <Reveal>
      <div className="flex items-center gap-3">
        <span className="microlabel text-ink-3">{num}</span>
        <span className="h-3 w-px bg-line-strong" aria-hidden="true" />
        <span className="microlabel text-ink-3">{label}</span>
        <span className="h-px flex-1 bg-line" aria-hidden="true" />
      </div>
      <h2 className="mt-6 max-w-3xl font-display text-3xl leading-[1.12] tracking-tight text-balance sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-2 md:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  )
}
