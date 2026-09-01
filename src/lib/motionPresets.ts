import type { Transition, Variants } from 'motion/react'

export const expo = [0.16, 1, 0.3, 1] as const
export const swift = [0.33, 1, 0.68, 1] as const

export const softSpring: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 30,
  mass: 0.6,
}

export const cursorSpring: Transition = {
  type: 'spring',
  stiffness: 520,
  damping: 42,
  mass: 0.45,
}

/** Blur-in + rise. Used for characters and words. */
export const riseIn: Variants = {
  hidden: { y: '108%', opacity: 0, filter: 'blur(14px)' },
  show: {
    y: '0%',
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: expo },
  },
}

export const fadeUp: Variants = {
  hidden: { y: 28, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.9, ease: expo } },
}

export const stagger = (amount: number, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: amount, delayChildren: delay } },
})
