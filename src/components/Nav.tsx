import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 80))

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 transition-all duration-700 md:px-10 ${
        scrolled ? 'border-b border-bone/8 bg-void/80 py-4' : 'py-8'
      }`}
    >
      <a
        href="#top"
        className="text-display text-[13px] tracking-[0.4em] text-bone uppercase"
      >
        Orbital
      </a>

      <span className="label hidden md:block">Deep space systems</span>

      <a href="#contact" className="label text-bone/70">
        Contact
      </a>
    </motion.header>
  )
}
