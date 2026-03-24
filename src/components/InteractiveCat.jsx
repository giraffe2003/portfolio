/**
 * InteractiveCat
 * SVG cat with idle sway, tail swing, and cursor-tracking eyes.
 * Uses Framer Motion spring-animate on cx/cy for smooth pupil tracking.
 */
import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './InteractiveCat.module.css'

/* Eye centers in SVG space */
const L_EYE = { cx: 126, cy: 178 }
const R_EYE = { cx: 194, cy: 178 }
const PUPIL_R = 13
const MAX_OFFSET = 5.5

function computeOffset(svgEl, eyeX, eyeY, mouseX, mouseY) {
  if (!svgEl) return { x: 0, y: 0 }
  const rect = svgEl.getBoundingClientRect()
  const scaleX = rect.width  / 320
  const scaleY = rect.height / 400
  const sx = rect.left + eyeX * scaleX
  const sy = rect.top  + eyeY * scaleY
  const dx = mouseX - sx
  const dy = mouseY - sy
  const dist = Math.sqrt(dx * dx + dy * dy)
  if (dist < 1) return { x: 0, y: 0 }
  const t = Math.min(1, dist / 320) * MAX_OFFSET
  return { x: (dx / dist) * t, y: (dy / dist) * t }
}

export default function InteractiveCat() {
  const svgRef  = useRef(null)
  const [lPupil, setLPupil] = useState({ x: 0, y: 0 })
  const [rPupil, setRPupil] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      setLPupil(computeOffset(svgRef.current, L_EYE.cx, L_EYE.cy, e.clientX, e.clientY))
      setRPupil(computeOffset(svgRef.current, R_EYE.cx, R_EYE.cy, e.clientX, e.clientY))
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  /* Shared spring config for pupils */
  const eyeSpring = { type: 'spring', stiffness: 180, damping: 18 }

  /* Body idle: sway x + gentle bob y */
  const bodyAnim = {
    x: [-5, 5, -5],
    y: [0, -7, 0],
  }
  const bodyTrans = { duration: 3.6, repeat: Infinity, ease: 'easeInOut' }

  /* Tail: rotates around its root at (210, 295) */
  const tailAnim = { rotate: [-22, 22, -22] }
  const tailTrans = { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }

  return (
    <div className={styles.wrap}>
      <svg
        ref={svgRef}
        viewBox="0 0 320 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svg}
      >
        {/* ── Ground shadow ── */}
        <ellipse cx="160" cy="388" rx="96" ry="10" fill="rgba(0,0,0,0.07)" />

        {/* ── TAIL  (behind body, pivots at root) ── */}
        <motion.g
          style={{ transformOrigin: '210px 295px' }}
          animate={tailAnim}
          transition={tailTrans}
        >
          {/* Outer tail stroke */}
          <path
            d="M 210 295 Q 265 278 270 234 Q 275 196 250 183"
            stroke="#F4A261"
            strokeWidth="24"
            strokeLinecap="round"
          />
          {/* Inner lighter stripe */}
          <path
            d="M 210 295 Q 265 278 270 234 Q 275 196 250 183"
            stroke="#FDDCB0"
            strokeWidth="11"
            strokeLinecap="round"
          />
          {/* Tail tip */}
          <circle cx="250" cy="183" r="13" fill="#F4A261" />
          <circle cx="250" cy="183" r="6"  fill="#FDDCB0" />
        </motion.g>

        {/* ── BODY + HEAD  (idle sway) ── */}
        <motion.g animate={bodyAnim} transition={bodyTrans}>

          {/* Body */}
          <ellipse cx="160" cy="290" rx="88" ry="74" fill="#F4A261" />
          {/* Belly */}
          <ellipse cx="160" cy="304" rx="54" ry="52" fill="#FDDCB0" />

          {/* Front paws */}
          <ellipse cx="108" cy="355" rx="36" ry="16" fill="#F4A261" />
          <ellipse cx="212" cy="355" rx="36" ry="16" fill="#F4A261" />
          {/* Paw toe lines */}
          {[-10, 0, 10].map(ox => (
            <line key={`l${ox}`}
              x1={108 + ox} y1={347} x2={108 + ox} y2={362}
              stroke="#D07040" strokeWidth="1.4" strokeLinecap="round" />
          ))}
          {[-10, 0, 10].map(ox => (
            <line key={`r${ox}`}
              x1={212 + ox} y1={347} x2={212 + ox} y2={362}
              stroke="#D07040" strokeWidth="1.4" strokeLinecap="round" />
          ))}

          {/* ── HEAD ── */}
          <circle cx="160" cy="186" r="72" fill="#F4A261" />

          {/* Left ear outer */}
          <polygon points="96,160 78,94 138,136" fill="#F4A261" />
          {/* Left ear inner */}
          <polygon points="98,155 86,102 132,134" fill="#FDDCB0" />

          {/* Right ear outer */}
          <polygon points="224,160 242,94 182,136" fill="#F4A261" />
          {/* Right ear inner */}
          <polygon points="222,155 234,102 188,134" fill="#FDDCB0" />

          {/* ── FACE ── */}

          {/* Eye whites */}
          <circle cx={L_EYE.cx} cy={L_EYE.cy} r="22" fill="white" />
          <circle cx={R_EYE.cx} cy={R_EYE.cy} r="22" fill="white" />

          {/* Pupils — spring-tracked */}
          <motion.circle
            cx={L_EYE.cx} cy={L_EYE.cy} r={PUPIL_R} fill="#2d1a0e"
            animate={{ cx: L_EYE.cx + lPupil.x, cy: L_EYE.cy + lPupil.y }}
            transition={eyeSpring}
          />
          <motion.circle
            cx={R_EYE.cx} cy={R_EYE.cy} r={PUPIL_R} fill="#2d1a0e"
            animate={{ cx: R_EYE.cx + rPupil.x, cy: R_EYE.cy + rPupil.y }}
            transition={eyeSpring}
          />

          {/* Eye shine (follows pupils) */}
          <motion.circle
            cx={L_EYE.cx - 4} cy={L_EYE.cy - 4} r={4} fill="white"
            animate={{ cx: L_EYE.cx + lPupil.x - 4, cy: L_EYE.cy + lPupil.y - 4 }}
            transition={eyeSpring}
          />
          <motion.circle
            cx={R_EYE.cx - 4} cy={R_EYE.cy - 4} r={4} fill="white"
            animate={{ cx: R_EYE.cx + rPupil.x - 4, cy: R_EYE.cy + rPupil.y - 4 }}
            transition={eyeSpring}
          />

          {/* Nose */}
          <ellipse cx="160" cy="206" rx="6" ry="5" fill="#D06040" />

          {/* Mouth */}
          <path
            d="M 153,211 Q 160,219 167,211"
            stroke="#2d1a0e" strokeWidth="1.8" strokeLinecap="round"
          />

          {/* Whiskers left */}
          <line x1="88"  y1="200" x2="146" y2="206" stroke="rgba(45,26,14,0.28)" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="88"  y1="210" x2="146" y2="210" stroke="rgba(45,26,14,0.28)" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="88"  y1="220" x2="146" y2="215" stroke="rgba(45,26,14,0.28)" strokeWidth="1.8" strokeLinecap="round" />

          {/* Whiskers right */}
          <line x1="174" y1="206" x2="232" y2="200" stroke="rgba(45,26,14,0.28)" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="174" y1="210" x2="232" y2="210" stroke="rgba(45,26,14,0.28)" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="174" y1="215" x2="232" y2="220" stroke="rgba(45,26,14,0.28)" strokeWidth="1.8" strokeLinecap="round" />

          {/* Cheek blush */}
          <ellipse cx="104" cy="194" rx="15" ry="9"  fill="rgba(255,130,90,0.22)" />
          <ellipse cx="216" cy="194" rx="15" ry="9"  fill="rgba(255,130,90,0.22)" />

        </motion.g>
      </svg>
    </div>
  )
}
