/**
 * Case Study — Vagaro Dashboard Redesign
 * Interactive parallax case study page.
 */
import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from 'framer-motion'
import figmaVideo from '../assets/dashboard-figma.mp4'
import dashAppointments from '../assets/dash-appointments.jpg'
import dashGoals from '../assets/dash-goals.jpg'
import dashHeader from '../assets/dash-header.jpg'
import dashOverview from '../assets/dash-overview.jpg'
import dashSetup from '../assets/dash-setup.jpg'
import dashSetup2 from '../assets/dash-setup2.jpg'
import figmaMakeVideo from '../assets/dashboard-figmamake.mp4'
import reactVideo from '../assets/dashboard-react.mp4'
import PageTransition from '../components/PageTransition'
import { ScrollReveal, StaggerGroup, StaggerItem } from '../components/ScrollReveal'
import WaveDivider from '../components/WaveDivider'
import RunningCat from '../components/RunningCat'
import styles from './CaseStudyDashboard.module.css'

/* ── Scroll progress bar ── */
function ProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })
  return (
    <motion.div
      className={styles.progressBar}
      style={{ scaleX, transformOrigin: 'left' }}
    />
  )
}

/* ── Smooth SVG path helper (cardinal spline) ── */
function smoothPath(pts) {
  if (pts.length < 2) return ''
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[Math.min(pts.length - 1, i + 2)]
    const t = 0.28
    const cp1x = p1[0] + (p2[0] - p0[0]) * t
    const cp1y = p1[1] + (p2[1] - p0[1]) * t
    const cp2x = p2[0] - (p3[0] - p1[0]) * t
    const cp2y = p2[1] - (p3[1] - p1[1]) * t
    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)},${cp2x.toFixed(1)} ${cp2y.toFixed(1)},${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }
  return d
}

/* ── Interactive performance graph ── */
const CHART_DATA = [650,675,720,800,880,950,1010,980,920,875,860,870,860,855,848,835,820,780,728,745,840,922]
const X1 = 58, Y_TOP = 10, X2 = 688, Y_BOT = 228
const PW = X2 - X1   // 630
const PH = Y_BOT - Y_TOP  // 218
const Y_MAX = 1100
const xS = (i) => X1 + (i / (CHART_DATA.length - 1)) * PW
const yS = (v) => Y_BOT - (v / Y_MAX) * PH

const SVG_PTS  = CHART_DATA.map((v, i) => [xS(i), yS(v)])
const LINE_D   = smoothPath(SVG_PTS)
const AREA_D   = `${LINE_D} L ${SVG_PTS[SVG_PTS.length-1][0].toFixed(1)} ${Y_BOT} L ${X1} ${Y_BOT} Z`
const GRID_VS  = [1000, 750, 500, 250, 0]
const X_LABELS = [{ i:0, t:'Oct 1' },{ i:7, t:'Oct 8' },{ i:14, t:'Oct 15' },{ i:21, t:'Oct 22' }]
const STATS    = [
  { label:'New Customers', target:49,  down:true,  pct:'8.52%' },
  { label:'Appointments',  target:87,  down:true,  pct:'8.52%' },
  { label:'Page Views',    target:238, down:false, pct:'10.26%' },
  { label:'Calls',         target:58,  down:false, pct:'10.26%' },
]

