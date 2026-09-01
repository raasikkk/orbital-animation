import { motionValue } from 'motion/react'
import { useEffect } from 'react'

const initialX = typeof window === 'undefined' ? 0 : window.innerWidth / 2
const initialY = typeof window === 'undefined' ? 0 : window.innerHeight / 2

/** One pointer listener for the whole app — every consumer reads these values. */
export const pointerX = motionValue(initialX)
export const pointerY = motionValue(initialY)

export const hasFinePointer = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: fine)').matches

export function usePointerTracker() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointerX.set(e.clientX)
      pointerY.set(e.clientY)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
}
