/**
 * ArtSection — "Beyond the Screen"
 * Photo grid spotlighting Angela's art business (@orangchii).
 */
import { motion } from 'framer-motion'
import { ScrollReveal, StaggerGroup, StaggerItem } from '../ScrollReveal'
import art1 from '../../assets/art-1.jpg'
import art2 from '../../assets/art-2.jpg'
import art3 from '../../assets/art-3.jpg'
import styles from './ArtSection.module.css'

const PHOTOS = [
  { img: art1, caption: 'Acrylic keychains of silly cats!' },
  { img: art2, caption: 'A sticker collection of different animals' },
  { img: art3, caption: 'Tabling at an artist convention — prints, stickers, and way too much setup.' },
]

export default function ArtSection() {
  return (
    <section id="art" className={styles.section}>
      <div className={styles.inner}>
        <ScrollReveal>
          <span className={styles.eyebrow}>✦ in my free time</span>
          <h2 className={styles.title}>Beyond the screen</h2>
          <p className={styles.sub}>
            When I'm not designing products, I'm busy running a small art business.
          </p>
        </ScrollReveal>

        <StaggerGroup className={styles.photoGrid}>
          {PHOTOS.map((item, i) => (
            <StaggerItem key={i}>
              <motion.figure
                className={styles.photoCard}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              >
                <div className={styles.photoImgWrap}>
                  <img src={item.img} alt={item.caption} className={styles.photoImg} />
                </div>
                <figcaption className={styles.photoCaption}>{item.caption}</figcaption>
              </motion.figure>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
