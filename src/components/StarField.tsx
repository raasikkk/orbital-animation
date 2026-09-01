import { useEffect, useRef } from 'react'
import { pointerX, pointerY } from '../lib/pointer'

type Star = { x: number; y: number; z: number; r: number; tw: number }

/**
 * Hero star field. Depth-sorted parallax driven by both the pointer and the
 * scroll position. The rAF loop is suspended whenever the canvas leaves the
 * viewport so the rest of the page keeps the full frame budget.
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
    const comets: { x: number; y: number; len: number; sp: number }[] = []

    const seed = () => {
      const count = Math.min(900, Math.round((width * height) / 1500))
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.85 + 0.15,
        r: Math.random() * 1.5 + 0.45,
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

      const px = (pointerX.get() / window.innerWidth - 0.5) * 2
      const py = (pointerY.get() / window.innerHeight - 0.5) * 2
      const scroll = window.scrollY

      ctx.clearRect(0, 0, width, height)

      for (const s of stars) {
        const depth = s.z
        const ox = px * 34 * depth
        const oy = py * 26 * depth + scroll * 0.22 * depth
        let y = s.y - oy
        // wrap vertically so the field never runs out while scrolling
        y = ((y % height) + height) % height
        const x = s.x + ox

        const twinkle = reduced ? 1 : 0.55 + Math.sin(t * 0.0016 + s.tw) * 0.45
        ctx.globalAlpha = (0.25 + depth * 0.75) * twinkle
        ctx.fillStyle = depth > 0.93 ? '#c6ff3d' : '#ffffff'
        ctx.beginPath()
        ctx.arc(x, y, s.r * depth, 0, Math.PI * 2)
        ctx.fill()

        // A handful of foreground stars get a soft halo.
        if (depth > 0.92) {
          ctx.globalAlpha = 0.12 * twinkle
          ctx.beginPath()
          ctx.arc(x, y, s.r * 4.5, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      if (!reduced) {
        if (comets.length < 2 && Math.random() < 0.004) {
          comets.push({
            x: Math.random() * width * 0.6,
            y: Math.random() * height * 0.5,
            len: 120 + Math.random() * 200,
            sp: 4 + Math.random() * 4,
          })
        }
        ctx.globalAlpha = 0.75
        for (let i = comets.length - 1; i >= 0; i--) {
          const c = comets[i]
          c.x += c.sp
          c.y += c.sp * 0.42
          const grad = ctx.createLinearGradient(c.x, c.y, c.x - c.len, c.y - c.len * 0.42)
          grad.addColorStop(0, 'rgba(198,255,61,0.9)')
          grad.addColorStop(1, 'rgba(198,255,61,0)')
          ctx.strokeStyle = grad
          ctx.lineWidth = 1.4
          ctx.beginPath()
          ctx.moveTo(c.x, c.y)
          ctx.lineTo(c.x - c.len, c.y - c.len * 0.42)
          ctx.stroke()
          if (c.x - c.len > width || c.y - c.len > height) comets.splice(i, 1)
        }
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
