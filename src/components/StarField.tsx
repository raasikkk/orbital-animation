import { useEffect, useRef } from 'react'

type Star = { x: number; y: number; z: number; r: number; tw: number }

/**
 * Hero star field. Parallax comes from scroll only — no pointer input — so the
 * hero reads the same on camera as it does under a mouse. The rAF loop is
 * suspended whenever the canvas leaves the viewport.
 */
export function StarField({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let raf = 0
    let running = true
    let stars: Star[] = []

    const seed = () => {
      const count = Math.min(620, Math.round((width * height) / 2400))
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.85 + 0.15,
        r: Math.random() * 1.15 + 0.35,
        tw: Math.random() * Math.PI * 2,
      }))
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw)
      if (!running) return

      const scroll = window.scrollY
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = '#ede9e1'

      for (const s of stars) {
        const depth = s.z
        let y = s.y - scroll * 0.2 * depth
        y = ((y % height) + height) % height
        const twinkle = reduced ? 1 : 0.6 + Math.sin(t * 0.0011 + s.tw) * 0.4

        ctx.globalAlpha = (0.12 + depth * 0.5) * twinkle
        ctx.beginPath()
        ctx.arc(s.x, y, s.r * depth, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1
    }

    resize()
    window.addEventListener('resize', resize)

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting
      },
      { threshold: 0 },
    )
    io.observe(canvas)

    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} aria-hidden className={className} />
}
