import type { CSSProperties } from 'react'
import TiltedCard, { TiltedCardLayer } from '../../../components/ui/TiltedCard'
import { images } from '../../../constants/images'

// Connector lines traced from the artwork (1536 × 1024): each runs from a system panel into the building.
const circuits = [
  { id: 'hvac', d: 'M 479 128 L 598 128 L 662 183', end: [662, 183] },
  { id: 'lighting', d: 'M 1152 192 L 1108 192 L 993 314', end: [993, 314] },
  { id: 'energy', d: 'M 402 426 L 487 426 L 560 490', end: [560, 490] },
  { id: 'security', d: 'M 1204 510 L 1150 510 L 1150 650', end: [1150, 650] },
  { id: 'monitoring', d: 'M 470 808 L 706 808 L 745 840', end: [745, 840] },
] as const
// The building's main riser, from the roof plant down to ground level.
const RISER = 'M 782 245 L 770 690'
const CYCLE = 2.6

// Tilt settings; TiltedCard oversizes its image by this bleed, and the overlay copies it to stay aligned.
const AMPLITUDE = 7
const PARALLAX = .8
const BLEED = Math.ceil(Math.sin(AMPLITUDE * Math.PI / 180) * 24 * PARALLAX) + 1

// Sparks drift up through the layer above the building, so they shift against it as the panel tilts.
const sparks = [
  [38, 30, 0], [47, 18, 1.4], [56, 26, 2.6], [63, 40, 0.8], [44, 52, 3.1],
  [70, 58, 1.9], [52, 66, 0.4], [60, 74, 2.2], [36, 64, 3.6], [67, 22, 4.2],
]

const timing = (index: number, duration = CYCLE): CSSProperties => ({ animationDelay: `${index * .52}s`, animationDuration: `${duration}s` })

export default function BMSBuildingVisual() {
  return <TiltedCard
    imageSrc={images.bmsControlHub}
    altText="Smart building control hub connecting HVAC, energy, lighting, security, and central monitoring"
    containerWidth="100%"
    containerHeight="auto"
    imageWidth="100%"
    imageHeight="100%"
    style={{ aspectRatio: '3 / 2' }}
    className="bms-building-card"
    rotateAmplitude={AMPLITUDE}
    scaleOnHover={1.02}
    perspective={1100}
    smoothness={.7}
    glare={.3}
    glareColor="#7fdcff"
    shadow={0}
    parallax={PARALLAX}
    floating
    gyroscope={false}
    showTooltip={false}
    flipOnClick={false}
    radius={18}
  >
    {/* Same depth as the artwork, so the current runs exactly along its printed lines. */}
    <TiltedCardLayer depth={-24} className="bms-circuit-layer" style={{ '--bleed': `${BLEED}px` } as CSSProperties}>
      <svg viewBox="0 0 1536 1024" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path d={RISER} className="bms-live" />
        <path d={RISER} pathLength={100} className="bms-current-glow" style={timing(0, 3.4)} />
        <path d={RISER} pathLength={100} className="bms-current" style={timing(0, 3.4)} />
        {circuits.map(({ id, d, end: [x, y] }, index) => <g key={id}>
          <path d={d} className="bms-live" style={{ animationDelay: `${index * .37}s` }} />
          <path d={d} pathLength={100} className="bms-current-glow" style={timing(index)} />
          <path d={d} pathLength={100} className="bms-current" style={timing(index)} />
          <circle cx={x} cy={y} r={7} className="bms-junction" />
          <circle cx={x} cy={y} r={7} className="bms-junction-flash" style={{ ...timing(index), transformOrigin: `${x}px ${y}px` }} />
        </g>)}
      </svg>
    </TiltedCardLayer>
    <TiltedCardLayer depth={40} className="bms-spark-layer">
      {sparks.map(([left, top, delay]) => <span key={`${left}-${top}`} style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${delay}s` }} />)}
    </TiltedCardLayer>
  </TiltedCard>
}
