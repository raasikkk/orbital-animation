import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { useRef, useState } from 'react'
import { gallery, spotlightShot, type Shot } from '../data/images'

const PLACEMENT = [
  'col-span-12 lg:col-span-7 lg:col-start-1',
  'col-span-12 sm:col-span-6 lg:col-span-4 lg:col-start-9 lg:-mt-[18vh]',
  'col-span-12 sm:col-span-6 lg:col-span-4 lg:col-start-2 lg:mt-[6vh]',
  'col-span-12 sm:col-span-6 lg:col-span-5 lg:col-start-7 lg:mt-[10vh]',
  'col-span-12 lg:col-span-10 lg:col-start-2 lg:mt-[8vh]',
  'col-span-12 sm:col-span-8 lg:col-span-4 lg:col-start-8 lg:-mt-[6vh]',
]

export function Gallery() {
  return (
    <section id="field" className="cv-auto relative px-5 py-[16vh] md:px-9">
      <div className="mx-auto max-w-[1500px]">
        <div className="flex items-baseline gap-6">
          <span className="label">03 — Field record</span>
          <span className="h-px flex-1 bg-white/12" />
        </div>

        <h2 className="text-display mt-10 max-w-[14ch] text-[clamp(2.6rem,7vw,6.4rem)] text-white">
          What the array
          <span className="text-acid"> sees.</span>
        </h2>

        <div className="mt-[12vh] grid grid-cols-12 gap-6">
          {gallery.map((shot, i) => (
            <div key={shot.index} className={PLACEMENT[i % PLACEMENT.length]}>
              <RevealShot shot={shot} />
            </div>
          ))}
        </div>

        <Spotlight />
      </div>
    </section>
  )
}

/** Clip-path opening + counter-scaling image: reads like a camera aperture. */
function RevealShot({ shot }: { shot: Shot }) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress: open } = useScroll({
    target: ref,
    offset: ['start 0.95', 'start 0.28'],
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

  const clipPath = useMotionTemplate`inset(${top}% ${right}% ${bottom}% ${left}% round 20px)`
  const scale = useTransform(open, [0, 1], [1.38, 1.02])
  const y = useTransform(drift, [0, 1], ['-6%', '6%'])
  const captionX = useTransform(open, [0.4, 1], [-24, 0])
  const captionO = useTransform(open, [0.5, 1], [0, 1])

  return (
    <figure
      ref={ref}
      className="relative"
      data-cursor="view"
      data-cursor-label="view"
    >
      <motion.div
        style={{ clipPath, aspectRatio: shot.aspect }}
        className="relative w-full overflow-hidden bg-steel"
      >
        <motion.img
          src={shot.src}
          alt={shot.alt}
          loading="lazy"
          style={{ scale, y }}
          className="h-full w-full object-cover grayscale-[0.75] transition-[filter] duration-700 hover:grayscale-0"
        />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
      </motion.div>

      <motion.figcaption
        style={{ x: captionX, opacity: captionO }}
        className="mt-4 flex items-baseline justify-between gap-4"
      >
        <span className="text-[13px] tracking-[0.12em] text-white">
          {shot.caption}
        </span>
        <span className="tabular text-[11px] tracking-[0.3em] text-acid">
          {shot.index}
        </span>
      </motion.figcaption>
    </figure>
  )
}

/** Colour lives only inside the cursor. Move the mouse and the sky comes back. */
function Spotlight() {
  const [active, setActive] = useState(false)

  const mx = useSpring(0, { stiffness: 420, damping: 40, mass: 0.4 })
  const my = useSpring(0, { stiffness: 420, damping: 40, mass: 0.4 })
  const radius = useSpring(0, { stiffness: 200, damping: 28 })

  const mask = useMotionTemplate`radial-gradient(${radius}px circle at ${mx}px ${my}px, #000 0%, #000 62%, transparent 100%)`

  return (
    <div className="mt-[16vh]">
      <div className="flex items-baseline gap-6">
        <span className="label">Live composite</span>
        <span className="h-px flex-1 bg-white/12" />
        <span className="label">Move the cursor</span>
      </div>

      <div
        data-cursor="drag"
        data-cursor-label="reveal"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          mx.set(e.clientX - r.left)
          my.set(e.clientY - r.top)
          if (!active) {
            setActive(true)
            radius.set(260)
          }
        }}
        onPointerLeave={() => {
          setActive(false)
          radius.set(0)
        }}
        className="relative mt-8 aspect-[21/9] w-full overflow-hidden rounded-[22px] bg-black"
      >
        <img
          src={spotlightShot.src}
          alt={spotlightShot.alt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-35 grayscale"
        />
        <motion.div
          style={{ maskImage: mask, WebkitMaskImage: mask }}
          className="absolute inset-0"
        >
          <img
            src={spotlightShot.src}
            alt=""
            aria-hidden
            loading="lazy"
            className="h-full w-full scale-105 object-cover"
          />
        </motion.div>

        <span className="pointer-events-none absolute bottom-6 left-6 text-[11px] tracking-[0.3em] text-white/70 uppercase">
          {spotlightShot.caption}
        </span>
      </div>
    </div>
  )
}
