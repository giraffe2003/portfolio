/**
 * WaveDivider
 * Organic wavy SVG divider between sections.
 * `from` = background color of section above
 * `to`   = background color of section below
 * `variant` = 'melt' | 'drip' | 'ripple'
 */

const PATHS = {
  // Gentle melt — hero → work
  melt: 'M0,45 C180,85 360,10 540,50 C720,90 900,20 1080,52 C1200,72 1320,28 1440,48 L1440,100 L0,100 Z',
  // More dramatic organic drip — work → art
  drip: 'M0,25 C80,65 160,5 280,42 Q400,80 520,35 C630,5 730,55 860,32 Q990,8 1100,48 C1210,75 1320,22 1440,40 L1440,100 L0,100 Z',
  // Ripple — for future use
  ripple: 'M0,35 Q120,70 240,35 Q360,0 480,38 Q600,76 720,38 Q840,0 960,38 Q1080,76 1200,38 Q1320,0 1440,35 L1440,100 L0,100 Z',
}

export default function WaveDivider({ from, to, variant = 'melt' }) {
  return (
    <div style={{ background: from, lineHeight: 0, display: 'block', marginBottom: '-2px' }}>
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: '80px' }}
        aria-hidden="true"
      >
        <path d={PATHS[variant]} fill={to} />
      </svg>
    </div>
  )
}
