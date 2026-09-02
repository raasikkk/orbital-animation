import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Counter } from '../components/Counter'
import { ScrollWords } from '../components/ScrollWords'
import { SplitText } from '../components/SplitText'
import { conceptCopy, stats } from '../data/content'
import { conceptPlates } from '../data/images'

export function Concept() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Two depths, two speeds.
  const mid = useTransform(scrollYProgress, [0, 1], ['22%', '-22%'])
  const fast = useTransform(scrollYProgress, [0, 1], ['42%', '-42%'])

  return (
    <section
      ref={ref}
      id="concept"
      className="relative overflow-hidden px-6 py-[22vh] md:px-10"
    >
      <motion.img
        style={{ y: fast }}
        src={conceptPlates[0].src}
        alt={conceptPlates[0].alt}
        loading="lazy"
        className="pointer-events-none absolute top-[10%] right-[6%] hidden w-[16vw] max-w-[220px] opacity-25 grayscale lg:block"
      />
      <motion.img
        style={{ y: mid }}
        src={conceptPlates[1].src}
        alt={conceptPlates[1].alt}
        loading="lazy"
        className="pointer-events-none absolute bottom-[14%] left-[4%] hidden w-[13vw] max-w-[180px] opacity-20 grayscale lg:block"
      />

      <div className="relative mx-auto max-w-[1400px]">
        <div className="flex items-baseline gap-8">
          <span className="label">001 — Concept</span>
          <span className="h-px flex-1 bg-bone/12" />
        </div>

        <h2 className="text-display mt-16 max-w-[16ch] text-[clamp(2.4rem,7vw,6.5rem)] text-bone">
          <SplitText text="Intelligence" charStagger={0.026} />
          <br />
          <span className="text-ash">
            <SplitText text="off-planet" charStagger={0.026} delay={0.1} />
          </span>
        </h2>

        <ScrollWords
          text={conceptCopy}
          className="mt-24 max-w-[24ch] text-[clamp(1.4rem,3vw,2.6rem)] leading-[1.25] font-light tracking-[-0.02em] text-bone md:ml-[44%] md:max-w-[20ch]"
        />

        <div className="mt-[20vh] grid grid-cols-2 gap-x-10 gap-y-14 lg:grid-cols-4">
          {stats.map((s) => (
            <Counter key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}
