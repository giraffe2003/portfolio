/**
 * WorkSection
 * A grid of 3 project cards — each deliberately different in shape, color, and layout.
 */
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ScrollReveal, StaggerGroup, StaggerItem } from '../ScrollReveal'
import ipPromo from '../../assets/ip.jpg'
import dashPromo from '../../assets/dashboard-promo.jpg'
import marketplacePromo from '../../assets/marketplace-promo.jpg'
import styles from './WorkSection.module.css'

const PROJECTS = [
  {
    id: 1,
    title: 'Instant Payout',
    category: 'Fintech · Mobile',
    description: 'Giving workers access to their earned wages immediately — redesigning the payout experience from the ground up.',
    accent: 'var(--yellow-warm)',
    accentDark: '#C8920A',
    shape: 'rounded',
    tag: 'Case Study',
    href: '/instant-payout',
    image: ipPromo,
  },
  {
    id: 2,
    title: 'Dashboard Redesign',
    category: 'Reports · Mobile',
    description: "Leveraging AI prototyping tools to redesign Vagaro's homepage — reducing cognitive load and surfacing high-priority business insights.",
    accent: 'var(--blush)',
    accentDark: '#D4746A',
    shape: 'tall',
    tag: 'Case Study',
    href: '/dashboard',
    image: dashPromo,
  },
  {
    id: 3,
    title: 'Product Marketplace',
    category: 'Commerce · B2B',
    description: 'Building a commerce ecosystem for beauty industry vendors — from API design to multi-vendor edge cases.',
    accent: 'var(--peach)',
    accentDark: '#B06030',
    shape: 'circle-corner',
    tag: 'Case Study',
    href: '/product-marketplace',
    image: marketplacePromo,
  },
]

function ProjectCard({ project, index }) {
  const Wrapper = project.href ? Link : 'div'
  return (
    <StaggerItem>
      <motion.article
        className={`${styles.card} ${styles[`card--${project.shape}`]}`}
        style={{ '--accent': project.accent, '--accent-dark': project.accentDark }}
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
        role={project.href ? 'link' : undefined}
        tabIndex={project.href ? 0 : undefined}
      >
        <Wrapper to={project.href} style={{ display: 'contents' }}>
          {/* Image area */}
          <div className={styles.cardImage}>
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className={styles.cardImagePhoto}
              />
            ) : (
              <div className={styles.cardImageInner}>
                <span className={styles.projectNumber}>0{project.id}</span>
              </div>
            )}
          </div>
          <div className={styles.cardBody}>
            <span className={styles.tag}>{project.tag}</span>
            <h3 className={styles.cardTitle}>{project.title}</h3>
            <p className={styles.cardCategory}>{project.category}</p>
            <p className={styles.cardDesc}>{project.description}</p>
            <motion.span
              className={styles.cardCta}
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              View case study →
            </motion.span>
          </div>
        </Wrapper>
      </motion.article>
    </StaggerItem>
  )
}

export default function WorkSection() {
  return (
    <section id="work" className={styles.section}>
      <div className={styles.inner}>
        <ScrollReveal>
          <div className={styles.header}>
            <h2 className={styles.sectionTitle}>Selected work</h2>
            <p className={styles.sectionSub}>
              Projects I've poured my heart (and many iterations) into.
            </p>
          </div>
        </ScrollReveal>

        <StaggerGroup className={styles.grid}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
