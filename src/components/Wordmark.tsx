/* Parcel-outline glyph: the cadastral polygon with one surveyed corner point. */
export function ParcelGlyph({ className }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M4.5 8.5 L13.5 3.5 L20.5 9.5 L17.5 20 L5.5 20.5 Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="miter"
      />
      <rect x="12.1" y="2.1" width="3" height="3" fill="var(--color-amber-mid)" />
    </svg>
  )
}

export default function Wordmark({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <ParcelGlyph className={inverse ? 'text-white' : 'text-ink'} />
      <span
        className={`font-display text-lg font-semibold tracking-[0.02em] ${inverse ? 'text-white' : 'text-ink'}`}
      >
        VERIVAL
      </span>
    </span>
  )
}
