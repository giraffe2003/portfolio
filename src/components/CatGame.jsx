/**
 * CatGame — a tiny side-scrolling platformer.
 * Click / tap / Space to jump. Avoid the spiky terrain.
 */
import { useEffect, useRef, useState, useCallback } from 'react'
import styles from './CatGame.module.css'

const W = 480
const H = 280
const GROUND = H - 48
const GRAVITY = 0.55
const JUMP_V = -11.5
const OBSTACLE_SPEED_START = 4.2
const SPEED_INC = 0.0008   // gradual speedup per frame

/* ── Draw a pixel-art style cat ── */
function drawCat(ctx, x, y, frame, isDead) {
  ctx.save()

  const bobY = isDead ? 0 : Math.sin(frame * 0.18) * 1.5
  const tx = x
  const ty = y + bobY

  // Body
  ctx.fillStyle = isDead ? '#aaa' : '#F4A261'
  ctx.beginPath()
  ctx.roundRect(tx - 14, ty - 22, 28, 20, 6)
  ctx.fill()

  // Head
  ctx.beginPath()
  ctx.roundRect(tx - 12, ty - 38, 24, 20, 7)
  ctx.fill()

  // Ears
  ctx.beginPath()
  ctx.moveTo(tx - 10, ty - 37)
  ctx.lineTo(tx - 16, ty - 48)
  ctx.lineTo(tx - 4,  ty - 38)
  ctx.closePath()
  ctx.fill()
  ctx.beginPath()
  ctx.moveTo(tx + 10, ty - 37)
  ctx.lineTo(tx + 16, ty - 48)
  ctx.lineTo(tx + 4,  ty - 38)
  ctx.closePath()
  ctx.fill()

  // Inner ears
  ctx.fillStyle = isDead ? '#ccc' : '#FDDCB0'
  ctx.beginPath()
  ctx.moveTo(tx - 9, ty - 38)
  ctx.lineTo(tx - 13, ty - 45)
  ctx.lineTo(tx - 5, ty - 38)
  ctx.closePath()
  ctx.fill()
  ctx.beginPath()
  ctx.moveTo(tx + 9, ty - 38)
  ctx.lineTo(tx + 13, ty - 45)
  ctx.lineTo(tx + 5, ty - 38)
  ctx.closePath()
  ctx.fill()

  // Eyes
  ctx.fillStyle = isDead ? '#999' : '#2d1a0e'
  if (isDead) {
    // X eyes
    ctx.strokeStyle = '#666'
    ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.moveTo(tx-7,ty-31); ctx.lineTo(tx-3,ty-27); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(tx-3,ty-31); ctx.lineTo(tx-7,ty-27); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(tx+3,ty-31); ctx.lineTo(tx+7,ty-27); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(tx+7,ty-31); ctx.lineTo(tx+3,ty-27); ctx.stroke()
  } else {
    ctx.beginPath(); ctx.arc(tx - 5, ty - 29, 3, 0, Math.PI * 2); ctx.fill()
    ctx.beginPath(); ctx.arc(tx + 5, ty - 29, 3, 0, Math.PI * 2); ctx.fill()
    // Shine
    ctx.fillStyle = 'white'
    ctx.beginPath(); ctx.arc(tx - 4, ty - 30, 1, 0, Math.PI * 2); ctx.fill()
    ctx.beginPath(); ctx.arc(tx + 6, ty - 30, 1, 0, Math.PI * 2); ctx.fill()
  }

  // Nose
  ctx.fillStyle = isDead ? '#aaa' : '#E07050'
  ctx.beginPath()
  ctx.arc(tx, ty - 24, 2, 0, Math.PI * 2)
  ctx.fill()

  // Mouth
  ctx.strokeStyle = isDead ? '#aaa' : '#2d1a0e'
  ctx.lineWidth = 1.2
  ctx.beginPath()
  ctx.moveTo(tx - 3, ty - 22)
  ctx.quadraticCurveTo(tx, ty - 20, tx + 3, ty - 22)
  ctx.stroke()

  // Tail
  const tailSwing = isDead ? 0 : Math.sin(frame * 0.12) * 14
  ctx.strokeStyle = isDead ? '#aaa' : '#F4A261'
  ctx.lineWidth = 5
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(tx + 14, ty - 8)
  ctx.quadraticCurveTo(tx + 28 + tailSwing * 0.4, ty - 2, tx + 22, ty - 18 + tailSwing)
  ctx.stroke()

  // Legs (walk cycle)
  ctx.fillStyle = isDead ? '#aaa' : '#F4A261'
  const legOff = isDead ? 0 : Math.sin(frame * 0.28) * 5
  const legPairs = [[-9, legOff], [-3, -legOff], [3, legOff], [9, -legOff]]
  legPairs.forEach(([lx, lo]) => {
    ctx.beginPath()
    ctx.roundRect(tx + lx - 3, ty - 4 + lo, 6, 12, 3)
    ctx.fill()
  })

  ctx.restore()
}

