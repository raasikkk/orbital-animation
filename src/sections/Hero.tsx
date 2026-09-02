import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { SplitText } from '../components/SplitText'
import { StarField } from '../components/StarField'
import { heroPlate } from '../data/images'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-34%'])
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0])
  const plateY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const plateScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.18])

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate flex h-[100svh] w-full flex-col justify-between overflow-hidden"
    >
      {/* Slowest layer: the photographic plate. */}
      <motion.div
        style={{ y: plateY, scale: plateScale }}
        className="absolute inset-0 -z-30"
      >
        <img
          src={heroPlate.src}
          alt={heroPlate.alt}
          className="h-full w-full object-cover opacity-40 grayscale"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-void/40 to-void" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_45%,transparent,rgba(10,10,11,0.9))]" />
      </motion.div>

      <StarField className="absolute inset-0 -z-20 h-full w-full" />

      <div className="h-24" />

      <motion.div
        style={{ y: titleY, opacity: fade }}
        className="relative flex flex-col items-center px-6 text-center"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1.4 }}
          className="label mb-10 block"
        >
          Est. 2031 — Low Earth Orbit
        </motion.span>

        <h1 className="text-display text-[clamp(3.6rem,14vw,15rem)] text-bone">
          <SplitText
            text="ORBITAL"
            immediate
            charStagger={0.06}
            wordStagger={0}
            delay={0.3}
            className="justify-center [word-spacing:0.1em]"
          />
        </h1>

        <div className="mt-10 max-w-[42ch] text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-ash">
          <SplitText
            text="We build machines that dream in orbit."
            immediate
            charStagger={0.008}
            wordStagger={0.045}
            delay={1.1}
            className="justify-center"
          />
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="relative flex items-end justify-center px-6 pb-10 sm:justify-between md:px-10"
      >
        <span className="label hidden sm:block">128 nodes / 540 km</span>
        <span className="drift h-14 w-px bg-gradient-to-b from-bone/60 to-transparent" />
        <span className="label hidden text-right sm:block">Scroll</span>
      </motion.div>
    </section>
  )
}
