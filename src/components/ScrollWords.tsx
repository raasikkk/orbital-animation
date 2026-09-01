import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

/**
 * Paragraph that lights up word by word as it crosses the viewport — the
 * reveal is bound to scroll progress, not to a timer, so scrubbing back and
 * forth during a screen recording always looks intentional.
 */
export function ScrollWords({
  text,
  className = '',
}: {
  text: string
  className?: string
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.55'],
  })

  const words = text.split(' ')

  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        )
      })}
    </p>
  )
}

function Word({
  children,
  progress,
  range,
}: {
  children: string
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.13, 1])
  const y = useTransform(progress, range, [8, 0])
  return (
    <span aria-hidden className="relative inline-block">
      <motion.span style={{ opacity, y }} className="inline-block">
        {children}
      </motion.span>
      <span className="inline-block">&nbsp;</span>
    </span>
  )
}
