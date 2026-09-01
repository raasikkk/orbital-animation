import { useSpring, useTransform } from 'motion/react'
import { useCallback, useRef } from 'react'

/** 3D tilt driven by the pointer position inside the element. */
export function useTilt(max = 12) {
  const rect = useRef<DOMRect | null>(null)
  const spring = { stiffness: 220, damping: 24, mass: 0.5 } as const

  // -0.5 .. 0.5 relative to the element centre
  const px = useSpring(0, spring)
  const py = useSpring(0, spring)

  const rotateX = useTransform(py, [-0.5, 0.5], [max, -max])
  const rotateY = useTransform(px, [-0.5, 0.5], [-max, max])
  const glowX = useTransform(px, [-0.5, 0.5], ['15%', '85%'])
  const glowY = useTransform(py, [-0.5, 0.5], ['10%', '90%'])

  const onPointerEnter = useCallback((e: React.PointerEvent<HTMLElement>) => {
    rect.current = e.currentTarget.getBoundingClientRect()
  }, [])

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      const r = rect.current ?? e.currentTarget.getBoundingClientRect()
      px.set((e.clientX - r.left) / r.width - 0.5)
      py.set((e.clientY - r.top) / r.height - 0.5)
    },
    [px, py],
  )

  const onPointerLeave = useCallback(() => {
    rect.current = null
    px.set(0)
    py.set(0)
  }, [px, py])

  return {
    rotateX,
    rotateY,
    glowX,
    glowY,
    handlers: { onPointerEnter, onPointerMove, onPointerLeave },
  }
}
