import { motion, useScroll, useSpring } from 'motion/react'

/** Hairline scroll indicator on the right — stands in for the hidden scrollbar. */
export function ProgressRail() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 34,
    mass: 0.4,
  })

  return (
    <div className="pointer-events-none fixed top-1/2 right-8 z-40 hidden h-[26vh] w-px -translate-y-1/2 bg-bone/12 md:block">
      <motion.div
        className="absolute inset-x-0 top-0 h-full origin-top bg-bone/70"
        style={{ scaleY: progress }}
      />
    </div>
  )
}