/* ── Draw a spike obstacle ── */
function drawSpike(ctx, x, y, w, h) {
  ctx.fillStyle = '#8B6F5E'
  const cols = Math.max(1, Math.floor(w / 18))
  const sw = w / cols
  for (let i = 0; i < cols; i++) {
    const sx = x + i * sw
    ctx.beginPath()
    ctx.moveTo(sx, y + h)
    ctx.lineTo(sx + sw / 2, y)
    ctx.lineTo(sx + sw, y + h)
    ctx.closePath()
    ctx.fill()
    // Shade
    ctx.fillStyle = '#6B4F3E'
    ctx.beginPath()
    ctx.moveTo(sx + sw / 2, y)
    ctx.lineTo(sx + sw, y + h)
    ctx.lineTo(sx + sw / 2 + 2, y + h)
    ctx.closePath()
    ctx.fill()
    ctx.fillStyle = '#8B6F5E'
  }
}

/* ── Draw a floating platform ── */
function drawPlatform(ctx, x, y, w) {
  ctx.fillStyle = '#C8956C'
  ctx.beginPath()
  ctx.roundRect(x, y, w, 12, 4)
  ctx.fill()
  ctx.fillStyle = '#A0714A'
  ctx.beginPath()
  ctx.roundRect(x, y + 8, w, 4, [0, 0, 4, 4])
  ctx.fill()
}

function makeObstacle(x) {
  const r = Math.random()
  if (r < 0.6) {
    // ground spike cluster
    const w = 18 + Math.random() * 36
    return { type: 'spike', x, y: GROUND - 28, w, h: 28 }
  } else {
    // floating platform
    const w = 40 + Math.random() * 50
    const yOff = 40 + Math.random() * 60
    return { type: 'platform', x, y: GROUND - yOff, w, h: 12 }
  }
}

