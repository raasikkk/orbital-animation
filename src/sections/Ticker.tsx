import { Marquee } from '../components/Marquee'
import { tickerBottom, tickerTop } from '../data/content'

/** Two counter-rotating ribbons that react to scroll speed. */
export function Ticker() {
  return (
    <section
      aria-label="Manifesto"
      className="relative overflow-hidden border-y border-white/8 py-[10vh]"
    >
      <Marquee
        items={tickerTop}
        baseVelocity={-2.6}
        className="text-display text-[clamp(2.6rem,8vw,7rem)] text-white"
      />

      <div className="my-6 h-px w-full bg-white/10" />

      <Marquee
        items={tickerBottom}
        baseVelocity={2.2}
        separator="/"
        className="text-display text-[clamp(2.2rem,6vw,5rem)] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.35)]"
      />
    </section>
  )
}
