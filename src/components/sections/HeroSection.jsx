/**
 * HeroSection
 * Full-viewport parallax hero with 3 depth layers:
 *   1. Background — warm gradient blobs (slow scroll + mouse parallax)
 *   2. Midground — floating cat mascot (medium scroll)
 *   3. Foreground — text content (fast / anchored)
 *
 * Cat easter egg: clicking the midground cat triggers a wave + meow bubble.
 * Tagline: auto-cycles every 3.5s with a blur-slide animation.
 */
import { useRef, useState, useEffect } from 'react'
import {
  motion, useScroll, useTransform, useSpring,
  useMotionValue, AnimatePresence,
} from 'framer-motion'
import { useRive } from '@rive-app/react-canvas'
import styles from './HeroSection.module.css'

const TAGLINES = [
  'carefully crafting',
  'obsessing over',
  'adding cats to',
  'advocating for',
]

const taglineVariants = {
  enter: {
    opacity: 0,
    y: 18,
    filter: 'blur(8px)',
  },
  center: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    y: -18,
    filter: 'blur(8px)',
    transition: { duration: 0.28 },
  },
}

function RiveCat() {
  const { RiveComponent } = useRive({
    src: '/cat.riv',
    stateMachines: 'State Machine 1',
    autoplay: true,
  })
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <RiveComponent style={{ width: '100%', height: '100%' }} />
    </div>
  )
}

export default function HeroSection() {
  const ref = useRef(null)
  const [taglineIdx, setTaglineIdx] = useState(0)

  /* ── Auto-cycle tagline ── */
  useEffect(() => {
    const id = setInterval(() => {
      setTaglineIdx(i => (i + 1) % TAGLINES.length)
    }, 3500)
    return () => clearInterval(id)
  }, [])

  /* ── Scroll parallax ── */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const bgY     = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const catY    = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const textY   = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  /* ── Mouse parallax ── */
  const mouseXMV = useMotionValue(0)
  const mouseYMV = useMotionValue(0)

  useEffect(() => {
    const move = (e) => {
      mouseXMV.set(e.clientX / window.innerWidth - 0.5)
      mouseYMV.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [mouseXMV, mouseYMV])

  const b1x = useSpring(useTransform(mouseXMV, [-0.5, 0.5], [-34, 34]), { stiffness: 40, damping: 15 })
  const b1y = useSpring(useTransform(mouseYMV, [-0.5, 0.5], [-22, 22]), { stiffness: 40, damping: 15 })
  const b2x = useSpring(useTransform(mouseXMV, [-0.5, 0.5], [28, -28]), { stiffness: 30, damping: 12 })
  const b2y = useSpring(useTransform(mouseYMV, [-0.5, 0.5], [18, -18]), { stiffness: 30, damping: 12 })
  const b3x = useSpring(useTransform(mouseXMV, [-0.5, 0.5], [-16, 16]), { stiffness: 60, damping: 20 })
  const b3y = useSpring(useTransform(mouseYMV, [-0.5, 0.5], [-12, 12]), { stiffness: 60, damping: 20 })
  return (
    <section ref={ref} className={styles.hero} aria-label="Hero">
      {/* Background blobs */}
      <motion.div className={styles.bg} style={{ y: bgY }}>
        <motion.div className={`${styles.blob} ${styles.blob1}`} style={{ x: b1x, y: b1y }} />
        <motion.div className={`${styles.blob} ${styles.blob2}`} style={{ x: b2x, y: b2y }} />
        <motion.div className={`${styles.blob} ${styles.blob3}`} style={{ x: b3x, y: b3y }} />
      </motion.div>

      <div className={styles.heroRow}>
        {/* Left — text */}
        <motion.div className={styles.content} style={{ y: textY, opacity }}>
        <motion.p
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          hi, i'm angela 👋
        </motion.p>

        <motion.h1
          className={styles.headline}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          product designer
          <br />
          {/* Tagline wrapper keeps layout stable while text swaps */}
          <span className={styles.taglineWrap}>
            <AnimatePresence mode="wait">
              <motion.em
                key={TAGLINES[taglineIdx]}
                className={styles.tagline}
                variants={taglineVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {TAGLINES[taglineIdx]}
              </motion.em>
            </AnimatePresence>
          </span>
          <br />
          every interaction.
        </motion.h1>

        <motion.p
          className={styles.subline}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          Fintech · B2B Enterprise · Things that feel{' '}
          <span className={styles.highlight}>alive</span>
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.72, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.a
            href="https://www.linkedin.com/in/angela-wu-ux/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          >
            Currently designing at Vagaro →
          </motion.a>
        </motion.div>
        </motion.div>

        {/* Right — Rive cat */}
        <motion.div
          className={styles.catPanel}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <RiveCat />
        </motion.div>
      </div>
    </section>
  )
}
