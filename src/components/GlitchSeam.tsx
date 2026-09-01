import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'

/**
 * Section seam that tears into RGB channels the faster you scroll through it.
 * Sits between two sections and gives the screen recording a hard cut.
 */
export function GlitchSeam({ text = 'ORBITAL' }: { text?: string }) {
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smooth = useSpring(velocity, { damping: 40, stiffness: 300 })

  const shift = useTransform(smooth, [-3000, 0, 3000], [22, 0, -22], {
    clamp: true,
  })
  const shiftNeg = useTransform(shift, (v) => -v)
  const intensity = useTransform(smooth, (v) =>
    Math.min(Math.abs(v) / 1800, 1),
  )
  const scanOpacity = useTransform(intensity, [0, 1], [0.05, 0.4])

  return (
    <div
      aria-hidden
      className="relative flex h-[24vh] items-center overflow-hidden border-y border-white/8 bg-void select-none"
    >
      <div className="relative w-full text-center">
        <span className="text-display block text-[clamp(3rem,11vw,9rem)] text-white/8">
          {text}
        </span>
        <motion.span
          style={{ x: shift, opacity: intensity }}
          className="text-display absolute inset-0 block text-[clamp(3rem,11vw,9rem)] text-[#ff2d55] mix-blend-screen"
        >
          {text}
        </motion.span>
        <motion.span
          style={{ x: shiftNeg, opacity: intensity }}
          className="text-display absolute inset-0 block text-[clamp(3rem,11vw,9rem)] text-acid mix-blend-screen"
        >
          {text}
        </motion.span>
      </div>

      <motion.div
        style={{ opacity: scanOpacity }}
        className="pointer-events-none absolute inset-0 [background-image:repeating-linear-gradient(to_bottom,rgba(255,255,255,0.14)_0px,rgba(255,255,255,0.14)_1px,transparent_1px,transparent_4px)]"
      />
      <div className="sweep pointer-events-none absolute inset-x-0 h-[22%] bg-gradient-to-b from-transparent via-acid/8 to-transparent" />
    </div>
  )
}
