/**
 * Case Study — Product Marketplace (Vagaro)
 * Interactive parallax case study page.
 */
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { ScrollReveal, StaggerGroup, StaggerItem } from '../components/ScrollReveal'
import WaveDivider from '../components/WaveDivider'
import RunningCat from '../components/RunningCat'
import styles from './CaseStudyProductMarketplace.module.css'

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

/* ── Product Catalog Mockup ── */
function CatalogMockup() {
  const products = [
    { name: 'Olaplex No. 3 Hair Perfector', brand: 'SalonCentric', price: '$28.00', tag: 'Best Seller' },
    { name: 'Wella Professionals INVIGO', brand: 'CosmoProf', price: '$19.50', tag: 'New' },
    { name: 'Redken All Soft Shampoo', brand: 'SalonCentric', price: '$22.00', tag: null },
    { name: 'Paul Mitchell Tea Tree', brand: 'Paul Mitchell', price: '$16.75', tag: 'Sale' },
  ]
  return (
    <div className={styles.catalogMockup}>
      <div className={styles.catalogHeader}>
        <div className={styles.catalogSearch}>
          <span className={styles.catalogSearchIcon}>🔍</span>
          <span className={styles.catalogSearchText}>Search products…</span>
        </div>
        <div className={styles.catalogFilterRow}>
          {['All', 'SalonCentric', 'CosmoProf', 'Paul Mitchell'].map(f => (
            <span key={f} className={`${styles.catalogFilter} ${f === 'All' ? styles.catalogFilterActive : ''}`}>{f}</span>
          ))}
        </div>
      </div>
      <div className={styles.catalogList}>
        {products.map((p, i) => (
          <div key={i} className={styles.catalogRow}>
            <div className={styles.catalogThumb} />
            <div className={styles.catalogInfo}>
              <span className={styles.catalogProductName}>{p.name}</span>
              <span className={styles.catalogBrand}>{p.brand}</span>
            </div>
            <div className={styles.catalogRight}>
              {p.tag && <span className={styles.catalogTag}>{p.tag}</span>}
              <span className={styles.catalogPrice}>{p.price}</span>
              <button className={styles.catalogAddBtn}>+</button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.catalogFooter}>
        <span className={styles.catalogCartLabel}>Cart · 2 vendors · 6 items</span>
        <button className={styles.catalogCheckoutBtn}>Review Order →</button>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────── */

export default function CaseStudyProductMarketplace() {
  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll()
  const blob1Y = useTransform(scrollYProgress, [0, 0.4], [0, -120])
  const blob2Y = useTransform(scrollYProgress, [0, 0.4], [0, -80])
  const heroContentY = useTransform(scrollYProgress, [0, 0.3], [0, 40])

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
          <motion.div className={`${styles.blob} ${styles.blob1}`} style={{ y: blob1Y }} />
          <motion.div className={`${styles.blob} ${styles.blob2}`} style={{ y: blob2Y }} />

          <div className={styles.heroLayout}>
            <motion.div className={styles.heroInner} style={{ y: heroContentY }}>
              <ScrollReveal>
                <span className={styles.eyebrow}>Vagaro · Commerce · B2B</span>
                <h1 className={styles.heroTitle}>
                  Integrating with Third Party Vendors to Create a
                  <em> Product Marketplace</em>
                </h1>
                <p className={styles.heroTagline}>
                  From business decisions, vibe coding early designs, to anticipating key edge cases —
                  how I navigated partnering with third party vendors and development to create a commerce
                  ecosystem for both B2B and B2B2C.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <div className={styles.metaRow}>
                  {[
                    { label: 'Role', value: 'Design Lead' },
                    { label: 'Timeline', value: 'Apr 2024 – Jun 2024' },
                    { label: 'Platform', value: 'Web + Mobile' },
                    { label: 'Teams', value: 'Dev · Partnerships · C-Suite' },
                  ].map(m => (
                    <div key={m.label} className={styles.metaChip}>
                      <span className={styles.metaLabel}>{m.label}</span>
                      <span className={styles.metaValue}>{m.value}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </motion.div>

            {/* Hero catalog mockup */}
            <ScrollReveal delay={0.25} className={styles.catalogWrap}>
              <CatalogMockup />
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
                As Lead Designer, I created Vagaro's Product Marketplace, a strategic initiative to partner
                with third-party distributors like SalonCentric and CosmoProf to increase Vagaro's market
                share and revenue. Close collaboration with development was necessary for this project. I
                designed both user flows and detailed API flows to ensure seamless technical integration.
                This systems thinking approach allowed me to preemptively plan for complex edge cases like
                smart search, multi-vendor orders, and intricate return flows, ultimately ensuring a
                scalable marketplace experience.
              </p>
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
                Strategic partnerships was a big focus for Vagaro in 2025
              </h2>
              <p className={styles.body}>
                With the majority of Vagaro's businesses being in the salon and beauty industry, a major
                focus this year was securing enterprise-level partnerships, presenting a significant
                opportunity to both grow Vagaro's market share as well as forge important connections
                with the industry's key players.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className={styles.partnerBoard}>
                <span className={styles.partnerBoardLabel}>Potential Partners</span>
                <div className={styles.partnerChips}>
                  {['SALLY', 'SalonCentric', 'Paul Mitchell', 'CosmoProf', 'L\'Oréal', 'WELLA'].map(p => (
                    <motion.span
                      key={p}
                      className={styles.partnerChip}
                      whileHover={{ scale: 1.06, y: -3 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      {p}
                    </motion.span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <WaveDivider from="var(--warm-white)" to="#FFF0E6" variant="drip" />

        {/* ═══ CONTEXT ═══ */}
        <section className={styles.context}>
          <div className={styles.sectionInner}>
            <ScrollReveal>
              <span className={styles.sectionNum}>02 | Context</span>
              <h2 className={styles.sectionTitle}>
                Identifying possible integration opportunities with potential partners led to the
                exploration of a product marketplace.
              </h2>
              <p className={styles.body}>
                Our initial focus centered on how Vagaro could integrate with diverse third-party vendors.
                Early brainstorming sessions led to the exploration of various concepts.
              </p>
            </ScrollReveal>

            <StaggerGroup className={styles.optionCards}>
              {[
                {
                  icon: '💬',
                  title: 'Social Messaging App',
                  desc: 'An in-platform messaging experience connecting salons with clients.',
                  selected: false,
                },
                {
                  icon: '🎓',
                  title: 'Educational Platform',
                  desc: 'A learning hub for beauty professionals to access courses and certifications.',
                  selected: false,
                },
                {
                  icon: '🛒',
                  title: 'Product Marketplace',
                  desc: 'A commerce layer for salons to purchase backbar products directly from vendors.',
                  selected: true,
                },
              ].map(opt => (
                <StaggerItem key={opt.title}>
                  <div className={`${styles.optionCard} ${opt.selected ? styles.optionCardSelected : ''}`}>
                    {opt.selected && <span className={styles.optionSelectedBadge}>✓ Selected</span>}
                    <span className={styles.optionIcon}>{opt.icon}</span>
                    <h3 className={styles.optionTitle}>{opt.title}</h3>
                    <p className={styles.optionDesc}>{opt.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <ScrollReveal delay={0.2}>
              <p className={`${styles.body} ${styles.contextNote}`}>
                We settled on the idea of the Product Marketplace early on due to its inherent flexibility,
                allowing us to support both direct B2B ordering and B2B2C dropshipping models.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <WaveDivider from="#FFF0E6" to="var(--cream)" variant="melt" />

        {/* ═══ UTILIZING AI ═══ */}
        <section className={styles.aiSection}>
          <div className={styles.sectionInner}>
            <ScrollReveal>
              <span className={styles.sectionNum}>03 | Utilizing AI</span>
              <h2 className={styles.sectionTitle}>
                Early concept meetings with external partners meant I had to jump immediately to high
                fidelity designs.
              </h2>
              <p className={styles.body}>
                Due to the quick turnaround time needed for these concepts, I used ChatGPT to help me
                get started.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className={styles.chatUI}>
                {/* User bubble — right */}
                <div className={styles.chatRow + ' ' + styles.chatRowUser}>
                  <div className={styles.chatBubbleUser}>
                    <p>
                      Vagaro is looking to partner with salon industry giants such as Sally Beauty and
                      CosmoProf. This integration would involve creating a more streamlined way for Vagaro
                      salons to purchase salon backbar products. The end user will be Vagaro salons, from
                      small solo-run salons to large multi-location salons. Think about how we can create
                      a product marketplace for these salon owners to browse products from these third
                      party vendors. Vagaro is looking to make some passive revenue from this partnership
                      as well as improve the current process of our users creating purchase orders. Create
                      a user flow for me using this context.
                    </p>
                  </div>
                  <div className={styles.chatAvatar + ' ' + styles.chatAvatarUser}>You</div>
                </div>

                {/* AI response — left */}
                <div className={styles.chatRow + ' ' + styles.chatRowAI}>
                  <div className={styles.chatAvatar + ' ' + styles.chatAvatarAI}>AI</div>
                  <div className={styles.chatBubbleAI}>
                    <div className={styles.chatAILabel}>ChatGPT</div>
                    <p>
                      Here's a full end-to-end user flow for the Vagaro Product Marketplace covering
                      <strong> discovery</strong>, <strong>browsing</strong>, <strong>purchasing</strong>,
                      and <strong>order tracking</strong> — tailored for both solo salon owners and
                      multi-location businesses…
                    </p>
                    <div className={styles.chatFlowSteps}>
                      {['Account Setup & Vendor Link', 'Browse Vendor Catalog', 'Add to Cart / Build PO', 'Checkout & Place Order', 'Order Confirmation & Tracking'].map((step, i) => (
                        <div key={step} className={styles.chatFlowStep}>
                          <span className={styles.chatFlowNum}>{i + 1}</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Response summary */}
                <div className={styles.chatSummary}>
                  <span className={styles.chatSummaryIcon}>💡</span>
                  <p>
                    ChatGPT helped generate a full end-to-end user flow covering discovery, browsing,
                    purchasing, and order tracking — giving me a strong foundation to build from and
                    adapt to Vagaro's specific needs.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <WaveDivider from="var(--cream)" to="var(--warm-white)" variant="ripple" />

        {/* ═══ USER INTERVIEWS ═══ */}
        <section className={styles.interviews}>
          <div className={styles.sectionInner}>
            <ScrollReveal>
              <span className={styles.sectionNum}>04 | User Interviews</span>
              <h2 className={styles.sectionTitle}>
                Hearing Directly from Salon Owners
              </h2>
              <p className={styles.body}>
                I had a gap in my knowledge of how salon owners actually go through with creating a
                Purchase Order, and when and where they would dropship products to customers. My goal
                was to build a tool they'd actually want to use, especially since most already had their
                own systems with third-party vendors.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className={styles.keyFinding}>
                <div className={styles.keyFindingIcon}>🔑</div>
                <div className={styles.keyFindingContent}>
                  <span className={styles.keyFindingLabel}>Key Finding</span>
                  <p className={styles.keyFindingText}>
                    Interviews revealed a huge factor: <strong>loyalty points!</strong> The salon owners
                    were super connected to their current vendors because they earn points for rewards.
                    This makes them really hesitant to jump ship and buy from different places.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <StaggerGroup className={styles.insightCards}>
              {[
                {
                  icon: '🔗',
                  title: 'Mandatory Vendor Login',
                  desc: 'To enable users to continue earning loyalty points, a mandatory login process is essential. Salon owners want to link their vendor account before making any purchase orders.',
                },
                {
                  icon: '📦',
                  title: 'Simple B2B2C Setup',
                  desc: "Businesses don't really care what products they dropship, they just want something easy to set up that will bring in passive income.",
                },
              ].map(insight => (
                <StaggerItem key={insight.title}>
                  <motion.div
                    className={styles.insightCard}
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                  >
                    <span className={styles.insightIcon}>{insight.icon}</span>
                    <h3 className={styles.insightTitle}>{insight.title}</h3>
                    <p className={styles.insightDesc}>{insight.desc}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        <WaveDivider from="var(--warm-white)" to="#FFF0E6" variant="melt" />

        {/* ═══ WORKING WITH DEVELOPMENT ═══ */}
        <section className={styles.devSection}>
          <div className={styles.sectionInner}>
            <ScrollReveal>
              <span className={styles.sectionNum}>05 | Working with Development</span>
              <h2 className={styles.sectionTitle}>
                Collaborating with engineering to design for API requirements
              </h2>
              <p className={styles.body}>
                To make sure my designs were actually buildable, I had weekly syncs with an engineer.
                Every little design change had implications for the APIs, so this constant back-and-forth
                was essential for both of us.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className={styles.devCallout}>
                <div className={styles.devCalloutIcon}>⚙️</div>
                <p className={styles.devCalloutText}>
                  For example, a seemingly simple refund flow required a detailed outline of all the API
                  calls involved. Next to my normal design annotations, I included clear, step-by-step
                  guidelines for every API call between Vagaro and the vendor.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className={styles.apiFlow}>
                <div className={styles.apiFlowLabel}>Sample API Annotation</div>
                <div className={styles.apiSteps}>
                  {[
                    { step: 'POST /orders/create', note: 'Vagaro sends order payload to vendor API' },
                    { step: 'GET /orders/{id}/status', note: 'Poll vendor for fulfillment status' },
                    { step: 'POST /returns/initiate', note: 'Trigger return with vendor-specific policy params' },
                    { step: 'PATCH /orders/{id}/refund', note: 'Update Vagaro order state on vendor confirmation' },
                  ].map((api, i) => (
                    <div key={i} className={styles.apiStep}>
                      <span className={styles.apiMethod}>{api.step}</span>
                      <span className={styles.apiNote}>{api.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <WaveDivider from="#FFF0E6" to="var(--cream)" variant="ripple" />

        {/* ═══ SYSTEM THINKING ═══ */}
        <section className={styles.systemSection}>
          <div className={styles.sectionInner}>
            <ScrollReveal>
              <span className={styles.sectionNum}>06 | System Thinking</span>
              <h2 className={styles.sectionTitle}>
                Anticipating Edge Cases and Future Growth
              </h2>
              <p className={styles.body}>
                Having to account for both B2B and B2B2C flows as well as keeping in mind that different
                vendors might have different opinions, I spent a lot of time fully anticipating any and
                all edge cases.
              </p>
            </ScrollReveal>

            <StaggerGroup className={styles.edgeGrid}>
              {[
                {
                  icon: '🤖',
                  title: 'AI Product Search',
                  desc: 'Utilizing AI Tools to search for products outside of our immediate catalog. I advocated for the adoption of AI tools like ChatGPT to recognize products beyond our immediate database, setting us up for future expansion.',
                },
                {
                  icon: '↩️',
                  title: 'Return Flow Variations',
                  desc: "Return flows differ based on each vendor's return policy. Where does the product go — back to the salon or directly to the vendor? What about vendors with strict no-return policies? I created a flowchart to identify what flow to follow based on different vendors' return policies.",
                },
                {
                  icon: '📦',
                  title: 'Multi-Vendor Orders',
                  desc: 'End users might get confused if one order results in multiple receipts. While we would track shipments separately on the backend, the user would ultimately still see the separate shipments as the same order.',
                },
              ].map(edge => (
                <StaggerItem key={edge.title}>
                  <motion.div
                    className={styles.edgeCard}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                  >
                    <span className={styles.edgeIcon}>{edge.icon}</span>
                    <h3 className={styles.edgeTitle}>{edge.title}</h3>
                    <p className={styles.edgeDesc}>{edge.desc}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerGroup>

            {/* CSS Flowchart — Return Flow */}
            <ScrollReveal delay={0.15}>
              <div className={styles.flowchartWrap}>
                <div className={styles.flowchartLabel}>Return Flow Diagram</div>
                <div className={styles.flowchart}>

                  {/* Start node */}
                  <div className={styles.flowRow}>
                    <div className={`${styles.flowNode} ${styles.flowNodeStart}`}>
                      Customer Initiates Return
                    </div>
                  </div>

                  <div className={styles.flowConnector} />

                  {/* Decision 1 */}
                  <div className={styles.flowRow}>
                    <div className={`${styles.flowNode} ${styles.flowNodeDecision}`}>
                      Does vendor have return requirements?
                    </div>
                  </div>

                  {/* Branch row */}
                  <div className={styles.flowBranchLine}>
                    <div className={styles.flowBranchLeft} />
                    <div className={styles.flowBranchRight} />
                  </div>

                  <div className={styles.flowBranchRow}>
                    {/* YES branch */}
                    <div className={styles.flowBranch}>
                      <span className={styles.flowBranchLabel}>Yes</span>
                      <div className={styles.flowConnector} />
                      <div className={`${styles.flowNode} ${styles.flowNodeDecision}`}>
                        Does vendor require physical return?
                      </div>
                      <div className={styles.flowBranchLine}>
                        <div className={styles.flowBranchLeft} />
                        <div className={styles.flowBranchRight} />
                      </div>
                      <div className={styles.flowBranchRow}>
                        <div className={styles.flowBranch}>
                          <span className={styles.flowBranchLabel}>Yes</span>
                          <div className={styles.flowConnector} />
                          <div className={`${styles.flowNode} ${styles.flowNodeAction}`}>
                            Customer ships to vendor
                          </div>
                        </div>
                        <div className={styles.flowBranch}>
                          <span className={styles.flowBranchLabel}>No</span>
                          <div className={styles.flowConnector} />
                          <div className={`${styles.flowNode} ${styles.flowNodeDecision}`}>
                            Does vendor accept?
                          </div>
                          <div className={styles.flowBranchLine}>
                            <div className={styles.flowBranchLeft} />
                            <div className={styles.flowBranchRight} />
                          </div>
                          <div className={styles.flowBranchRow}>
                            <div className={styles.flowBranch}>
                              <span className={styles.flowBranchLabel}>Yes</span>
                              <div className={styles.flowConnector} />
                              <div className={`${styles.flowNode} ${styles.flowNodeSuccess}`}>
                                Customer Refunded
                              </div>
                            </div>
                            <div className={styles.flowBranch}>
                              <span className={styles.flowBranchLabel}>No</span>
                              <div className={styles.flowConnector} />
                              <div className={`${styles.flowNode} ${styles.flowNodeFail}`}>
                                Customer NOT Refunded
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* NO branch — placeholder */}
                    <div className={styles.flowBranch}>
                      <span className={styles.flowBranchLabel}>No</span>
                      <div className={styles.flowConnector} />
                      <div className={`${styles.flowNode} ${styles.flowNodeFail}`}>
                        Return Not Eligible
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <WaveDivider from="var(--cream)" to="var(--warm-white)" variant="drip" />

        {/* ═══ FINAL DESIGNS ═══ */}
        <section className={styles.finalSection}>
          <div className={styles.sectionInner}>
            <ScrollReveal>
              <span className={styles.sectionNum}>07 | Final Designs</span>
              <h2 className={styles.sectionTitle}>Product Marketplace</h2>
              <p className={styles.body}>
                The final designs delivered a seamless commerce experience — from browsing a vendor's
                catalog, to placing multi-vendor orders, to handling returns across different vendor
                policies.
              </p>
            </ScrollReveal>

            <StaggerGroup className={styles.finalScreens}>
              {[
                { label: 'Vendor Browse', sub: 'Filter by vendor, category, or brand' },
                { label: 'Product Detail', sub: 'Loyalty points info + vendor link status' },
                { label: 'Multi-Vendor Cart', sub: 'Grouped by vendor · separate shipments' },
                { label: 'Order Tracking', sub: 'Unified view across vendor shipments' },
              ].map(screen => (
                <StaggerItem key={screen.label}>
                  <motion.div
                    className={styles.finalScreen}
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                  >
                    <div className={styles.finalScreenPlaceholder}>
                      <span className={styles.finalScreenName}>{screen.label}</span>
                    </div>
                    <div className={styles.finalScreenMeta}>
                      <span className={styles.finalScreenLabel}>{screen.label}</span>
                      <span className={styles.finalScreenSub}>{screen.sub}</span>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        <WaveDivider from="var(--warm-white)" to="var(--cream)" variant="ripple" />

        {/* ═══ CTA ═══ */}
        <section className={styles.cta}>
          <ScrollReveal>
            <div className={styles.ctaInner}>
              <p className={styles.ctaEnjoy}>Enjoyed reading my case study?</p>
              <p className={styles.ctaSub}>You can find me at my socials below!</p>
              <div className={styles.ctaLinks}>
                <motion.a
                  href="https://linkedin.com"
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
