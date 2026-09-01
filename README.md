# ORBITAL — animated one-page site

A dark, type-led landing page built to be **screen-recorded**: every section has its
own scroll-linked animation so a single slow scroll through the page reads as a
finished reel.

Stack: **Vite 8 · React 19 · TypeScript · Tailwind CSS v4 · Motion (Framer Motion) ·
Lenis · GSAP ticker · lucide-react**.

## Run

```bash
pnpm dev        # http://localhost:5173
pnpm build      # tsc -b + vite build
pnpm preview    # serve the production build
pnpm lint
```

## Recording tips

- Record at 1600×900 or larger; the layout is desktop-first.
- Scroll slowly and evenly — Lenis smooths the wheel, and the marquee, glitch seams
  and progress rail all react to scroll *velocity*, so a steady scroll looks best.
- The native scrollbar is hidden on purpose; the right-hand rail is the indicator.
- Hover states worth catching on camera: the capability cards (3D tilt + glow),
  the gallery spotlight (`Move the cursor` block), and both magnetic buttons.

## Where things live

```
src/
  lib/
    smoothScroll.ts   Lenis, driven by the GSAP ticker (one rAF loop for the app)
    pointer.ts        single pointermove listener -> shared MotionValues
    useMagnetic.ts    magnetic pull toward the cursor
    useTilt.ts        3D tilt + pointer-tracked highlight
    motionPresets.ts  shared easings and reveal variants
  components/
    Cursor.tsx        blend-mode cursor, sized by `data-cursor` on hovered elements
    SplitText.tsx     per-character blur/rise reveal (nested word + char staggers)
    ScrollWords.tsx   paragraph that lights up word by word with scroll progress
    Marquee.tsx       seamless ribbon, speed and shear driven by scroll velocity
    StarField.tsx     canvas star field, parallax by pointer + scroll
    GlitchSeam.tsx    RGB-split seam between sections
    TiltCard.tsx  Counter.tsx  ProgressRail.tsx  Grain.tsx  Nav.tsx
  sections/
    Hero  Concept  Capabilities  Gallery  Timeline  Ticker  Footer
  data/
    content.ts  images.ts   all copy, stats and image URLs
```

Each section deliberately uses a *different* reveal mechanic: character rise (hero),
word-by-word opacity (concept), sticky horizontal travel (capabilities), `clip-path`
aperture + counter-scale (gallery), scroll-drawn rail (timeline), velocity-reactive
marquee (ticker), `background-clip: text` flood (footer).

## Tuning

- Scroll feel: `lerp` in `src/lib/smoothScroll.ts` (lower = heavier glide).
- Accent colour and fonts: the `@theme` block at the top of `src/index.css`.
- Copy, stats, timeline and ticker words: `src/data/content.ts`.
- Photography: `src/data/images.ts` (Unsplash URLs, swap the photo IDs).

## Notes

- `resolve.dedupe` + `optimizeDeps.include` in `vite.config.ts` are required: without
  them Vite's optimizer emits a second copy of React for `motion` and hooks break.
- Animation is limited to `transform`, `opacity` and `clip-path`; glows are radial
  gradients rather than large blurs, and the hero canvas pauses when off-screen.
- `prefers-reduced-motion` disables Lenis and collapses the animations.
- Credit line and Instagram handle in `src/sections/Footer.tsx` are placeholders
  (`JOIN WAY` / `@joinway`).
