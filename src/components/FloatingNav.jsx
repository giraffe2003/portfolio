/**
 * FloatingNav
 * Segmented control — a sliding pill indicator moves to the active route.
 * Non-active labels are dimmed. Active state is route-based.
 */
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './FloatingNav.module.css'

const NAV_LINKS = [
  { label: 'Work',   path: '/',       external: false },
  { label: 'About',  path: '/about',  external: false },
  { label: 'Resume', path: 'https://drive.google.com/file/d/16lGmHlCLlmHjVhY8QDd-ZL7qvI3X-DtC/view?usp=drive_link', external: true },
]

export default function FloatingNav() {
  const location = useLocation()

  // Active index: About on /about, Work otherwise
  const activeIndex = location.pathname === '/about' ? 1 : 0

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <motion.ul
        className={styles.links}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        role="list"
      >
        {NAV_LINKS.map((link, i) => {
          const isActive = i === activeIndex
          const inner = (
            <>
              {isActive && (
                <motion.span
                  layoutId="nav-bubble"
                  className={styles.bubble}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className={`${styles.label} ${!isActive ? styles.inactive : ''}`}>
                {link.label}
              </span>
            </>
          )
          return (
            <li key={link.label} className={styles.item}>
              {link.external ? (
                <a href={link.path} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  {inner}
                </a>
              ) : (
                <Link to={link.path} className={styles.link}>
                  {inner}
                </Link>
              )}
            </li>
          )
        })}
      </motion.ul>
    </nav>
  )
}
