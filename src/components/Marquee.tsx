import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'
import { useRef } from 'react'

const wrap = (min: number, max: number, v: number) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

type Props = {
  items: string[]
  baseVelocity?: number
  className?: string
  separator?: string
}

/**
 * Seamless marquee whose speed — and direction — are modulated by how fast the
 * page is being scrolled. Scroll hard and the ribbon whips and shears.
 */
export function Marquee({
  items,
  baseVelocity = -2.4,
  className = '',
  separator = '✦',
}: Props) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 380,
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 4], {
    clamp: false,
  })
  const skew = useTransform(smoothVelocity, [-2500, 0, 2500], [6, 0, -6], {
    clamp: true,
  })

  // Four copies of the track: wrapping between -25% and -50% is always seamless.
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`)
  const direction = useRef(1)

  useAnimationFrame((_t, delta) => {
    let moveBy = direction.current * baseVelocity * (delta / 1000)
    const factor = velocityFactor.get()
    if (factor < 0) direction.current = -1
    else if (factor > 0) direction.current = 1
    moveBy += direction.current * moveBy * Math.abs(factor)
    baseX.set(baseX.get() + moveBy)
  })

  const row = (key: number) => (
    <span key={key} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={i} className="flex shrink-0 items-center">
          <span className="px-6">{item}</span>
          <span className="text-acid">{separator}</span>
        </span>
      ))}
    </span>
  )

  return (
    <motion.div
      style={{ skewX: skew }}
      className="flex w-full flex-nowrap overflow-hidden"
    >
      <motion.div
        style={{ x }}
        className={`flex flex-nowrap whitespace-nowrap will-change-transform ${className}`}
      >
        {[0, 1, 2, 3].map(row)}
      </motion.div>
    </motion.div>
  )
}
