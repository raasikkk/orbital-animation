import { AnimatePresence, motion, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'
import { cursorSpring } from '../lib/motionPresets'
import { hasFinePointer, pointerX, pointerY } from '../lib/pointer'

type CursorMode = 'default' | 'hover' | 'view' | 'drag'

const SIZES: Record<CursorMode, number> = {
  default: 14,
  hover: 74,
  view: 104,
  drag: 92,
}

/**
 * Blend-mode cursor. Position comes straight off MotionValues through a spring,
 * so no React state is touched on pointermove.
 */
export function Cursor() {
  // Resolved once, at mount: touch devices keep their native pointer.
  const [enabled] = useState(hasFinePointer)
  const [mode, setMode] = useState<CursorMode>('default')
  const [label, setLabel] = useState('')

  const x = useSpring(pointerX, cursorSpring)
  const y = useSpring(pointerY, cursorSpring)
  const size = useSpring(SIZES.default, { stiffness: 320, damping: 32 })

  // Slower spring on the same source = the trailing ring lags behind the dot.
  const trailX = useSpring(pointerX, { stiffness: 120, damping: 20, mass: 0.7 })
  const trailY = useSpring(pointerY, { stiffness: 120, damping: 20, mass: 0.7 })

  useEffect(() => {
    if (!enabled) return
    document.body.classList.add('has-custom-cursor')

    const onOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.(
        '[data-cursor]',
      ) as HTMLElement | null

      const next = (target?.dataset.cursor as CursorMode) ?? 'default'
      setMode(next)
      setLabel(target?.dataset.cursorLabel ?? '')
      size.set(SIZES[next] ?? SIZES.default)
    }

    document.addEventListener('pointerover', onOver, { passive: true })
    return () => {
      document.removeEventListener('pointerover', onOver)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [enabled, size])

  if (!enabled) return null

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] flex items-center justify-center rounded-full bg-white mix-blend-difference"
        style={{ x, y, width: size, height: size, translateX: '-50%', translateY: '-50%' }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.22 }}
              className="text-[10px] font-medium tracking-[0.24em] text-black uppercase"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[99] rounded-full border border-acid/45"
        style={{
          x: trailX,
          y: trailY,
          width: 38,
          height: 38,
          translateX: '-50%',
          translateY: '-50%',
          opacity: mode === 'default' ? 0.9 : 0,
        }}
      />
    </>
  )
}