function PerformanceGraph() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5%' })
  const [revenue, setRevenue]     = useState(0)
  const [statVals, setStatVals]   = useState([0,0,0,0])
  const [activeTab, setActiveTab] = useState('Business')

  useEffect(() => {
    if (!isInView) return
    const duration = 1600
    const start = Date.now()
    const tick = () => {
      const raw = Math.min((Date.now() - start) / duration, 1)
      const e   = 1 - Math.pow(1 - raw, 3)
      setRevenue(2523.67 * e)
      setStatVals(STATS.map(s => Math.round(s.target * e)))
      if (raw < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView])

  return (
    <div ref={ref} className={styles.graphCard}>
      {/* Header */}
      <div className={styles.graphCardHeader}>
        <h3 className={styles.graphTitle}>Performance Overview</h3>
        <div className={styles.graphHeaderRight}>
          <div className={styles.graphTabs}>
            {['Business','Personal'].map(t => (
              <button key={t} className={`${styles.graphTab} ${activeTab===t ? styles.graphTabActive : ''}`} onClick={() => setActiveTab(t)}>{t}</button>
            ))}
          </div>
          <button className={styles.graphPeriod}>This Month ▾</button>
        </div>
      </div>

      {/* Revenue */}
      <div className={styles.graphRevenue}>
        <span className={styles.graphRevenueLabel}>Revenue</span>
        <div className={styles.graphRevenueRow}>
          <span className={styles.graphRevenueValue}>${revenue.toFixed(2)}</span>
          <span className={`${styles.graphBadge} ${styles.graphBadgeGreen}`}>↑ 10.26%&nbsp;<span className={styles.graphBadgeSub}>vs last month</span></span>
        </div>
      </div>

      {/* SVG chart */}
      <svg viewBox="0 0 700 258" className={styles.graphSvg}>
        <defs>
          <linearGradient id="dgAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#93C5D8" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#93C5D8" stopOpacity="0.02" />
          </linearGradient>
          <clipPath id="dgReveal">
            <motion.rect x={X1-2} y={0} height={Y_BOT+30}
              initial={{ width: 0 }}
              animate={isInView ? { width: PW+14 } : { width: 0 }}
              transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
            />
          </clipPath>
        </defs>

        {/* Dashed grid lines + y-labels */}
        {GRID_VS.map(v => {
          const y = yS(v)
          return (
            <g key={v}>
              <line x1={X1} y1={y} x2={X2} y2={y} stroke="#E5E7EB" strokeWidth="1" strokeDasharray="5 4" />
              <text x={X1-8} y={y+4} textAnchor="end" fontSize="11" fill="#9CA3AF">${v===1000?'1,000':v}</text>
            </g>
          )
        })}

        {/* Area */}
        <path d={AREA_D} fill="url(#dgAreaGrad)" clipPath="url(#dgReveal)" />
        {/* Line */}
        <path d={LINE_D} fill="none" stroke="#5BA4C0" strokeWidth="2.5" strokeLinecap="round" clipPath="url(#dgReveal)" />

        {/* X-axis labels */}
        {X_LABELS.map(({ i, t }) => (
          <text key={t} x={xS(i)} y={Y_BOT+24} textAnchor="middle" fontSize="11" fill="#9CA3AF">{t}</text>
        ))}
      </svg>

      {/* Stat cards */}
      <div className={styles.graphStats}>
        {STATS.map((s, i) => (
          <div key={s.label} className={styles.graphStatCard}>
            <span className={styles.graphStatLabel}>{s.label}</span>
            <span className={styles.graphStatValue}>{statVals[i]}</span>
            <span className={`${styles.graphBadge} ${s.down ? styles.graphBadgeRed : styles.graphBadgeGreen}`}>
              {s.down ? '↓' : '↑'} {s.pct}&nbsp;<span className={styles.graphBadgeSub}>vs last month</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Scattered card pile ── */
const EXPLORATION_CARDS = [
  { img: dashHeader,       label: 'Header Widget',        top: '5%',  left: '1%',   rotate: -11 },
  { img: dashGoals,        label: 'Goals',                top: '30%', left: '14%',  rotate: 6  },
  { img: dashAppointments, label: 'Appointments',         top: '8%',  left: '32%',  rotate: -5 },
  { img: dashOverview,     label: 'Performance Overview', top: '28%', left: '50%',  rotate: 8  },
  { img: dashSetup2,       label: 'Getting Started',      top: '4%',  left: '66%',  rotate: -7 },
  { img: dashSetup,        label: 'Setup',                top: '35%', left: '78%',  rotate: 4  },
]

function ScatteredCards() {
  const [active, setActive] = useState(null)
  const containerRef = useRef(null)
  return (
    <div className={styles.scatterWrap} ref={containerRef}>
      {EXPLORATION_CARDS.map((card, i) => {
        const isActive = active === i
        return (
          <motion.div
            key={card.label}
            className={styles.scatterCard}
            style={{ top: card.top, left: card.left, zIndex: isActive ? 20 : i + 1 }}
            initial={{ rotate: card.rotate }}
            animate={{ rotate: isActive ? 0 : card.rotate, scale: isActive ? 1.08 : 1 }}
            whileHover={{ scale: isActive ? 1.08 : 1.05, zIndex: 15 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            onClick={() => setActive(isActive ? null : i)}
            drag
            dragConstraints={containerRef}
            dragMomentum={false}
            dragElastic={0}
          >
            <img src={card.img} alt={card.label} className={styles.scatterCardImg} />
          </motion.div>
        )
      })}
    </div>
  )
}

/* ─────────────────────────────────────────── */

export default function CaseStudyDashboard() {
  const heroRef = useRef(null)
  const quoteRef = useRef(null)

  /* Page scroll for hero parallax */
  const { scrollYProgress } = useScroll()
  const blob1Y = useTransform(scrollYProgress, [0, 0.4], [0, -120])
  const blob2Y = useTransform(scrollYProgress, [0, 0.4], [0, -80])
  const heroContentY = useTransform(scrollYProgress, [0, 0.3], [0, 40])

  /* Quote section parallax */
  const { scrollYProgress: quoteProgress } = useScroll({
    target: quoteRef,
    offset: ['start end', 'end start'],
  })
  const quoteX = useTransform(quoteProgress, [0, 1], [-30, 30])

  return (
    <PageTransition>
      <ProgressBar />

      <main className={styles.page}>

        {/* ── Back link ── */}
        <div className={styles.backWrap}>
          <Link to="/" className={styles.backLink}>
            <motion.span whileHover={{ x: -4 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
              ← Back to work
            </motion.span>
          </Link>
        </div>

        {/* ═══ HERO ═══ */}
        <section className={styles.hero} ref={heroRef}>
          {/* Parallax blobs */}
          <motion.div className={`${styles.blob} ${styles.blob1}`} style={{ y: blob1Y }} />
          <motion.div className={`${styles.blob} ${styles.blob2}`} style={{ y: blob2Y }} />

          <div className={styles.heroInnerWrap}>
            <motion.div className={styles.heroInner} style={{ y: heroContentY }}>
              <ScrollReveal>
                <span className={styles.eyebrow}>Vagaro · AI Product · Redesign</span>
                <h1 className={styles.heroTitle}>
                  Leveraging AI Prototyping Tools to Bring a
                  <em> Homepage to Life</em>
                </h1>
                <p className={styles.heroTagline}>
                  How I reimagined the Vagaro homepage to reduce cognitive load and highlight
                  high-priority business insights through AI tooling.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <div className={styles.metaRow}>
                  {[
                    { label: 'Role', value: 'Design Lead' },
                    { label: 'Team', value: 'Kiran Kaur (PM)' },
                    { label: 'Timeline', value: 'Jan 2025 – Jun 2025' },
                    { label: 'Platform', value: 'Mobile · iOS & Android' },
                  ].map(m => (
                    <div key={m.label} className={styles.metaChip}>
                      <span className={styles.metaLabel}>{m.label}</span>
                      <span className={styles.metaValue}>{m.value}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </motion.div>

            <ScrollReveal delay={0.25} className={styles.heroGraphWrap}>
              <PerformanceGraph />
            </ScrollReveal>
          </div>
        </section>

        <WaveDivider from="var(--warm-white)" to="var(--cream)" variant="melt" />

        {/* ═══ OVERVIEW ═══ */}
        <section className={styles.overview}>
          <div className={styles.sectionInner}>
            <ScrollReveal>
              <span className={styles.sectionNum}>Overview</span>
              <p className={styles.body}>
                Vagaro's software and various features can create an overwhelming experience for users,
                leading them to feel like the product isn't made for them. As the lead designer, I led a
                homepage redesign leveraging user research and AI tooling to simplify data access and boost
                engagement.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className={styles.bulletChips}>
                {[
                  'Leveraging AI to surface high-priority business insights.',
                  'Building a standardized charts library for clearer data visualization.',
                  'Integrating goal-tracking loops to drive merchant growth.',
                ].map(chip => (
                  <span key={chip} className={styles.bulletChip}>{chip}</span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <WaveDivider from="var(--cream)" to="var(--warm-white)" variant="ripple" />

        {/* ═══ BACKGROUND ═══ */}
        <section className={styles.background}>
          <div className={styles.sectionInner}>
            <ScrollReveal>
              <span className={styles.sectionNum}>01 | Background</span>
              <h2 className={styles.sectionTitle}>
                Most of our users don't know how to navigate our reports
              </h2>
              <p className={styles.body}>
                Vagaro is a powerhouse of data, but most of that value was buried under layers of
                navigation. We noticed a frustrating trend: users were only sticking to the two or three
                reports they knew well, while the rest of our insights gathered virtual dust.
              </p>
              <p className={styles.body}>
                Additionally, our support team is consistently flooded with calls from users asking for
                features or data points that already exist. The information was there, but the cognitive
                load required to find it was too high.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <WaveDivider from="var(--warm-white)" to="#FFF3E4" variant="drip" />

        {/* ═══ BRAINSTORMING ═══ */}
        <section className={styles.brainstorm}>
          <div className={styles.sectionInner}>
            <ScrollReveal>
              <span className={styles.sectionNum}>02 | Brainstorming</span>
              <h2 className={styles.sectionTitle}>
                Cross-functional teams gave more insight on the specific pain points that users faced.
              </h2>
              <p className={styles.body}>
                To make sure I wasn't designing in a vacuum, I brought in people who talk to our users
                every day: Support, Sales, and Account Management. We broke into groups to understand our
                different personas — from the solo entrepreneur to the large franchise owner.
              </p>
            </ScrollReveal>

            <StaggerGroup className={styles.insightCards}>
              {[
                {
                  icon: '💡',
                  title: '"Make the data easy"',
                  desc: 'Users should be able to visualize charts easier, in the way they want.',
                  color: 'var(--yellow-pale)',
                },
                {
                  icon: '🤖',
                  title: '"AI-Driven Approach"',
                  desc: "Instead of random pop-ups, we could use a business's own data to recommend specific tools that would solve their current bottlenecks.",
                  color: 'var(--blush-light)',
                },
                {
                  icon: '🎯',
                  title: '"Goal Setting + Tracking"',
                  desc: 'Data is boring without a goal. By adding goal-setting, we could transform the dashboard into a tool for retention and user engagement.',
                  color: 'var(--peach)',
                },
              ].map((card, i) => (
                <StaggerItem key={card.title}>
                  <motion.div
                    className={styles.insightCard}
                    style={{ '--card-color': card.color }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                  >
                    <span className={styles.insightIcon}>{card.icon}</span>
                    <h3 className={styles.insightCardTitle}>{card.title}</h3>
                    <p className={styles.insightCardDesc}>{card.desc}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <div ref={quoteRef} className={styles.quoteWrap}>
              <motion.blockquote className={styles.quote} style={{ x: quoteX }}>
                <p className={styles.quoteText}>
                  "The solo entrepreneur doesn't care about the same data points as the large franchise owner."
                </p>
              </motion.blockquote>
            </div>
          </div>
        </section>

        <WaveDivider from="#FFF3E4" to="var(--cream)" variant="melt" />

        {/* ═══ COMPONENT DESIGN ═══ */}
        <section className={styles.componentDesign}>
          <div className={styles.sectionInner}>
            <ScrollReveal>
              <span className={styles.sectionNum}>03 | Component Design</span>
              <h2 className={styles.sectionTitle}>
                Establishing a standardized charts library for clarity and scale
              </h2>
              <p className={styles.body}>
                Vagaro's old charts were a major source of friction. They felt dated and cluttered,
                making it hard for business owners to understand their insights at a glance. But the
                bigger problem was that we had zero chart components in our Figma library. Every designer
                was essentially designing charts from scratch, leading to inconsistencies across the
                software.
              </p>
              <p className={styles.body}>
                I stepped in to create our first chart components within Figma, using variables to allow
                designers to toggle between data states, timeframes, and chart types instantly.
              </p>
              <p className={styles.body}>
                A library is only as good as its implementation. I also worked with our React developers
                to ensure that our code library mirrored our Figma components 1:1.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className={styles.componentParityWrap}>
                <div className={styles.componentVideoCard}>
                  <div className={styles.componentVideoSource}>
                    <span className={styles.componentSourceDot} style={{ background: '#8B5CF6' }} />
                    Figma
                  </div>
                  <video
                    src={figmaVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={styles.componentVideo}
                  />
                  <span className={styles.componentVideoLabel}>Component Library</span>
                </div>

                <div className={styles.componentParityBadge}>
                  <div className={styles.componentParityLine} />
                  <div className={styles.componentParityPill}>
                    <span className={styles.componentParityIcon}>⇄</span>
                    <span>1:1 parity</span>
                  </div>
                  <div className={styles.componentParityLine} />
                </div>

                <div className={styles.componentVideoCard}>
                  <div className={styles.componentVideoSource}>
                    <span className={styles.componentSourceDot} style={{ background: '#38BDF8' }} />
                    React
                  </div>
                  <video
                    src={reactVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={styles.componentVideo}
                  />
                  <span className={styles.componentVideoLabel}>Code Toolkit</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <WaveDivider from="var(--cream)" to="var(--warm-white)" variant="ripple" />

        {/* ═══ CHANGE IN SCOPE ═══ */}
        <section className={styles.scope}>
          <div className={styles.sectionInner}>
            <ScrollReveal>
              <span className={styles.sectionNum}>04 | Change in Scope</span>
              <h2 className={styles.sectionTitle}>
                From a dashboard update to a new homepage experience
              </h2>
              <p className={styles.body}>
                As I dug into the research, I realized that just updating the reports wouldn't necessarily
                fix the core problem. If a user is feeling overwhelmed, that doesn't extend just to
                understanding their business data. I proposed a change in scope: from a simple dashboard
                update to building a new homepage experience.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className={styles.scopeColumns}>
                <div className={styles.scopeCol}>
                  <span className={styles.scopeLabel}>Old Scope</span>
                  <div className={`${styles.scopeCard} ${styles.scopeCardOld}`}>
                    <h3 className={styles.scopeCardTitle}>Simplify the Data</h3>
                    <p className={styles.scopeCardDesc}>
                      Instead of showing all the data, we can use the homepage to surface the most
                      frequent actions and at-a-glance metrics. By highlighting the essentials, the
                      software would feel lighter and more approachable.
                    </p>
                  </div>
                </div>

                <div className={styles.scopeArrow}>→</div>

                <div className={styles.scopeCol}>
                  <span className={styles.scopeLabel}>New Scope</span>
                  <div className={`${styles.scopeCard} ${styles.scopeCardNew}`}>
                    <h3 className={styles.scopeCardTitle}>A Strategic Partner</h3>
                    <p className={styles.scopeCardDesc}>
                      By leveraging AI to analyze a business, we could turn the homepage into a strategic
                      partner. If their bookings were down, the homepage would suggest a marketing tool.
                      If they were growing fast, it would suggest staff management features.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <WaveDivider from="var(--warm-white)" to="var(--cream)" variant="melt" />

        {/* ═══ VISUAL EXPLORATIONS ═══ */}
        <section className={styles.visualExplorations}>
          <div className={styles.sectionInner}>
            <ScrollReveal>
              <span className={styles.sectionNum}>05 | Visual Explorations</span>
              <h2 className={styles.sectionTitle}>
                With a broader scope, I had the freedom to rethink Vagaro's visual language.
              </h2>
              <p className={styles.body}>
                My goal wasn't just to make it look better, but to make the homepage a tool for user
                engagement.
              </p>
              <p className={styles.body}>
                I explored gamification and positive reinforcement by visualizing business growth through
                interactive progress rings and streak indicators.
              </p>
              <p className={styles.body}>
                Since most of our pros are managing their business from their phones, I prioritized the
                mobile experience. I explored how modular cards could stack and reorganize themselves
                based on priority.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.15} className={styles.scatterOuter}>
            <ScatteredCards />
          </ScrollReveal>
        </section>

        <WaveDivider from="var(--cream)" to="#FFF3E4" variant="drip" />

        {/* ═══ DESIGNING WITH AI ═══ */}
        <section className={styles.aiSection}>
          <div className={styles.sectionInner}>
            <div className={styles.aiLayout}>
              <div className={styles.aiContent}>
                <ScrollReveal>
                  <span className={styles.sectionNum}>06 | Designing with AI</span>
                  <h2 className={styles.sectionTitle}>
                    Leveraging AI to Accelerate High-Fidelity Prototyping
                  </h2>
                  <p className={styles.body}>
                    To bring the homepage to life quickly, I wanted to integrate Figma Make into my workflow.
                    However, my experience with AI tools has taught me that while AI is great at creating for
                    the big picture, it often misses the mark when things get hyper-specific.
                  </p>
                  <p className={styles.body}>
                    Since I had already established the core visual design and modular widgets, I used AI as
                    a builder. I added each homepage widget as a standalone prompt, ensuring that each one
                    was functioning correctly before moving on to the next.
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                  <div className={styles.aiHighlight}>
                    <p>
                      This allowed me to move faster without sacrificing the integrity of the design. I used
                      that extra time to focus on the details. Instead of handing off static screens, I was
                      able to build high-fidelity, interactive prototypes that actually felt like a finished
                      product.
                    </p>
                  </div>
                </ScrollReveal>
              </div>

              <ScrollReveal delay={0.15} className={styles.aiVideoWrap}>
                <video
                  src={figmaMakeVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className={styles.aiVideo}
                />
                <div className={styles.promptCard}>
                  <div className={styles.promptCardHeader}>
                    <div className={styles.promptDots}>
                      <span className={styles.promptDot} style={{ background: '#FF5F57' }} />
                      <span className={styles.promptDot} style={{ background: '#FEBC2E' }} />
                      <span className={styles.promptDot} style={{ background: '#28C840' }} />
                    </div>
                    <span className={styles.promptLabel}>Figma Make Prompt</span>
                  </div>
                  <div className={styles.promptBody}>
                    <span className={styles.promptCaret}>{'>'}</span>
                    <p className={styles.promptText}>
                      Animate this graph to draw the user's eye to the Total Revenue first. Use a staggered
                      entrance: first the Y-axis scale, then the line graph with a 1.5s draw-in effect, and
                      finally the data points. Ensure the easing feels snappy (ease-out) to make the
                      dashboard feel performant.
                    </p>
                  </div>
                  <div className={styles.promptCursor} />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <WaveDivider from="#FFF3E4" to="var(--cream)" variant="melt" />

        {/* ═══ CTA ═══ */}
        <section className={styles.cta}>
          <ScrollReveal>
            <div className={styles.ctaInner}>
              <p className={styles.ctaEnjoy}>Enjoyed reading my case study?</p>
              <p className={styles.ctaSub}>You can find me at my socials below!</p>
              <div className={styles.ctaLinks}>
                <motion.a
                  href="https://www.linkedin.com/in/angela-wu-ux/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaBtn}
                  whileHover={{ scale: 1.06, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 16 }}
                >
                  LinkedIn ↗
                </motion.a>
                <Link to="/" className={styles.ctaBtnOutline}>
                  <motion.span whileHover={{ x: -3 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
                    ← See all work
                  </motion.span>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <RunningCat />
      </main>
    </PageTransition>
  )
}
