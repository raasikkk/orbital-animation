import { Cpu, Orbit, Radar, Satellite, Waves, type LucideIcon } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { capabilities } from '../data/content'

const ICONS: Record<string, LucideIcon> = { Satellite, Cpu, Radar, Orbit, Waves }

/**
 * Sticky horizontal scroller. The section is as tall as the track is wide, so
 * vertical scroll maps 1:1 onto horizontal travel — pure scroll, no dragging.
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
        <div className="flex items-baseline gap-8 px-6 md:px-10">
          <span className="label">002 — Systems</span>
          <span className="h-px flex-1 bg-bone/12" />
        </div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="mt-16 flex w-max items-stretch will-change-transform"
        >
          <div className="flex w-[min(80vw,460px)] shrink-0 flex-col justify-end px-6 pb-2 md:px-10">
            <h2 className="text-display text-[clamp(2rem,4.6vw,3.8rem)] text-bone">
              Five systems,
              <br />
              <span className="text-ash">one instrument.</span>
            </h2>
            <p className="mt-8 max-w-[32ch] leading-relaxed text-ash">
              Everything on board was rebuilt from the vacuum up. Nothing here
              was adapted from a ground product.
            </p>
          </div>

          {capabilities.map((c) => {
            const Icon = ICONS[c.icon]
            return (
              <article
                key={c.id}
                className="flex h-[52vh] w-[min(78vw,420px)] shrink-0 flex-col justify-between self-center border-l border-bone/12 px-10"
              >
                <header className="flex items-start justify-between">
                  <span className="label">{c.meta}</span>
                  <Icon className="text-ash" size={20} strokeWidth={1} />
                </header>

                <div>
                  <h3 className="text-display text-[clamp(1.7rem,3vw,2.4rem)] text-bone">
                    {c.title}
                  </h3>
                  <p className="mt-6 max-w-[34ch] text-[15px] leading-relaxed text-ash">
                    {c.body}
                  </p>
                </div>
              </article>
            )
          })}

          <div className="flex w-[36vw] shrink-0 items-center pl-16">
            <span className="text-display text-[clamp(1.6rem,4vw,3.4rem)] text-bone/10">
              540 KM
            </span>
          </div>
        </motion.div>

        <div className="mt-16 px-6 md:px-10">
          <div className="relative h-px w-full bg-bone/12">
            <motion.div
              style={{ scaleX: barScale }}
              className="absolute inset-0 origin-left bg-bone/60"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
