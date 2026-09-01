import { Cpu, Orbit, Radar, Satellite, Waves, type LucideIcon } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { TiltCard } from '../components/TiltCard'
import { capabilities } from '../data/content'

const ICONS: Record<string, LucideIcon> = { Satellite, Cpu, Radar, Orbit, Waves }

/**
 * Sticky horizontal scroller. The section is as tall as the track is wide, so
 * vertical scroll maps 1:1 onto horizontal travel — no pinning plugin needed,
 * which keeps it stable under React StrictMode and Lenis.
 */
export function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current
      if (!track) return
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth))
    }
    measure()
    window.addEventListener('resize', measure)
    const id = window.setTimeout(measure, 400) // after webfonts settle
    return () => {
      window.removeEventListener('resize', measure)
      window.clearTimeout(id)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section
      ref={sectionRef}
      id="systems"
      className="relative"
      style={{ height: `calc(100svh + ${distance}px)` }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="flex items-baseline gap-6 px-5 md:px-9">
          <span className="label">02 — Systems</span>
          <span className="h-px flex-1 bg-white/12" />
          <span className="label hidden md:block">Scroll to travel</span>
        </div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="mt-10 flex w-max gap-6 px-5 will-change-transform md:px-9"
        >
          <div className="flex h-[62vh] w-[min(72vw,380px)] shrink-0 flex-col justify-end pr-12">
            <h2 className="text-display text-[clamp(2.4rem,5.6vw,4.6rem)] text-white">
              Five systems,
              <br />
              <span className="text-acid">one instrument.</span>
            </h2>
            <p className="mt-6 max-w-[30ch] text-[15px] leading-relaxed text-ash">
              Everything on board was rebuilt from the vacuum up. Nothing here
              was adapted from a ground product.
            </p>
          </div>

          {capabilities.map((c) => (
            <TiltCard
              key={c.id}
              icon={ICONS[c.icon]}
              title={c.title}
              body={c.body}
              meta={c.meta}
            />
          ))}

          <div className="flex h-[62vh] w-[40vw] shrink-0 items-center">
            <span className="text-display text-[clamp(2rem,6vw,5rem)] text-white/10">
              → 540 KM
            </span>
          </div>
        </motion.div>

        <div className="mt-10 px-5 md:px-9">
          <div className="relative h-px w-full bg-white/12">
            <motion.div
              style={{ scaleX: barScale }}
              className="absolute inset-0 origin-left bg-acid"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
