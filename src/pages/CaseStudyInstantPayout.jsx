/**
 * Case Study — Instant Payout (Vagaro)
 * Interactive parallax case study page.
 */
import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  AnimatePresence,
} from 'framer-motion'
import ipHeroVideo from '../assets/ip-hero.mp4'
import ipToggle from '../assets/ip-toggle.jpg'
import ipDropdown from '../assets/ip-dropdown.jpg'
import ipIter1 from '../assets/ip-iter1.jpg'
import ipIter2 from '../assets/ip-iter2.jpg'
import ipIter3 from '../assets/ip-iter3.jpg'
import pain1 from '../assets/pain-1.svg'
import pain2 from '../assets/pain-2.svg'
import pain3 from '../assets/pain-3.svg'
import { useRive } from '@rive-app/react-canvas'
import BeforeAfterAnnotated from '../components/BeforeAfterAnnotated'
import PageTransition from '../components/PageTransition'
import { ScrollReveal, StaggerGroup, StaggerItem } from '../components/ScrollReveal'
import WaveDivider from '../components/WaveDivider'
import RunningCat from '../components/RunningCat'
import styles from './CaseStudyInstantPayout.module.css'

/* ── Stakeholder Rive animation ── */
function StakeholderAnimation() {
  const { RiveComponent } = useRive({
    src: '/feedback.riv',
    stateMachines: 'State Machine 1',
    autoplay: true,
  })
  return (
    <div style={{ width: '100%', height: '340px' }}>
      <RiveComponent style={{ width: '100%', height: '100%' }} />
    </div>
  )
}

