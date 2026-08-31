# DESIGN.md — VERIVAL landing (reValu8)

The landing page is set like the valuation document reValu8 produces: evidence in
hairline report tables, achromatic chrome, colour only where it means state. Derived
from the Revalu8 app's design system; the app remains the source of truth for state
colour semantics.

## Tokens (src/index.css `@theme`)

| Token | Value | Use |
|---|---|---|
| `paper` | `hsl(220 14% 96%)` | page ground (same as the app) |
| `card` | `#ffffff` | every card and table surface |
| `ink` | `hsl(224 22% 11%)` | text, primary buttons, closing panel |
| `ink-2` / `ink-3` | greys of the same hue | secondary / meta text (ink-3 ≥4.5:1 on white) |
| `line` / `line-strong` | `hsl(220 13% 88%)` / `76%` | 1px hairlines only — never thicker |
| `amber-mark` / `amber-mid` / `amber-ink` | `#F59E0B` / `#D97706` / `#B45309` | state: in progress, prototype, adjusted |
| `amber-tint` / `emerald-tint` | 8–9% tints | badge/panel fills — never solid state fills |
| `emerald-ink` | `#047857` | state: built, confirmed, open |
| `on-ink-2` | `hsl(222 14% 74%)` | secondary text on the ink panel (hue-tinted, not grey) |

**The rule: if a colour isn't saying something about state, it is grey.** Amber =
in-progress / prototype / adjusted. Emerald = built / confirmed / accepting. No blue,
no gradients, no glass.

## Type

- **Besley** (`font-display`) — display only: h1–h3, wordmark, stat values. A Clarendon;
  the registry/official-map lettering of the zemljiška knjiga world. Italic carries the
  second half of paired headings.
- **Inter** (`font-sans`) — body and UI, 400/500/600/700.
- **Spline Sans Mono** (`font-mono`) — cadastral IDs, table headers, section numerals,
  form labels, badges. `.microlabel` = 11px / 500 / 0.18em tracking / uppercase.
- Hero signature: the full stops in the headline claims are `amber-mid`.

## Components

- `.report-table` — the professional report look: 1px rule on every cell, mono
  tracked header row on paper, zebra rows, `tabular-nums`. Used for the six agents,
  project facts, company identification, and the ETN excerpt. Wide tables scroll
  inside their own container.
- `.btn-primary` (ink) / `.btn-ghost` (white + hairline) / `.btn-inverse*` (on ink panel).
  Radius 8px everywhere; pills fully round.
- Status badges: 8% tint + saturated text + 6px dot, mono 11px.
- `SectionHeader` — sections are numbered like report chapters: `01 | LABEL ———` rule,
  then the Besley heading. Numbers are honest: the page reads as one document.
- `ParcelExhibit` — the signature element: parcel `2626-1338-341` as a thin outlined
  polygon (amber = the subject being appraised) over a muted survey grid, with north
  arrow, scale bar, and an ETN comparables table whose adjusted row is amber-flagged
  "prilagojeno". Exhibit labels stay Slovenian; figures are synthetic and captioned so.

## Motion budget (total)

1. `rise` — 600ms fade + 10px rise, staggered on hero load; 500ms `Reveal` on scroll.
2. `draw` — the hero parcel outline draws itself once (stroke-dashoffset).

Both gated behind `prefers-reduced-motion: no-preference`. Add nothing else.

## Interaction vocabulary

- "Try reValu8" always links to https://revalu8.verival.si/ (`APP_URL` const), same
  label everywhere, external with ArrowUpRight.
- Focus: 2px ink outline (`:focus-visible`); inputs focus to a 1px amber ring with an
  amber caret. Selection is an amber tint.
- Team photos are grayscale, colour on hover.

## Do not

- Introduce a brand hue, gradients, glass, coloured left-borders, or icon-tile cards.
- Use amber or emerald decoratively.
- Add eyebrow pills above headings — section labels live on the numbered rule line.
