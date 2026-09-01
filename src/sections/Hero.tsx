import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowDown } from 'lucide-react'
import { useRef } from 'react'
import { MagneticButton } from '../components/MagneticButton'
import { SplitText } from '../components/SplitText'
import { StarField } from '../components/StarField'
import { heroPlate } from '../data/images'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-38%'])
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.88])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const plateY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const plateScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25])

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate flex h-[100svh] w-full flex-col justify-between overflow-hidden"
    >
      {/* Layer 1 — photographic plate, slowest */}
      <motion.div
        style={{ y: plateY, scale: plateScale }}
        className="absolute inset-0 -z-30"
      >
        <img
          src={heroPlate.src}
          alt={heroPlate.alt}
          className="h-full w-full object-cover opacity-[0.55]"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-void/25 to-void" />
        <div className="absolute inset-0 bg-[radial-gradient(78%_70%_at_50%_42%,transparent,rgba(6,6,7,0.88))]" />
      </motion.div>

      {/* Layer 2 — live star field */}
      <StarField className="absolute inset-0 -z-20 h-full w-full" />

      {/* Layer 3 — grid */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.16] [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:96px_96px] [mask-image:radial-gradient(60%_60%_at_50%_50%,black,transparent)]"
      />

      <div className="h-24" />

      <motion.div
        style={{ y: titleY, scale: titleScale, opacity: fade }}
        className="relative flex flex-col items-center px-5 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.9 }}
          className="label mb-8 block"
        >
          Est. 2031 — Low Earth Orbit
        </motion.span>

        <h1 className="text-display text-[clamp(4rem,15.5vw,17rem)] leading-[0.8] font-semibold text-white">
          <SplitText
            text="ORBITAL"
            immediate
            charStagger={0.055}
            wordStagger={0}
            delay={0.25}
            className="justify-center [word-spacing:0.1em]"
          />
        </h1>

        <div className="mt-8 max-w-[46ch] text-[clamp(0.95rem,1.5vw,1.15rem)] leading-snug tracking-[0.02em] text-ash">
          <SplitText
            text="We build machines that dream in orbit."
            immediate
            charStagger={0.012}
            wordStagger={0.05}
            delay={0.95}
            className="justify-center"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8"
        >
          <MagneticButton href="#concept">Enter the void</MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="relative flex items-end justify-between px-5 pb-8 md:px-9"
      >
        <span className="label hidden sm:block">
          128 nodes / 540 km / autonomous
        </span>
        <span className="breathe flex flex-col items-center gap-2 text-acid">
          <ArrowDown size={16} strokeWidth={1.5} />
          <span className="h-10 w-px bg-gradient-to-b from-acid to-transparent" />
        </span>
        <span className="label hidden text-right sm:block">
          Scroll to begin
          <br />
          transmission
        </span>
      </motion.div>
    </section>
  )
}
