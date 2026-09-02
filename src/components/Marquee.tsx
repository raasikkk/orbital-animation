import { motion, useAnimationFrame, useMotionValue, useTransform } from 'motion/react'

const wrap = (min: number, max: number, v: number) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

type Props = {
  items: string[]
  /** Percent of one copy per second. Negative drifts left. */
  speed?: number
  className?: string
  separator?: string
}

/** Seamless ribbon at a constant, unhurried speed. */
export function Marquee({
  items,
  speed = -1.6,
  className = '',
  separator = '—',
}: Props) {
  const baseX = useMotionValue(0)
  // Four copies of the track: wrapping between -25% and -50% is always seamless.
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`)

  useAnimationFrame((_t, delta) => {
    baseX.set(baseX.get() + speed * (delta / 1000))
  })

  return (
    <div className="flex w-full flex-nowrap overflow-hidden">
      <motion.div
        style={{ x }}
        className={`flex flex-nowrap whitespace-nowrap will-change-transform ${className}`}
      >
        {[0, 1, 2, 3].map((copy) => (
          <span key={copy} className="flex shrink-0 items-center">
            {items.map((item, i) => (
              <span key={i} className="flex shrink-0 items-center">
                <span className="px-8">{item}</span>
                <span className="text-ash">{separator}</span>
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
