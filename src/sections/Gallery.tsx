import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { gallery, spotlightShot, type Shot } from '../data/images'

const PLACEMENT = [
  'col-span-12 lg:col-span-6 lg:col-start-1',
  'col-span-12 sm:col-span-6 lg:col-span-4 lg:col-start-9 lg:-mt-[20vh]',
  'col-span-12 sm:col-span-6 lg:col-span-3 lg:col-start-2 lg:mt-[8vh]',
  'col-span-12 sm:col-span-6 lg:col-span-5 lg:col-start-7 lg:mt-[12vh]',
  'col-span-12 lg:col-span-9 lg:col-start-3 lg:mt-[10vh]',
  'col-span-12 sm:col-span-8 lg:col-span-4 lg:col-start-8 lg:-mt-[4vh]',
]

export function Gallery() {
  return (
    <section id="field" className="cv-auto relative pt-[20vh]">
      <div className="px-6 md:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex items-baseline gap-8">
            <span className="label">003 — Field record</span>
            <span className="h-px flex-1 bg-bone/12" />
          </div>

          <h2 className="text-display mt-16 max-w-[14ch] text-[clamp(2.4rem,6.4vw,5.6rem)] text-bone">
            What the array sees.
          </h2>

          <div className="mt-[16vh] grid grid-cols-12 gap-8">
            {gallery.map((shot, i) => (
              <div key={shot.index} className={PLACEMENT[i % PLACEMENT.length]}>
                <RevealShot shot={shot} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Plate />
    </section>
  )
}

/** Clip-path opening + counter-scaling image: reads like a camera aperture. */
function RevealShot({ shot }: { shot: Shot }) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress: open } = useScroll({
    target: ref,
    offset: ['start 0.95', 'start 0.3'],
  })
  const { scrollYProgress: drift } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const p = useTransform(open, [0, 1], [100, 0])
  const half = useTransform(p, (v) => v / 2)
  const zero = useMotionValue(0)

  const reveal = shot.reveal
  const top = reveal === 'down' ? p : reveal === 'center' ? half : zero
  const bottom = reveal === 'up' ? p : reveal === 'center' ? half : zero
  const left = reveal === 'right' ? p : reveal === 'center' ? half : zero
  const right = reveal === 'left' ? p : reveal === 'center' ? half : zero

  const clipPath = useMotionTemplate`inset(${top}% ${right}% ${bottom}% ${left}%)`
  const scale = useTransform(open, [0, 1], [1.32, 1.02])
  const y = useTransform(drift, [0, 1], ['-5%', '5%'])
  const captionO = useTransform(open, [0.55, 1], [0, 1])

  return (
    <figure ref={ref} className="relative">
      <motion.div
        style={{ clipPath, aspectRatio: shot.aspect }}
        className="relative w-full overflow-hidden bg-ink"
      >
        <motion.img
          src={shot.src}
          alt={shot.alt}
          loading="lazy"
          style={{ scale, y }}
          className="h-full w-full object-cover grayscale"
        />
      </motion.div>

      <motion.figcaption
        style={{ opacity: captionO }}
        className="mt-5 flex items-baseline justify-between gap-4"
      >
        <span className="text-[13px] tracking-[0.06em] text-ash">
          {shot.caption}
        </span>
        <span className="tabular label">{shot.index}</span>
      </motion.figcaption>
    </figure>
  )
}

/**
 * Full-bleed plate that opens from a letterbox slit to the full frame as it
 * crosses the viewport — the one big moment of the page, driven purely by scroll.
 */
function Plate() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const inset = useTransform(scrollYProgress, [0.05, 0.5], [42, 0], {
    clamp: true,
  })
  const clipPath = useMotionTemplate`inset(${inset}% 0% ${inset}% 0%)`
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1.05])
  const captionO = useTransform(scrollYProgress, [0.42, 0.58], [0, 1])

  return (
    <div ref={ref} className="relative mt-[20vh] h-[100svh] w-full overflow-hidden">
      <motion.div style={{ clipPath }} className="absolute inset-0">
        <motion.img
          src={spotlightShot.src}
          alt={spotlightShot.alt}
          loading="lazy"
          style={{ scale }}
          className="h-full w-full object-cover opacity-80 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-void/40" />
      </motion.div>

      <motion.div
        style={{ opacity: captionO }}
        className="absolute right-6 bottom-10 left-6 flex items-baseline justify-between md:right-10 md:left-10"
      >
        <span className="label">{spotlightShot.caption}</span>
        <span className="label">Composite / 2031</span>
      </motion.div>
    </div>
  )
}
