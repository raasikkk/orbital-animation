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

  // Three depths, three speeds.
  const slow = useTransform(scrollYProgress, [0, 1], ['12%', '-12%'])
  const mid = useTransform(scrollYProgress, [0, 1], ['26%', '-26%'])
  const fast = useTransform(scrollYProgress, [0, 1], ['48%', '-48%'])
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 8])

  return (
    <section
      ref={ref}
      id="concept"
      className="relative overflow-hidden px-5 py-[18vh] md:px-9"
    >
      <motion.img
        style={{ y: fast, rotate }}
        src={conceptPlates[0].src}
        alt={conceptPlates[0].alt}
        loading="lazy"
        className="pointer-events-none absolute top-[8%] -right-[6%] w-[26vw] max-w-[300px] rounded-2xl opacity-30 grayscale"
      />
      <motion.img
        style={{ y: mid }}
        src={conceptPlates[1].src}
        alt={conceptPlates[1].alt}
        loading="lazy"
        className="pointer-events-none absolute bottom-[16%] -left-[4%] hidden w-[20vw] max-w-[240px] rounded-2xl opacity-25 grayscale lg:block"
      />
      <motion.div
        style={{ y: slow }}
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(198,255,61,0.09),transparent_66%)]"
      />

      <div className="relative mx-auto max-w-[1400px]">
        <div className="flex items-baseline gap-6">
          <span className="label">01 — Concept</span>
          <span className="h-px flex-1 bg-white/12" />
        </div>

        <h2 className="text-display mt-12 max-w-[16ch] text-[clamp(2.6rem,8vw,7.5rem)] text-white">
          <SplitText text="Intelligence" charStagger={0.03} />
          <br />
          <span className="text-acid">
            <SplitText text="off-planet" charStagger={0.03} delay={0.12} />
          </span>
        </h2>

        <ScrollWords
          text={conceptCopy}
          className="mt-16 max-w-[24ch] text-[clamp(1.6rem,3.6vw,3.1rem)] leading-[1.15] font-light tracking-[-0.02em] text-white md:ml-[42%] md:max-w-[20ch]"
        />

        <div className="mt-[14vh] grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
          {stats.map((s) => (
            <Counter key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}
