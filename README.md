# ORBITAL — animated one-page site

A monochrome, type-led landing page built to be **screen-recorded**: every
animation is driven by scroll position, so a single slow scroll through the page
is the whole reel. Nothing depends on a cursor — there are no hover effects, no
custom cursor and no click-only states.

Stack: **Vite 8 · React 19 · TypeScript · Tailwind CSS v4 · Motion (Framer Motion) ·
Lenis · GSAP ticker · lucide-react**.

## Run

```bash
pnpm dev        # http://localhost:5173
pnpm build      # tsc -b + vite build
pnpm preview    # serve the production build
pnpm lint
```

## Palette

Bone on charcoal, no chromatic accent — emphasis comes from size, spacing and
hairline weight. All photography is desaturated.

| Token | Value | Use |
| --- | --- | --- |
| `void` | `#0A0A0B` | page ground |
| `ink` | `#0F0F11` | image placeholders |
| `bone` | `#EDE9E1` | headlines, active state |
| `ash` | `#6E6C68` | body copy, labels |

Hairlines are `bone/12`. All four live in the `@theme` block at the top of
`src/index.css`.

## Recording tips

- Record at 1600×900 or larger; the layout is desktop-first.
- Scroll slowly and evenly — Lenis smooths the wheel and every reveal is bound to
  scroll progress, so the pace of the scroll is the pace of the animation.
- The native scrollbar is hidden; the hairline rail on the right is the indicator.
- The big beat is the full-bleed plate at the end of the field record — it opens
  from a letterbox slit to the full frame.

## Where things live

```
src/
  lib/
    smoothScroll.ts   Lenis, driven by the GSAP ticker (one rAF loop for the app)
    motionPresets.ts  shared easing and reveal variants
  components/
    SplitText.tsx     per-character rise + focus (nested word and char staggers)
    ScrollWords.tsx   paragraph that lights up word by word with scroll progress
    Marquee.tsx       seamless ribbon at a constant speed
    StarField.tsx     canvas star field, parallax from scroll only
    Counter.tsx  ProgressRail.tsx  Grain.tsx  Nav.tsx
  sections/
    Hero  Concept  Capabilities  Gallery  Timeline  Ticker  Footer
  data/
    content.ts  images.ts   all copy, stats and image URLs
```

Each section uses a *different* reveal mechanic: character rise (hero),
word-by-word opacity (concept), sticky horizontal travel (systems), `clip-path`
aperture plus counter-scale (field record), a scroll-drawn rail (trajectory), a
slow ribbon (ticker), `background-clip: text` flood (footer).

## Tuning

- Scroll feel: `lerp` in `src/lib/smoothScroll.ts` (lower = heavier glide).
- Palette and fonts: the `@theme` block in `src/index.css`.
- Copy, stats, timeline and ticker words: `src/data/content.ts`.
- Photography: `src/data/images.ts` (Unsplash URLs, swap the photo IDs).

## Notes

- `resolve.dedupe` + `optimizeDeps.include` in `vite.config.ts` are required:
  without them Vite's optimizer emits a second copy of React for `motion` and
  hooks break.
- Animation is limited to `transform`, `opacity` and `clip-path`; the hero canvas
  pauses when off-screen and deep sections use `content-visibility`.
- `prefers-reduced-motion` disables Lenis and collapses the animations.
- Three packages are pinned (`lucide-react`, `globals`, `electron-to-chromium`)
  because Vercel rejects lockfile entries published within its minimum-release-age
  window.
- Credit line and Instagram handle in `src/sections/Footer.tsx` are placeholders
  (`JOIN WAY` / `@joinway`).
