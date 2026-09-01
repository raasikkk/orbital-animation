import { motion, useScroll, useSpring, useTransform } from 'motion/react'

const MARKS = ['HERO', 'CONCEPT', 'SYSTEMS', 'FIELD', 'TIMELINE', 'CONTACT']

/** Right-hand scroll rail — replaces the hidden native scrollbar. */
export function ProgressRail() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 34,
    mass: 0.4,
  })
  const percent = useTransform(progress, (v) =>
    String(Math.round(v * 100)).padStart(3, '0'),
  )

  return (
    <div className="pointer-events-none fixed top-1/2 right-5 z-50 hidden -translate-y-1/2 flex-col items-end gap-4 md:flex">
      <motion.span className="tabular text-[10px] tracking-[0.3em] text-ash">
        {percent}
      </motion.span>

      <div className="relative h-[38vh] w-px bg-white/12">
        <motion.div
          className="absolute inset-x-0 top-0 origin-top bg-acid"
          style={{ height: '100%', scaleY: progress }}
        />
        {MARKS.map((_, i) => (
          <span
            key={i}
            className="absolute -left-[3px] h-px w-[7px] bg-white/25"
            style={{ top: `${(i / (MARKS.length - 1)) * 100}%` }}
          />
        ))}
      </div>

      <span className="[writing-mode:vertical-rl] text-[9px] tracking-[0.4em] text-ash/70 uppercase">
        scroll
      </span>
    </div>
  )
}