/* ── Animated counter ── */
function Counter({ to, prefix = '', suffix = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 1800
    const start = Date.now()
    const tick = () => {
      const t = Math.min((Date.now() - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(to * eased)
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, to])

  const display =
    to >= 1000000
      ? (val / 1000000).toFixed(1) + 'M'
      : to >= 1000
      ? Math.round(val).toLocaleString()
      : Math.round(val).toLocaleString()

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  )
}

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

/* ── Usability test toggle ── */
function ABTest() {
  const [active, setActive] = useState('A')
  return (
    <div className={styles.abWrap}>
      <div className={styles.abToggle}>
        <button
          className={`${styles.abBtn} ${active === 'A' ? styles.abBtnActive : ''}`}
          onClick={() => setActive('A')}
        >
          Version A — Toggles
        </button>
        <button
          className={`${styles.abBtn} ${active === 'B' ? styles.abBtnActive : ''}`}
          onClick={() => setActive('B')}
        >
          Version B — Dropdowns
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className={styles.abContent}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
        >
          {active === 'A' ? (
            <div className={styles.abResult}>
              <div className={styles.abScreen}>
                <span className={styles.abScreenLabel}>Version A</span>
                <img src={ipToggle} alt="Toggle UI — Same-Day Deposit Schedule" className={styles.abScreenImg} />
              </div>
              <div className={styles.abDetails}>
                <div className={styles.abHypo}>
                  <span className={styles.abHypoLabel}>Hypothesis</span>
                  <p>Version B (Dropdowns) would perform best — the dropdown interface gives clarity to the transfer type selection and offers clear choices.</p>
                </div>
                <div className={`${styles.abResultBox} ${styles.abResultBoxWin}`}>
                  <span className={styles.abResultLabel}>✓ Winner</span>
                  <p><strong>Version A (Toggles)</strong> performed best — 5 out of 5 users completed the task "Schedule a recurring payout" with a shorter average completion time.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.abResult}>
              <div className={styles.abScreen}>
                <span className={styles.abScreenLabel}>Version B</span>
                <img src={ipDropdown} alt="Dropdown UI — Select Transfer Type per Day" className={styles.abScreenImg} />
              </div>
              <div className={styles.abDetails}>
                <div className={styles.abHypo}>
                  <span className={styles.abHypoLabel}>Hypothesis</span>
                  <p>Version B (Dropdowns) would perform best — the dropdown interface gives clarity to the transfer type selection and offers clear choices.</p>
                </div>
                <div className={`${styles.abResultBox} ${styles.abResultBoxLose}`}>
                  <span className={styles.abResultLabel}>✗ Not selected</span>
                  <p>Users took longer to complete the scheduling task. The dropdown's extra interaction cost outweighed its perceived clarity benefit.</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* ─────────────────────────────────────────── */

export default function CaseStudyInstantPayout() {
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

          <div className={styles.heroLayout}>
            <motion.div className={styles.heroInner} style={{ y: heroContentY }}>
              <ScrollReveal>
                <span className={styles.eyebrow}>Vagaro · Fintech · 0→1 Feature</span>
                <h1 className={styles.heroTitle}>
                  Launching a 0 → 1 Payment Feature in
                  <em> Instant Payout</em>
                </h1>
                <p className={styles.heroTagline}>
                  Designing a feature from concept to launch in collaboration with Payments and Fraud stakeholders —
                  projected to generate $500K in revenue and boost user retention by 10%.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <div className={styles.metaRow}>
                  {[
                    { label: 'Role', value: 'Design Lead' },
                    { label: 'Timeline', value: 'Oct 2024 – Dec 2024' },
                    { label: 'Platform', value: 'Mobile · iOS & Android' },
                    { label: 'Teams', value: 'Payments · Fraud · Dev · C-Suite' },
                  ].map(m => (
                    <div key={m.label} className={styles.metaChip}>
                      <span className={styles.metaLabel}>{m.label}</span>
                      <span className={styles.metaValue}>{m.value}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </motion.div>

            {/* Hero video — phone frame */}
            <ScrollReveal delay={0.25} className={styles.phoneWrap}>
              <div className={styles.phoneFrame}>
                <div className={styles.phoneScreen}>
                  <div className={styles.phoneDynamicIsland} />
                  <video
                    src={ipHeroVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={styles.phoneVideo}
                  />
                  <div className={styles.phoneHomeBar} />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <WaveDivider from="var(--warm-white)" to="var(--cream)" variant="melt" />

        {/* ═══ OVERVIEW ═══ */}
        <section className={styles.overview}>
          <div className={styles.sectionInner}>
            <div className={styles.overviewGrid}>
              <ScrollReveal>
                <div className={styles.overviewMeta}>
                  <div className={styles.metaBlock}>
                    <span className={styles.metaBlockLabel}>Role</span>
                    <span className={styles.metaBlockValue}>Design Lead</span>
                  </div>
                  <div className={styles.metaBlock}>
                    <span className={styles.metaBlockLabel}>Timeline</span>
                    <span className={styles.metaBlockValue}>Oct 2024 – Dec 2024</span>
                  </div>
                </div>
              </ScrollReveal>

              <div>
                <ScrollReveal delay={0.1}>
                  <span className={styles.sectionNum}>Overview</span>
                  <p className={styles.body}>
                    Businesses have continually vented their frustrations with having to wait to get their money,
                    which is a major reason why businesses are reluctant to sign up for Vagaro's payment processing.
                  </p>
                  <p className={styles.body}>
                    To target this pain point, I led the design for the Instant Payout feature, which would allow
                    users to instantly get their money for a small fee. This involved surveying users, presenting
                    designs to executives, and collaborating with major stakeholders from cross-functional teams.
                  </p>
                  <p className={styles.body}>
                    The successful launch of Instant Payout in the end of Q2 led to an increase in total revenue,
                    user signups, as well as retention.
                  </p>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        <WaveDivider from="var(--cream)" to="var(--warm-white)" variant="ripple" />

        {/* ═══ BACKGROUND ═══ */}
        <section className={styles.background}>
          <div className={styles.sectionInner}>
            <ScrollReveal>
              <span className={styles.sectionNum}>01 | Background</span>
              <h2 className={styles.sectionTitle}>
                Vagaro is a B2B SaaS platform that enables beauty and wellness businesses
                to manage their calendar, clients, inventory, and more.
              </h2>
              <p className={styles.body}>
                Vagaro also offers a variety of add-on features depending on the business's needs,
                including credit card processing, which allows users to accept payments securely.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <WaveDivider from="var(--warm-white)" to="#FFF3E4" variant="drip" />

        {/* ═══ CONTEXT ═══ */}
        <section className={styles.context}>
          <div className={styles.sectionInner}>
            <div className={styles.contextGrid}>
              <div>
                <ScrollReveal>
                  <span className={styles.sectionNum}>02 | Context</span>
                  <h2 className={styles.sectionTitle}>
                    Credit card processing is Vagaro's number one feature when it comes to business retention.
                  </h2>
                  <p className={styles.body}>
                    The data shows that when a business signs up for processing, they are much more likely to
                    stay with Vagaro than businesses who do not. This means that increases in signups for
                    processing will lead to increased retention overall.
                  </p>
                  <p className={styles.body}>
                    As such, we started to hone in on opportunities to improve processing — the most obvious
                    being the ability to instantly deposit your money.
                  </p>
                  <p className={styles.body}>
                    Users had many frustrations about having to wait one-two business days for their funds,
                    especially over the weekend where they would have to wait till Monday.
                  </p>
                </ScrollReveal>
              </div>

              <StaggerGroup className={styles.painPoints}>
                {[
                  { img: pain1, text: 'Batch deposit waiting times frustrate existing users.' },
                  { img: pain2, text: 'Other competitors already offer the feature.' },
                  { img: pain3, text: '66% of all current users would pay a small fee to use the feature.' },
                ].map(p => (
                  <StaggerItem key={p.text}>
                    <motion.div
                      className={styles.painCard}
                      whileHover={{ x: 6 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                    >
                      <img src={p.img} alt="" className={styles.painIcon} />
                      <p className={styles.painText}>{p.text}</p>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>

            {/* Pull quote with parallax */}
            <div ref={quoteRef} className={styles.quoteWrap}>
              <motion.blockquote className={styles.quote} style={{ x: quoteX }}>
                <p className={styles.quoteText}>
                  "We need it now! I hate that we don't have instant pay. I have actually thought about
                  leaving your platform because I get tired of waiting 3 days for my money."
                </p>
                <cite className={styles.quoteCite}>— Anonymous User</cite>
              </motion.blockquote>
            </div>
          </div>
        </section>

        <WaveDivider from="#FFF3E4" to="var(--cream)" variant="melt" />

        {/* ═══ COMPETITIVE ANALYSIS ═══ */}
        <section className={styles.competitive}>
          <div className={styles.sectionInner}>
            <ScrollReveal>
              <span className={styles.sectionNum}>03 | Competitive Analysis</span>
              <h2 className={styles.sectionTitle}>
                There's a lot of good examples of an "instant transfer" feature already out there.
              </h2>
              <p className={styles.body}>
                Instant Payout is already a commonly offered feature in most credit card processing softwares.
                I looked at the user flows for initiating an instant transfer on other{' '}
                <strong>industry standard finance platforms</strong> to see what worked for them.
              </p>
            </ScrollReveal>

            <StaggerGroup className={styles.competitorRow}>
              {['Square', 'Toast', 'Robinhood', 'Venmo'].map(name => (
                <StaggerItem key={name}>
                  <motion.div
                    className={styles.competitorChip}
                    whileHover={{ scale: 1.08, y: -4 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    {name}
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <ScrollReveal delay={0.1}>
              <div className={styles.insightBox}>
                <p className={styles.insightTitle}>Our competitive analysis revealed several patterns and opportunities:</p>
                <ol className={styles.insightList}>
                  <li>Transfer amount is always given highest visual hierarchy.</li>
                  <li>The fee is often in fine print and sometimes isn't even visible until you start the transfer process.</li>
                  <li>Mobile experience is integral — softwares will emphasize the ease of use on mobile.</li>
                </ol>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <WaveDivider from="var(--cream)" to="var(--warm-white)" variant="ripple" />

        {/* ═══ STAKEHOLDER FEEDBACK ═══ */}
        <section className={styles.stakeholders}>
          <div className={styles.sectionInner}>
            <div className={styles.stakeholderLayout}>
              <ScrollReveal className={styles.stakeholderText}>
                <span className={styles.sectionNum}>04 | Stakeholder Feedback</span>
                <h2 className={styles.sectionTitle}>
                  Dealing with money meant that every team was involved.
                </h2>
                <p className={styles.body}>
                  I needed to work cross-functionally with a lot of different teams to have a better understanding
                  of all the feature requirements. This meant that I was constantly reviewing my designs with
                  stakeholders, but because it was hard to get time with everyone at once, I ended up having to
                  spread my time across the different teams.
                </p>
                <p className={styles.body}>
                  I noticed that the challenge of coordinating individual schedules and managing fragmented updates
                  was leading to growing misalignment across teams, with myself becoming the sole point of contact
                  for disparate information. This inefficiency was impeding the progress of the project.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.15} className={styles.stakeholderRive}>
                <StakeholderAnimation />
              </ScrollReveal>
            </div>

            <StaggerGroup className={styles.teamGrid}>
              {[
                {
                  team: 'Payments',
                  icon: '💳',
                  color: 'var(--yellow-pale)',
                  desc: 'Cared deeply about how Instant Payout would show on reports and how users would be able to monitor their transactions.',
                },
                {
                  team: 'Fraud & Risk',
                  icon: '🛡️',
                  color: 'var(--blush-light)',
                  desc: 'Had requirements and restrictions which led to designing for specific edge cases related to handling fraud.',
                },
                {
                  team: 'C-Suite',
                  icon: '📊',
                  color: 'var(--peach)',
                  desc: 'Wanted Instant Payout to be more accessible across the platform so I needed to identify where else I could add the feature.',
                },
                {
                  team: 'Development',
                  icon: '💻',
                  color: 'var(--yellow-pale)',
                  desc: 'Had specific guidelines on how Instant Payout had to be handled, which meant designing around those restrictions.',
                },
              ].map((t, i) => (
                <StaggerItem key={t.team}>
                  <motion.div
                    className={styles.teamCard}
                    style={{ '--team-color': t.color }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                  >
                    <span className={styles.teamIcon}>{t.icon}</span>
                    <h3 className={styles.teamName}>{t.team}</h3>
                    <p className={styles.teamDesc}>{t.desc}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <ScrollReveal delay={0.2}>
              <div className={styles.decisionBox}>
                <p className={styles.decisionLead}>
                  I made the decision to move all further conversation to dedicated team channels
                  to notify all stakeholders of every update. This was big for three reasons:
                </p>
                <ul className={styles.decisionList}>
                  <li>Kept everyone involved aligned on big changes to the project.</li>
                  <li>Eliminated the need for unnecessary meetings explaining the same things over and over again.</li>
                  <li>Helped keep a record of important decisions made and the reasons behind why we made them.</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <WaveDivider from="var(--warm-white)" to="var(--cream)" variant="melt" />

        {/* ═══ USABILITY TESTING ═══ */}
        <section className={styles.usability}>
          <div className={styles.sectionInner}>
            <ScrollReveal>
              <span className={styles.sectionNum}>05 | Usability Testing</span>
              <h2 className={styles.sectionTitle}>
                Evaluating UI Patterns for Scheduling an Instant Payout.
              </h2>
              <p className={styles.body}>
                Users have the ability to schedule an Instant Payout for the days of the week. That way,
                if they want to get their money instantly every time they clock out on Friday, they can
                schedule it instead of having to manually click it every time.
              </p>
              <p className={styles.body}>
                My original design for the scheduled Instant Payout had dropdowns where users were able to
                choose what kind of payout they wanted each day. However, testing with users showed that
                toggles actually performed better.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <ABTest />
            </ScrollReveal>
          </div>
        </section>

        <WaveDivider from="var(--cream)" to="var(--warm-white)" variant="ripple" />

        {/* ═══ MOBILE DESIGN ═══ */}
        <section className={styles.mobile}>
          <div className={styles.sectionInner}>
            <ScrollReveal>
              <span className={styles.sectionNum}>06 | Mobile Design</span>
              <h2 className={styles.sectionTitle}>
                Elevating the design system to maximize the mobile experience.
              </h2>
              <p className={styles.body}>
                Given that a significant portion of our users access Vagaro on mobile, optimizing this
                experience was <strong>crucial</strong> for engagement and conversion.
              </p>
              <p className={styles.body}>
                One thing that I noticed from the competitive analysis was that the balance was always the
                main focus in the payout flow. Our current typography tokens didn't have the visual flair
                that I was looking for, therefore I convinced the team to add a new larger font size to our system.
              </p>
            </ScrollReveal>

            {/* Before / After — annotated comparison */}
            <ScrollReveal delay={0.1}>
              <BeforeAfterAnnotated />
            </ScrollReveal>

            {/* Iterations */}
            <div className={styles.iterations}>
              {[
                {
                  num: 'Iteration 1',
                  pros: ['Saves a lot of space.', 'Lets user know what deposit type they have.'],
                  cons: ['Doesn\'t let them know their schedule if they have same day enabled.', 'Might not look clickable at first glance.'],
                },
                {
                  num: 'Iteration 2',
                  pros: ['Lets user know what deposit type they have.', 'Shows schedule if same day is enabled.'],
                  cons: ['Takes up more room than needed.', 'Table might look clickable.'],
                },
                {
                  num: 'Iteration 3 ✓',
                  pros: ['Saves the most room.', 'Follows a common mobile pattern — card design.'],
                  cons: ['Doesn\'t show schedule.'],
                  winner: true,
                },
              ].map((iter, i) => (
                <ScrollReveal key={iter.num} delay={i * 0.1}>
                  <div className={`${styles.iterCard} ${iter.winner ? styles.iterCardWinner : ''}`}>
                    <div className={styles.iterScreen}>
                      <img
                        src={[ipIter1, ipIter2, ipIter3][i]}
                        alt={iter.num}
                        className={styles.iterScreenImg}
                      />
                    </div>
                    <div className={styles.iterDetails}>
                      <h3 className={styles.iterNum}>{iter.num}</h3>
                      <div className={styles.iterFeedback}>
                        <div className={styles.iterPros}>
                          {iter.pros.map(p => (
                            <div key={p} className={styles.iterItem}>
                              <span className={styles.iterGreen}>✓</span> {p}
                            </div>
                          ))}
                        </div>
                        <div className={styles.iterCons}>
                          {iter.cons.map(c => (
                            <div key={c} className={styles.iterItem}>
                              <span className={styles.iterRed}>✗</span> {c}
                            </div>
                          ))}
                        </div>
                      </div>
                      {iter.winner && (
                        <p className={styles.iterWinnerNote}>
                          Best compromise between reducing visual overload and having just enough information
                          to show the user how they could access their deposit settings.
                        </p>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <WaveDivider from="var(--warm-white)" to="#FFF3E4" variant="drip" />

        {/* ═══ RESULTS ═══ */}
        <section className={styles.results}>
          <div className={styles.sectionInner}>
            <ScrollReveal>
              <span className={styles.sectionNum}>07 | Results</span>
              <h2 className={styles.sectionTitle}>
                Within a month of launch, this is how Instant Payout performed.
              </h2>
            </ScrollReveal>

            <StaggerGroup className={styles.statsGrid}>
              {[
                { label: 'Instant Payout Users', to: 1248, prefix: '', suffix: '' },
                { label: 'Number of Payouts', to: 3112, prefix: '', suffix: '' },
                { label: 'Total Payout Amount', to: 2300000, prefix: '$', suffix: '' },
                { label: 'Total Revenue', to: 32858, prefix: '$', suffix: '' },
                { label: 'Conversion Rate', to: 96, prefix: '', suffix: '%' },
              ].map((stat, i) => (
                <StaggerItem key={stat.label}>
                  <motion.div
                    className={styles.statCard}
                    whileHover={{ y: -6, scale: 1.03 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                  >
                    <span className={styles.statNum}>
                      <Counter to={stat.to} prefix={stat.prefix} suffix={stat.suffix} />
                    </span>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        <WaveDivider from="#FFF3E4" to="var(--cream)" variant="melt" />

        {/* ═══ NEXT CTA ═══ */}
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
