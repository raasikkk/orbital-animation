import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { useMagnetic } from '../lib/useMagnetic'

type Props = {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'solid' | 'outline'
  className?: string
}

/** Button that leans toward the cursor and fills with acid on hover. */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = 'solid',
  className = '',
}: Props) {
  const { x, y, handlers } = useMagnetic(0.35)
  const inner = useMagnetic(0.14)

  const solid = variant === 'solid'

  return (
    <motion.div
      {...handlers}
      style={{ x, y }}
      className={`inline-block p-3 ${className}`}
      data-cursor="hover"
    >
      <motion.a
        href={href}
        onClick={onClick}
        {...inner.handlers}
        style={{ x: inner.x, y: inner.y }}
        className={`group relative inline-flex items-center gap-4 overflow-hidden rounded-full px-9 py-4 text-[13px] font-medium tracking-[0.18em] uppercase transition-colors duration-500 ${
          solid
            ? 'bg-acid text-black'
            : 'border border-white/25 text-white hover:text-black'
        }`}
      >
        {!solid && (
          <span className="absolute inset-0 -z-0 origin-bottom scale-y-0 bg-acid transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
        )}
        <span className="relative z-10">{children}</span>
        <span className="relative z-10 block h-[7px] w-[7px] rounded-full bg-current transition-transform duration-500 group-hover:scale-[2.2]" />
      </motion.a>
    </motion.div>
  )
}
