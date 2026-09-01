import { motion, useMotionTemplate } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { useTilt } from '../lib/useTilt'

type Props = {
  icon: LucideIcon
  title: string
  body: string
  meta: string
}

/** 3D-tilt card with a highlight that tracks the pointer across its face. */
export function TiltCard({ icon: Icon, title, body, meta }: Props) {
  const { rotateX, rotateY, glowX, glowY, handlers } = useTilt(11)
  const glow = useMotionTemplate`radial-gradient(420px circle at ${glowX} ${glowY}, rgba(198,255,61,0.16), transparent 62%)`

  return (
    <motion.article
      {...handlers}
      data-cursor="hover"
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="group relative flex h-[62vh] w-[min(78vw,420px)] shrink-0 flex-col justify-between overflow-hidden rounded-[26px] border border-white/10 bg-ink p-9 will-change-transform"
    >
      <motion.div
        aria-hidden
        style={{ backgroundImage: glow }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:44px_44px]"
      />

      <header className="relative flex items-start justify-between">
        <span className="text-[10px] tracking-[0.36em] text-ash uppercase">
          {meta}
        </span>
        <Icon
          className="text-acid transition-transform duration-700 group-hover:rotate-90"
          size={26}
          strokeWidth={1.25}
        />
      </header>

      <div className="relative">
        <h3 className="text-display text-[clamp(1.9rem,3.4vw,2.7rem)] text-white">
          {title}
        </h3>
        <p className="mt-5 max-w-[34ch] text-[15px] leading-relaxed text-ash">
          {body}
        </p>
        <span className="mt-8 block h-px w-full origin-left scale-x-0 bg-acid transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
      </div>
    </motion.article>
  )
}
