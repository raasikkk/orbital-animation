import type { Variants } from 'motion/react'

export const expo = [0.16, 1, 0.3, 1] as const

/** Characters rise out of a mask and settle into focus. Kept gentle. */
export const riseIn: Variants = {
  hidden: { y: '104%', opacity: 0, filter: 'blur(8px)' },
  show: {
    y: '0%',
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.15, ease: expo },
  },
}

export const fadeUp: Variants = {
  hidden: { y: 22, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 1.1, ease: expo } },
}

export const stagger = (amount: number, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: amount, delayChildren: delay } },
})
