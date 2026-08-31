import { useLanguage } from '@/i18n/LanguageContext'

/*
 * The signature element: a cadastral parcel exhibit, the way reValu8 draws it —
 * thin outlined polygons over a muted survey grid, the cadastral ID notation
 * (2626-1338-341), and an ETN comparables table with one amber "adjusted" row.
 * Exhibit labels stay Slovenian — the product's reports are in Slovenian.
 * All figures are synthetic; the caption below says so in both languages.
 */
export default function ParcelExhibit() {
  const { t } = useLanguage()

  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-lg border border-line bg-card">
        {/* Header bar, set like a report exhibit heading */}
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
          <span className="microlabel text-ink-3">Izris parcele · GURS ZKN</span>
          <span className="font-mono text-xs font-medium tracking-wide text-amber-ink">
            2626-1338-341
          </span>
        </div>

        {/* Survey drawing */}
        <svg
          viewBox="0 0 520 300"
          role="img"
          aria-label="Cadastral parcel drawing, parcel 341, 412 square metres"
          className="block w-full"
        >
          {/* Survey grid */}
          <g stroke="var(--color-line)" strokeWidth="1">
            {Array.from({ length: 12 }, (_, i) => (
              <line key={`v${i}`} x1={i * 44 + 20} y1="0" x2={i * 44 + 20} y2="300" />
            ))}
            {Array.from({ length: 7 }, (_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 44 + 20} x2="520" y2={i * 44 + 20} />
            ))}
          </g>

          {/* Neighbouring parcels */}
          <g fill="none" stroke="var(--color-line-strong)" strokeWidth="1.2">
            <path d="M-10 90 L120 60 L150 150 L60 205 L-10 180 Z" />
            <path d="M120 60 L235 25 L300 45 L285 95 L150 150 Z" />
            <path d="M60 205 L150 150 L200 250 L110 310 L30 290 Z" />
            <path d="M420 40 L530 25 L540 140 L455 150 Z" />
            <path d="M395 170 L455 150 L540 140 L530 280 L430 290 Z" />
            <path d="M200 250 L330 235 L360 310 L230 320 Z" />
          </g>
          <g
            fill="var(--color-ink-3)"
            fontFamily="var(--font-mono)"
            fontSize="10"
            letterSpacing="0.05em"
          >
            <text x="62" y="130">338/2</text>
            <text x="205" y="75">339</text>
            <text x="105" y="245">340/1</text>
            <text x="465" y="95">344</text>
            <text x="462" y="220">343/5</text>
            <text x="270" y="285">342</text>
          </g>

          {/* Parcel 341 — the subject. Amber = the state being appraised. */}
          <path
            d="M150 150 L285 95 L400 120 L395 170 L330 235 L200 250 Z"
            fill="var(--color-amber-tint)"
          />
          <path
            d="M150 150 L285 95 L400 120 L395 170 L330 235 L200 250 Z"
            fill="none"
            stroke="var(--color-amber-mid)"
            strokeWidth="1.8"
            strokeLinejoin="miter"
            pathLength={1}
            className="parcel-draw"
          />
          {/* Surveyed corner points */}
          <g fill="var(--color-card)" stroke="var(--color-amber-mid)" strokeWidth="1.4">
            <rect x="146" y="146" width="8" height="8" />
            <rect x="281" y="91" width="8" height="8" />
            <rect x="396" y="116" width="8" height="8" />
            <rect x="391" y="166" width="8" height="8" />
            <rect x="326" y="231" width="8" height="8" />
            <rect x="196" y="246" width="8" height="8" />
          </g>

          {/* Parcel label */}
          <text
            x="272"
            y="172"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="15"
            fontWeight="500"
            fill="var(--color-ink)"
          >
            341
          </text>
          <text
            x="272"
            y="192"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="11"
            fill="var(--color-ink-2)"
          >
            412 m²
          </text>

          {/* North arrow + scale */}
          <g stroke="var(--color-ink-3)" strokeWidth="1.2" fill="none">
            <line x1="36" y1="52" x2="36" y2="26" />
            <path d="M31 33 L36 24 L41 33" />
          </g>
          <text x="33" y="66" fontFamily="var(--font-mono)" fontSize="10" fill="var(--color-ink-3)">
            S
          </text>
          <g fill="var(--color-ink-3)" fontFamily="var(--font-mono)" fontSize="10">
            <text x="420" y="288">1 : 1000</text>
          </g>
          <line x1="420" y1="272" x2="480" y2="272" stroke="var(--color-ink-3)" strokeWidth="1.2" />
          <line x1="420" y1="268" x2="420" y2="276" stroke="var(--color-ink-3)" strokeWidth="1.2" />
          <line x1="480" y1="268" x2="480" y2="276" stroke="var(--color-ink-3)" strokeWidth="1.2" />
        </svg>

        {/* ETN comparables excerpt — one row amber-flagged as adjusted */}
        <div className="border-t border-line">
          <table className="report-table text-[13px]">
            <thead>
              <tr>
                <th scope="col">Vir · ETN</th>
                <th scope="col">Površina</th>
                <th scope="col">Cena</th>
                <th scope="col" className="w-1">Op.</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-mono text-ink-2">ETN 2024/118</td>
                <td>84 m²</td>
                <td>3.120 €/m²</td>
                <td />
              </tr>
              <tr className="!bg-amber-tint">
                <td className="font-mono text-ink-2">ETN 2024/205</td>
                <td>76 m²</td>
                <td>2.980 €/m²</td>
                <td>
                  <span className="font-mono text-[11px] font-medium text-amber-ink">
                    prilagojeno
                  </span>
                </td>
              </tr>
              <tr>
                <td className="font-mono text-ink-2">ETN 2025/041</td>
                <td>91 m²</td>
                <td>3.240 €/m²</td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <figcaption className="mt-2 text-right font-mono text-[11px] text-ink-3">
        {t.hero.exhibitNote}
      </figcaption>
    </figure>
  )
}
