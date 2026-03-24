/**
 * HomePage
 * Sections: Hero → Work → Art.
 * Hero fades into Work via a soft gradient. Work → Art uses an organic wave.
 * A cat runs along the bottom edge tracking scroll.
 */
import PageTransition from '../components/PageTransition'
import HeroSection from '../components/sections/HeroSection'
import WorkSection from '../components/sections/WorkSection'
import ArtSection from '../components/sections/ArtSection'
import WaveDivider from '../components/WaveDivider'
import RunningCat from '../components/RunningCat'

export default function HomePage() {
  return (
    <PageTransition>
      <HeroSection />
      {/* Soft gradient — no hard edge between hero and work */}
      <div style={{ height: '100px', background: 'linear-gradient(to bottom, #FFFBF0, #FDFAF4)', marginTop: '-2px' }} />
      <WorkSection />
      <WaveDivider from="#FDFAF4" to="#FFF3E4" variant="drip" />
      <ArtSection />
      <RunningCat />
    </PageTransition>
  )
}
