import { Marquee } from '../components/Marquee'
import { tickerTop } from '../data/content'

/** One unhurried ribbon. */
export function Ticker() {
  return (
    <section
      aria-label="Manifesto"
      className="relative overflow-hidden border-y border-bone/10 py-[9vh]"
    >
      <Marquee
        items={tickerTop}
        speed={-1.4}
        className="text-display text-[clamp(2.2rem,6vw,5rem)] text-bone"
      />
    </section>
  )
}
