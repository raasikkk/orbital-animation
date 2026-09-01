import { motion, type Variants } from 'motion/react'
import { riseIn, stagger } from '../lib/motionPresets'

type Props = {
  text: string
  className?: string
  wordClassName?: string
  /** Seconds between characters. */
  charStagger?: number
  wordStagger?: number
  delay?: number
  /** Play on mount instead of waiting for the viewport. */
  immediate?: boolean
  once?: boolean
  variants?: Variants
}

/**
 * Per-character reveal: each word is a masked box, each character rises out of
 * it and comes into focus. Nested staggers give words *and* letters their own
 * rhythm, which reads far better on video than a single flat stagger.
 */
export function SplitText({
  text,
  className = '',
  wordClassName = '',
  charStagger = 0.028,
  wordStagger = 0.075,
  delay = 0,
  immediate = false,
  once = true,
  variants = riseIn,
}: Props) {
  const words = text.split(' ')
  const animateProps = immediate
    ? { animate: 'show' as const }
    : { whileInView: 'show' as const, viewport: { once, amount: 0.4 } }

  return (
    <span
      className={`inline-flex flex-wrap ${className}`}
      role="text"
      aria-label={text}
    >
      <motion.span
        aria-hidden
        className="inline-flex flex-wrap"
        variants={stagger(wordStagger, delay)}
        initial="hidden"
        {...animateProps}
      >
        {words.map((word, w) => (
          <motion.span
            key={`${word}-${w}`}
            variants={stagger(charStagger)}
            className={`relative inline-flex overflow-hidden pb-[0.14em] ${wordClassName}`}
          >
            {Array.from(word).map((char, c) => (
              <motion.span
                key={c}
                variants={variants}
                className="inline-block will-change-transform"
              >
                {char}
              </motion.span>
            ))}
            {w < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </motion.span>
        ))}
      </motion.span>
    </span>
  )
}