export default function CatGame() {
  const canvasRef = useRef(null)
  const stateRef  = useRef(null)
  const rafRef    = useRef(null)
  const [phase, setPhase] = useState('idle') // idle | playing | dead

  const initState = useCallback(() => ({
    catY:      GROUND,
    catVY:     0,
    onGround:  true,
    onPlatform: false,
    frame:     0,
    score:     0,
    speed:     OBSTACLE_SPEED_START,
    obstacles: [],
    nextSpawn: 90,
    dead:      false,
  }), [])

  const jump = useCallback(() => {
    if (phase === 'idle') {
      stateRef.current = initState()
      setPhase('playing')
      return
    }
    if (phase === 'dead') {
      stateRef.current = initState()
      setPhase('playing')
      return
    }
    const s = stateRef.current
    if (s && (s.onGround || s.onPlatform)) {
      s.catVY = JUMP_V
      s.onGround = false
      s.onPlatform = false
    }
  }, [phase, initState])

  // Start / restart on click
  const handleClick = useCallback(() => jump(), [jump])

  // Space bar
  useEffect(() => {
    const onKey = (e) => { if (e.code === 'Space') { e.preventDefault(); jump() } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [jump])

  // Game loop
  useEffect(() => {
    if (phase !== 'playing') return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const tick = () => {
      const s = stateRef.current
      if (!s) return

      s.frame++
      s.speed += SPEED_INC
      s.score = Math.floor(s.frame / 6)

      // Physics
      s.catVY += GRAVITY
      s.catY  += s.catVY
      s.onPlatform = false

      // Ground collision
      if (s.catY >= GROUND) {
        s.catY     = GROUND
        s.catVY    = 0
        s.onGround = true
      } else {
        s.onGround = false
      }

      // Spawn obstacles
      s.nextSpawn--
      if (s.nextSpawn <= 0) {
        s.obstacles.push(makeObstacle(W + 20))
        s.nextSpawn = 70 + Math.random() * 80
      }

      // Move + cull obstacles
      s.obstacles = s.obstacles.filter(o => o.x + (o.w || 60) > -20)
      s.obstacles.forEach(o => { o.x -= s.speed })

      // Collision + platform landing
      const CAT_X = 90
      const catTop = s.catY - 38
      const catBot = s.catY
      const catL   = CAT_X - 12
      const catR   = CAT_X + 12

      for (const o of s.obstacles) {
        if (o.type === 'spike') {
          // Simple AABB against the bounding box of spikes (slightly inset)
          if (catR > o.x + 4 && catL < o.x + o.w - 4 && catBot > o.y + 6 && catTop < o.y + o.h) {
            s.dead = true
            setPhase('dead')
            cancelAnimationFrame(rafRef.current)
            // Draw final dead frame
            draw(ctx, s)
            return
          }
        } else if (o.type === 'platform') {
          // Land on top of platform
          const prevBot = catBot - s.catVY
          if (catR > o.x + 2 && catL < o.x + o.w - 2 &&
              prevBot <= o.y + 2 && catBot >= o.y && catBot <= o.y + 14 &&
              s.catVY >= 0) {
            s.catY      = o.y
            s.catVY     = 0
            s.onPlatform = true
          }
        }
      }

      draw(ctx, s)
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [phase])

  function draw(ctx, s) {
    // Background
    ctx.clearRect(0, 0, W, H)

    // Sky gradient
    const sky = ctx.createLinearGradient(0, 0, 0, GROUND)
    sky.addColorStop(0, '#FFF8EE')
    sky.addColorStop(1, '#FFE8CC')
    ctx.fillStyle = sky
    ctx.fillRect(0, 0, W, GROUND)

    // Distant hills
    ctx.fillStyle = 'rgba(240,200,160,0.35)'
    ctx.beginPath()
    ctx.moveTo(0, GROUND)
    const hx = (s.frame * 0.3) % W
    for (let x2 = -hx; x2 < W + 60; x2 += 120) {
      ctx.moveTo(x2, GROUND)
      ctx.bezierCurveTo(x2 + 20, GROUND - 40, x2 + 100, GROUND - 40, x2 + 120, GROUND)
    }
    ctx.fill()

    // Ground
    ctx.fillStyle = '#C8956C'
    ctx.fillRect(0, GROUND, W, H - GROUND)
    ctx.fillStyle = '#A0714A'
    ctx.fillRect(0, GROUND, W, 5)

    // Ground detail dots
    ctx.fillStyle = 'rgba(255,255,255,0.18)'
    for (let gx = (s.frame * s.speed) % 30; gx < W; gx += 30) {
      ctx.beginPath()
      ctx.arc(gx, GROUND + 12, 2, 0, Math.PI * 2)
      ctx.fill()
    }

    // Obstacles
    s.obstacles.forEach(o => {
      if (o.type === 'spike') drawSpike(ctx, o.x, o.y, o.w, o.h)
      else drawPlatform(ctx, o.x, o.y, o.w)
    })

    // Cat
    drawCat(ctx, 90, s.catY, s.frame, s.dead)

    // Score
    ctx.fillStyle = 'rgba(90,50,20,0.55)'
    ctx.font = '700 13px Figtree, sans-serif'
    ctx.textAlign = 'right'
    ctx.fillText(`${s.score}`, W - 16, 28)
  }

  // Draw idle screen once
  useEffect(() => {
    if (phase !== 'idle') return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const s = { catY: GROUND, catVY: 0, frame: 0, obstacles: [], dead: false, speed: OBSTACLE_SPEED_START, onGround: true, onPlatform: false }
    stateRef.current = s
    draw(ctx, s)
  }, [phase])

  return (
    <div className={styles.wrap} onClick={handleClick}>
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        className={styles.canvas}
      />

      {phase === 'idle' && (
        <div className={styles.overlay}>
          <p className={styles.overlayTitle}>click to play</p>
          <p className={styles.overlaySub}>jump over the terrain!</p>
        </div>
      )}

      {phase === 'dead' && (
        <div className={styles.overlay}>
          <p className={styles.overlayTitle}>oops! try again?</p>
          <p className={styles.overlaySub}>click to restart</p>
        </div>
      )}
    </div>
  )
}
