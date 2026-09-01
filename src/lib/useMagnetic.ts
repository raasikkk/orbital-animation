import { useSpring } from 'motion/react'
import { useCallback, useRef } from 'react'
import { softSpring } from './motionPresets'

/**
 * Pulls an element toward the cursor while the pointer is over its (padded)
 * hit area. The rect is cached on enter so mousemove never forces a reflow.
 */
export function useMagnetic(strength = 0.4) {
  const rect = useRef<DOMRect | null>(null)
  const x = useSpring(0, softSpring)
  const y = useSpring(0, softSpring)

  const onPointerEnter = useCallback((e: React.PointerEvent<HTMLElement>) => {
    rect.current = e.currentTarget.getBoundingClientRect()
  }, [])

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      const r = rect.current ?? e.currentTarget.getBoundingClientRect()
      x.set((e.clientX - (r.left + r.width / 2)) * strength)
      y.set((e.clientY - (r.top + r.height / 2)) * strength)
    },
    [strength, x, y],
  )

  const onPointerLeave = useCallback(() => {
    rect.current = null
    x.set(0)
    y.set(0)
  }, [x, y])

  return {
    x,
    y,
    handlers: { onPointerEnter, onPointerMove, onPointerLeave },
  }
}
