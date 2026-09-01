import { animate, motion, useInView, useMotionValue, useTransform } from 'motion/react'
import { useEffect, useRef } from 'react'

type Props = {
  value: number
  suffix?: string
  decimals?: number
  label: string
}

/** Count-up that fires once, the first time the stat enters the viewport. */
export function Counter({ value, suffix = '', decimals = 0, label }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const count = useMotionValue(0)
  const text = useTransform(count, (v) =>
    v.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }),
  )

  useEffect(() => {
    if (!inView) return
    const controls = animate(count, value, {
      duration: 2.1,
      ease: [0.16, 1, 0.3, 1],
    })
    return () => controls.stop()
  }, [inView, count, value])

  return (
    <div ref={ref} className="border-t border-white/12 pt-5">
      <div className="tabular text-display flex items-baseline text-[clamp(2.6rem,5.4vw,4.6rem)] leading-none text-white">
        <motion.span>{text}</motion.span>
        <span className="text-acid">{suffix}</span>
      </div>
      <p className="mt-3 text-[11px] tracking-[0.24em] text-ash uppercase">
        {label}
      </p>
    </div>
  )
}
