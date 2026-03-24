/**
 * LoadingScreen
 * Full-screen intro: warm fill rises from the bottom (same wavy effect as
 * the buttons), cat bounces in the centre, then the whole overlay lifts
 * like a curtain to reveal the site.
 */
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CatSVG from './CatSVG'
import styles from './LoadingScreen.module.css'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const id = setTimeout(() => setVisible(false), 2200)
    return () => clearTimeout(id)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.screen}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Rising fill — same wavy-top effect as the buttons, just full screen */}
          <motion.div
            className={styles.fill}
            initial={{ y: '105%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.0, delay: 0.1, ease: [0.25, 0.8, 0.25, 1] }}
          />

          {/* Cat — floats above the fill */}
          <div className={styles.catWrap}>
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ repeat: Infinity, duration: 0.85, ease: 'easeInOut' }}
            >
              <CatSVG size={96} waving />
            </motion.div>

            <motion.p
              className={styles.text}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              one sec...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
