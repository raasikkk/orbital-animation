import gsap from 'gsap'
import Lenis from 'lenis'
import { useEffect } from 'react'

/**
 * Lenis runs in its default mode, driving the *native* window scroll position.
 * That matters: every scroll-linked animation on this page reads `window.scrollY`
 * through Framer Motion's `useScroll`, so both stay perfectly in sync.
 * GSAP's ticker is used as the single rAF loop for the whole app.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 1,
      touchMultiplier: 1.8,
      smoothWheel: true,
    })

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])
}
