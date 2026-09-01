import { motion, useInView, useScroll, useSpring } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { timeline } from '../data/content'

export function Timeline() {
  const listRef = useRef<HTMLOListElement>(null)
  const [active, setActive] = useState(0)

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 0.72', 'end 0.9'],
  })
  const line = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.4,
  })

  return (
    <section id="timeline" className="cv-auto relative px-5 py-[16vh] md:px-9">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex items-baseline gap-6">
          <span className="label">04 — Trajectory</span>
          <span className="h-px flex-1 bg-white/12" />
        </div>

        <div className="mt-16 grid grid-cols-12 gap-6">
          {/* Sticky phase read-out */}
          <div className="col-span-12 lg:col-span-4">
            <div className="top-[22vh] lg:sticky">
              <span className="label block">Current phase</span>
              <div className="relative mt-4 h-[clamp(5rem,13vw,11rem)] overflow-hidden">
                {timeline.map((item, i) => (
                  <motion.span
                    key={item.id}
                    animate={{
                      y: `${(i - active) * 100}%`,
                      opacity: i === active ? 1 : 0,
                    }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="text-display absolute inset-0 block text-[clamp(4.4rem,12vw,10rem)] text-acid"
                  >
                    {item.id}
                  </motion.span>
                ))}
              </div>
              <p className="mt-6 max-w-[26ch] text-[15px] leading-relaxed text-ash">
                Five phases from a single anomalous signal to a self-directed
                survey array.
              </p>
            </div>
          </div>

          <ol
            ref={listRef}
            className="relative col-span-12 pl-8 lg:col-span-7 lg:col-start-6 lg:pl-12"
          >
            <span className="absolute top-0 bottom-0 left-0 w-px bg-white/12" />
            <motion.span
              style={{ scaleY: line }}
              className="absolute top-0 bottom-0 left-0 w-px origin-top bg-acid"
            />

            {timeline.map((item, i) => (
              <Phase
                key={item.id}
                item={item}
                onEnter={() => setActive(i)}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Phase({
  item,
  onEnter,
}: {
  item: (typeof timeline)[number]
  onEnter: () => void
}) {
  const ref = useRef<HTMLLIElement>(null)
  const inView = useInView(ref, { amount: 0.6, margin: '-20% 0px -30% 0px' })

  useEffect(() => {
    if (inView) onEnter()
  }, [inView, onEnter])

  return (
    <li ref={ref} className="relative py-[8vh]">
      <motion.span
        animate={{
          scale: inView ? 1 : 0.35,
          backgroundColor: inView ? '#c6ff3d' : '#2a2a2e',
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-[8vh] -left-[5px] block h-[11px] w-[11px] rounded-full"
      />
      <motion.div
        animate={
          inView
            ? { x: 0, opacity: 1, filter: 'blur(0px)' }
            : { x: 34, opacity: 0.15, filter: 'blur(6px)' }
        }
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-baseline gap-5">
          <span className="tabular text-[11px] tracking-[0.3em] text-acid">
            {item.year}
          </span>
          <span className="h-px w-12 bg-white/20" />
        </div>
        <h3 className="text-display mt-4 text-[clamp(2rem,5vw,4rem)] text-white">
          {item.title}
        </h3>
        <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-ash">
          {item.body}
        </p>
      </motion.div>
    </li>
  )
}
