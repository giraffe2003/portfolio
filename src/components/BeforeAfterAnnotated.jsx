/**
 * BeforeAfterAnnotated
 * Two phone screenshots side-by-side with clickable annotation dots
 * and an animated callout card that describes each highlighted difference.
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import beforeImg from '../assets/ip-before.jpg'
import afterImg from '../assets/ip-after.jpg'
import styles from './BeforeAfterAnnotated.module.css'

const ANNOTATIONS = [
  {
    id: 1,
    callout: 'Transfer balance is clearer to see and the main focus of the popup — the dollar amount leads the design.',
    before: { x: '50%', y: '40%' },
    after:  { x: '50%', y: '36%' },
  },
  {
    id: 2,
    callout: 'The exact payout amount is now shown directly in the CTA button, so users know exactly what they\'re confirming.',
    before: { x: '50%', y: '88%' },
    after:  { x: '50%', y: '87%' },
  },
  {
    id: 3,
    callout: 'Fee is now displayed as a percentage (1.75%) rather than a flat amount, making it feel more transparent and predictable.',
    before: { x: '18%', y: '60%' },
    after:  { x: '18%', y: '57%' },
  },
]

function PhoneScreen({ img, label, annotations, active, side, onSelect }) {
  return (
    <div className={styles.phoneCol}>
      <span className={styles.phoneLabel}>{label}</span>
      <div className={styles.phoneFrame}>
        <img src={img} alt={`${label} design`} className={styles.phoneImg} />
        {annotations.map(ann => {
          const pos = ann[side]
          const isActive = active === ann.id
          return (
            <button
              key={ann.id}
              className={`${styles.dot} ${isActive ? styles.dotActive : ''}`}
              style={{ left: pos.x, top: pos.y }}
              onClick={() => onSelect(ann.id)}
              aria-label={`Annotation ${ann.id}`}
            >
              {ann.id}
              {isActive && (
                <motion.span
                  className={styles.dotRing}
                  animate={{ scale: [1, 1.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function BeforeAfterAnnotated() {
  const [active, setActive] = useState(1)
  const ann = ANNOTATIONS.find(a => a.id === active)

  return (
    <div className={styles.wrap}>
      <PhoneScreen img={beforeImg} label="Before" annotations={ANNOTATIONS} active={active} side="before" onSelect={setActive} />

      {/* Callout card */}
      <div className={styles.calloutCol}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className={styles.callout}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
          >
            <span className={styles.calloutNum}>{active} / {ANNOTATIONS.length}</span>
            <p className={styles.calloutText}>{ann.callout}</p>
          </motion.div>
        </AnimatePresence>

        <div className={styles.navRow}>
          {ANNOTATIONS.map(a => (
            <button
              key={a.id}
              className={`${styles.navDot} ${active === a.id ? styles.navDotActive : ''}`}
              onClick={() => setActive(a.id)}
              aria-label={`Go to annotation ${a.id}`}
            />
          ))}
        </div>
      </div>

      <PhoneScreen img={afterImg} label="After" annotations={ANNOTATIONS} active={active} side="after" onSelect={setActive} />
    </div>
  )
}
