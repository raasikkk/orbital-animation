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
    stiffness: 130,
    damping: 30,
    mass: 0.4,
  })

  return (
    <section id="timeline" className="cv-auto relative px-6 py-[20vh] md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex items-baseline gap-8">
          <span className="label">004 — Trajectory</span>
          <span className="h-px flex-1 bg-bone/12" />
        </div>

        <div className="mt-20 grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4">
            <div className="top-[24vh] lg:sticky">
              <span className="label block">Phase</span>
              <div className="relative mt-6 h-[clamp(4.5rem,11vw,9rem)] overflow-hidden">
                {timeline.map((item, i) => (
                  <motion.span
                    key={item.id}
                    animate={{
                      y: `${(i - active) * 100}%`,
                      opacity: i === active ? 1 : 0,
                    }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="text-display absolute inset-0 block text-[clamp(4rem,10vw,8.5rem)] text-bone"
                  >
                    {item.id}
                  </motion.span>
                ))}
              </div>
              <p className="mt-8 max-w-[26ch] leading-relaxed text-ash">
                Five phases from a single anomalous signal to a self-directed
                survey array.
              </p>
            </div>
          </div>

          <ol
            ref={listRef}
            className="relative col-span-12 pl-8 lg:col-span-7 lg:col-start-6 lg:pl-12"
          >
            <span className="absolute top-0 bottom-0 left-0 w-px bg-bone/12" />
            <motion.span
              style={{ scaleY: line }}
              className="absolute top-0 bottom-0 left-0 w-px origin-top bg-bone/70"
            />

            {timeline.map((item, i) => (
              <Phase key={item.id} item={item} onEnter={() => setActive(i)} />
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
    <li ref={ref} className="relative py-[9vh]">
      <motion.span
        animate={{ scale: inView ? 1 : 0.4, opacity: inView ? 1 : 0.35 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-[9vh] -left-[calc(2rem+4px)] block h-[9px] w-[9px] rounded-full bg-bone lg:-left-[calc(3rem+4px)]"
      />
      <motion.div
        animate={
          inView
            ? { opacity: 1, filter: 'blur(0px)' }
            : { opacity: 0.18, filter: 'blur(4px)' }
        }
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-baseline gap-6">
          <span className="tabular label">{item.year}</span>
          <span className="h-px w-14 bg-bone/20" />
        </div>
        <h3 className="text-display mt-6 text-[clamp(1.8rem,4.2vw,3.4rem)] text-bone">
          {item.title}
        </h3>
        <p className="mt-5 max-w-[42ch] leading-relaxed text-ash">{item.body}</p>
      </motion.div>
    </li>
  )
}
