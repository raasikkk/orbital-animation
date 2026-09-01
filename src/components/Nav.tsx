import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'

const fmt = (d: Date) =>
  [d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds()]
    .map((n) => String(n).padStart(2, '0'))
    .join(':')

export function Nav() {
  const [clock, setClock] = useState(() => fmt(new Date()))
  const [compact, setCompact] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    const id = window.setInterval(() => setClock(fmt(new Date())), 1000)
    return () => window.clearInterval(id)
  }, [])

  useMotionValueEvent(scrollY, 'change', (v) => setCompact(v > 80))

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-[90] flex items-center justify-between px-5 transition-all duration-500 md:px-9 ${
        compact
          ? 'border-b border-white/8 bg-void/70 py-4 backdrop-blur-md'
          : 'py-7'
      }`}
    >
      <a
        href="#top"
        data-cursor="hover"
        className="text-display text-[15px] tracking-[0.32em] text-white uppercase"
      >
        Orbital
        <span className="ml-1 inline-block h-[6px] w-[6px] rounded-full bg-acid align-middle" />
      </a>

      <span className="label hidden md:block">Deep space systems</span>

      <div className="flex items-center gap-6">
        <span className="tabular hidden text-[11px] tracking-[0.24em] text-ash sm:block">
          UTC {clock}
        </span>
        <a
          href="#contact"
          data-cursor="hover"
          className="group relative text-[11px] tracking-[0.24em] text-white uppercase"
        >
          Contact
          <span className="absolute -bottom-1 left-0 block h-px w-full origin-right scale-x-0 bg-acid transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100" />
        </a>
      </div>
    </motion.header>
  )
}
