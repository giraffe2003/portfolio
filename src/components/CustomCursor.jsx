/**
 * CustomCursor
 * A warm circle that follows the mouse with spring physics.
 * A second larger ring follows with extra lag for depth.
 */
import { useRef, useEffect } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import styles from './CustomCursor.module.css'

export default function CustomCursor() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Inner dot — tight spring
  const dotX = useSpring(mouseX, { stiffness: 800, damping: 40 })
  const dotY = useSpring(mouseY, { stiffness: 800, damping: 40 })

  // Outer ring — lazy spring for that laggy feel
  const ringX = useSpring(mouseX, { stiffness: 120, damping: 18 })
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 18 })

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [mouseX, mouseY])

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className={styles.ring}
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
      />
      {/* Inner dot */}
      <motion.div
        className={styles.dot}
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  )
}
