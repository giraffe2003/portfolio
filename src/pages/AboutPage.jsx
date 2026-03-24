/**
 * AboutPage — Angela's story, told with warmth and honesty.
 * Sections:
 *   - Hero intro (photo + headline)
 *   - Story
 *   - Wave divider
 *   - Creative endeavors
 *   - LinkedIn CTA
 */
import PageTransition from '../components/PageTransition'
import { motion } from 'framer-motion'
import { ScrollReveal, StaggerGroup, StaggerItem } from '../components/ScrollReveal'
import CatSVG from '../components/CatSVG'
import WaveDivider from '../components/WaveDivider'
import me1 from '../assets/me-1.jpg'
import me2 from '../assets/me-2.jpg'
import me3 from '../assets/me-3.jpg'
import me4 from '../assets/me-4.jpg'
import styles from './AboutPage.module.css'

const CREATIVE_ENDEAVORS = [
  {
    icon: '🐱',
    title: 'Cat character art',
    desc: 'I draw a cast of chubby, expressive cat characters inspired by my own cat. Each one has a distinct personality — and an uncanny ability to end up in sticker form.',
    accent: 'var(--yellow-pale)',
  },
  {
    icon: '🛍️',
    title: 'Small art business',
    desc: 'I run a small online shop selling prints, stickers, and art goods. Everything from product photography to packaging design is handled by me — it\'s a one-woman operation and I love it.',
    accent: 'var(--blush-light)',
  },
  {
    icon: '✏️',
    title: 'Sketchbooks & illustration',
    desc: 'Sketchbooks are where I think out loud. I keep several going at once — some for character development, some for loose observational drawing, and some that are basically just lists with doodles.',
    accent: 'var(--peach)',
  },
  {
    icon: '🌱',
    title: 'Side projects',
    desc: 'I\'m almost always in the middle of something new — a zine concept, a new art series, a personal design challenge. I find that making things outside of work keeps me sharper inside it.',
    accent: 'var(--yellow-pale)',
  },
]

export default function AboutPage() {
  return (
    <PageTransition>
      <main className={styles.page}>

        {/* ── Intro Hero ── */}
        <section className={styles.intro}>
          <div className={styles.introInner}>
            {/* Photo */}
            <ScrollReveal>
              <div className={styles.photoWrap}>
                <img
                  src="/angela.jpg"
                  alt="Angela"
                  className={styles.photo}
                />
                <div className={styles.photoBlob} />
              </div>
            </ScrollReveal>

            {/* Text */}
            <div className={styles.introText}>
              <ScrollReveal delay={0.1}>
                <h1 className={styles.headline}>
                  Hi, I'm Angela —<br />
                  <em>designer, artist,</em>
                  <br />
                  and a cat enthusiast.
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className={styles.intro1}>
                  My strength lies in my rapid-fire ability to iterate on new designs and to break complex, ambiguous problems down to tangible ideas.
                </p>
                <p className={styles.intro1}>
                  I bring a strong eye for detail, a collaborative spirit, and a desire to innovate to every project — designing fintech tools like Instant Payout or incorporating new AI tools and trends into my workflow!
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ── Story ── */}
        <section className={styles.story}>
          <div className={styles.storyInner}>
            <ScrollReveal delay={0.25}>
              <p className={styles.storyPara}>
                I care a lot about that moment when something goes from "it works"
                to "it actually feels good to use."
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className={`${styles.storyPara} ${styles.storyParaBig}`}>
                That difference is what excites me about design.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.25}>
              <p className={styles.storyPara}>
                My desire to be better applies to my work, my hobbies, and everything that I pursue in life.
                Nothing is ever quite done. When I'm not
                designing, I'm running my small art
                business, getting into ballet as an adult, and almost certainly planning too many side projects. 
              </p>
            </ScrollReveal>
          </div>
        </section>

        <WaveDivider from="var(--cream)" to="#FFF3E4" variant="drip" />

        {/* ── Creative Endeavors ── */}
        <section className={styles.creative}>
          <div className={styles.creativeInner}>
            <ScrollReveal>
              <span className={styles.eyebrow}>✦ beyond the day job</span>
              <h2 className={styles.sectionTitle}>Creative endeavors</h2>
              <p className={styles.sectionSub}>
                Making things is how I stay sane, stay curious, and stay me.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className={styles.mediaGrid}>
                {/* Print — left, spans both rows */}
                <motion.div
                  className={`${styles.mediaItem} ${styles.mediaPrint}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                >
                  <img src={me2} alt="Holding an original art print" className={styles.mediaImg} />
                  <span className={styles.mediaCaption}>original art print — train crossing scene</span>
                </motion.div>

                {/* Video — top middle, shorter */}
                <motion.div
                  className={`${styles.mediaItem} ${styles.mediaVideo}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                >
                  <video
                    src="/me-video.mov"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={styles.mediaImg}
                  />
                  <span className={styles.mediaCaption}>mass printing stickers a day before</span>
                </motion.div>

                {/* Animal Crossing — top right */}
                <motion.div
                  className={`${styles.mediaItem} ${styles.mediaAc}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                >
                  <img src={me4} alt="Animal Crossing" className={styles.mediaImg} />
                  <span className={styles.mediaCaption}>animal crossing is serious business</span>
                </motion.div>

                {/* Ballet — bottom middle, wider (spans 2 cols) */}
                <motion.div
                  className={`${styles.mediaItem} ${styles.mediaBallet}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                >
                  <img src={me1} alt="Ballet class" className={styles.mediaImg} />
                  <span className={styles.mediaCaption}>adult ballet — still learning</span>
                </motion.div>

                {/* Matcha — bottom right */}
                <motion.div
                  className={`${styles.mediaItem} ${styles.mediaMatcha}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                >
                  <img src={me3} alt="Iced matcha drinks" className={styles.mediaImg} />
                  <span className={styles.mediaCaption}>my other hobby is finding matcha</span>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <WaveDivider from="#FFF3E4" to="var(--cream)" variant="melt" />

        {/* ── LinkedIn CTA ── */}
        <section className={styles.connect}>
          <ScrollReveal>
            <div className={styles.connectInner}>
              <div>
                <h2 className={styles.connectTitle}>Want to work together?</h2>
                <p className={styles.connectSub}>
                  I'm always open to thoughtful conversations about design, collaboration, or just swapping cat photos.
                </p>
              </div>
              <motion.a
                href="https://www.linkedin.com/in/angela-wu-ux/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkedinBtn}
                whileHover={{ scale: 1.07, y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 16 }}
              >
                let's connect! ✨
              </motion.a>
            </div>
          </ScrollReveal>
        </section>

      </main>
    </PageTransition>
  )
}
