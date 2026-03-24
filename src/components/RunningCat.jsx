/**
 * RunningCat
 * A side-profile cat that runs along the bottom edge of the viewport,
 * its position tracking scroll progress left → right.
 */
import { motion, useScroll, useTransform } from 'framer-motion'
import styles from './RunningCat.module.css'

export default function RunningCat() {
  const { scrollYProgress } = useScroll()
  const x = useTransform(scrollYProgress, [0, 1], ['-12vw', '108vw'])

  return (
    <motion.div className={styles.wrap} style={{ x }}>
      <video
        className={styles.video}
        src="/cat-walk.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />
    </motion.div>
  )
}
