import { motion, useMotionTemplate, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { SplitText } from '../components/SplitText'

export function Footer() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end end'],
  })

  // The headline fills with bone from the bottom up as the page ends.
  const fill = useTransform(scrollYProgress, [0.1, 0.8], [0, 100])
  const gradient = useMotionTemplate`linear-gradient(to top, #ede9e1 ${fill}%, #26262a ${fill}%)`

  return (
    <footer
      ref={ref}
      id="contact"
      className="relative overflow-hidden px-6 pt-[22vh] pb-12 md:px-10"
    >
      <div className="relative mx-auto max-w-[1500px]">
        <span className="label block">005 — Transmission ends</span>

        <motion.h2
          style={{ backgroundImage: gradient }}
          className="text-display mt-14 bg-clip-text text-[clamp(3rem,13vw,14rem)] leading-[0.86] text-transparent"
        >
          LET&apos;S BUILD
          <br />
          SOMETHING
          <br />
          OFF-PLANET
        </motion.h2>

        <div className="mt-20 flex flex-col items-start justify-between gap-10 border-t border-bone/12 pt-12 md:flex-row md:items-baseline">
          <div className="max-w-[36ch] leading-relaxed text-ash">
            <SplitText
              text="Tell us what you want to put in orbit."
              charStagger={0.008}
              wordStagger={0.04}
            />
          </div>

          <a
            href="mailto:hello@orbital.systems"
            className="text-display border-b border-bone/30 pb-2 text-[clamp(1.2rem,2.4vw,2rem)] text-bone"
          >
            hello@orbital.systems
          </a>
        </div>

        <div className="mt-[16vh] grid grid-cols-2 gap-10 md:grid-cols-4">
          <div>
            <span className="label block">Index</span>
            <ul className="mt-5 space-y-3 text-[13px] text-ash">
              <li>
                <a href="#concept">Concept</a>
              </li>
              <li>
                <a href="#systems">Systems</a>
              </li>
              <li>
                <a href="#field">Field record</a>
              </li>
              <li>
                <a href="#timeline">Trajectory</a>
              </li>
            </ul>
          </div>
          <div>
            <span className="label block">Ground station</span>
            <p className="mt-5 text-[13px] leading-relaxed text-ash">
              Hangar 4, Baikonur Rd
              <br />
              Reykjavík, IS
            </p>
          </div>
          <div>
            <span className="label block">Signal</span>
            <p className="tabular mt-5 text-[13px] leading-relaxed text-ash">
              540 KM
              <br />
              51.6° INCL
            </p>
          </div>
          <div>
            <span className="label block">Elsewhere</span>
            <p className="mt-5 text-[13px] text-ash">
              <a
                href="https://instagram.com/joinway"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </p>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-bone/12 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <span className="label">© {new Date().getFullYear()} Orbital Systems</span>
          <span className="label flex items-center gap-2">
            site by
            <a
              href="https://instagram.com/joinway"
              target="_blank"
              rel="noreferrer"
              className="text-bone"
            >
              JOIN WAY
            </a>
            <span className="text-bone/50">@joinway</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
