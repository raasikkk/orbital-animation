import { ArrowUpRight, AtSign } from 'lucide-react'
import { motion, useMotionTemplate, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { MagneticButton } from '../components/MagneticButton'
import { SplitText } from '../components/SplitText'

export function Footer() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end end'],
  })

  // Acid floods the headline from the bottom up as the page ends.
  const fill = useTransform(scrollYProgress, [0.1, 0.8], [0, 100])
  const gradient = useMotionTemplate`linear-gradient(to top, #c6ff3d ${fill}%, #2b2b30 ${fill}%)`
  const glow = useTransform(scrollYProgress, [0, 1], [0.05, 0.22])

  return (
    <footer
      ref={ref}
      id="contact"
      className="relative overflow-hidden px-5 pt-[18vh] pb-10 md:px-9"
    >
      <motion.div
        aria-hidden
        style={{ opacity: glow }}
        className="pointer-events-none absolute -bottom-[30vh] left-1/2 h-[60vh] w-[110vw] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(circle,rgba(198,255,61,0.7),transparent_62%)]"
      />

      <div className="relative mx-auto max-w-[1500px]">
        <span className="label block">05 — Transmission ends</span>

        <motion.h2
          style={{ backgroundImage: gradient }}
          className="text-display mt-10 bg-clip-text text-[clamp(3.4rem,14vw,15rem)] leading-[0.82] text-transparent"
        >
          LET&apos;S BUILD
          <br />
          SOMETHING
          <br />
          OFF-PLANET
        </motion.h2>

        <div className="mt-16 flex flex-col items-start justify-between gap-10 border-t border-white/12 pt-10 md:flex-row md:items-center">
          <div className="max-w-[36ch] text-[15px] leading-relaxed text-ash">
            <SplitText
              text="Tell us what you want to put in orbit."
              charStagger={0.012}
              wordStagger={0.04}
            />
          </div>

          <MagneticButton href="mailto:hello@orbital.systems" variant="outline">
            hello@orbital.systems
          </MagneticButton>
        </div>

        <div className="mt-[14vh] grid grid-cols-2 gap-8 text-[12px] tracking-[0.16em] text-ash uppercase md:grid-cols-4">
          <div>
            <span className="mb-3 block text-white/40">Index</span>
            <ul className="space-y-2">
              <li>
                <a href="#concept" data-cursor="hover" className="hover:text-acid">
                  Concept
                </a>
              </li>
              <li>
                <a href="#systems" data-cursor="hover" className="hover:text-acid">
                  Systems
                </a>
              </li>
              <li>
                <a href="#field" data-cursor="hover" className="hover:text-acid">
                  Field record
                </a>
              </li>
              <li>
                <a href="#timeline" data-cursor="hover" className="hover:text-acid">
                  Trajectory
                </a>
              </li>
            </ul>
          </div>
          <div>
            <span className="mb-3 block text-white/40">Ground station</span>
            <p className="leading-relaxed normal-case">
              Hangar 4, Baikonur Rd
              <br />
              Reykjavík, IS
            </p>
          </div>
          <div>
            <span className="mb-3 block text-white/40">Signal</span>
            <p className="tabular leading-relaxed">
              540 KM
              <br />
              51.6° INCL
            </p>
          </div>
          <div>
            <span className="mb-3 block text-white/40">Elsewhere</span>
            <a
              href="https://instagram.com/joinway"
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="inline-flex items-center gap-2 hover:text-acid"
            >
              <AtSign size={14} strokeWidth={1.5} /> Instagram
              <ArrowUpRight size={13} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/12 pt-8 text-[11px] tracking-[0.22em] text-ash uppercase sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Orbital Systems</span>
          <span className="flex items-center gap-2">
            site by
            <a
              href="https://instagram.com/joinway"
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="group relative text-white"
            >
              JOIN WAY
              <span className="absolute -bottom-1 left-0 block h-px w-full origin-right scale-x-0 bg-acid transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100" />
            </a>
            <span className="text-acid">@joinway</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
