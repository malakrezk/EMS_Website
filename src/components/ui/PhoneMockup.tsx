import type { CSSProperties, ReactNode } from 'react'
import './PhoneMockup.css'

interface PhoneMockupProps {
  /** The screen image. Leave it out to place your own content, such as stacked screens, in the screen. */
  src?: string
  alt?: string
  children?: ReactNode
  className?: string
  style?: CSSProperties
  loading?: 'eager' | 'lazy'
  /** Gives the frame a solid titanium edge, which shows once the phone is turned in 3D. */
  depth?: boolean
}

// Copies of the frame stacked behind it; each one sits a little deeper, and the middle ones catch more light.
const EDGE_LAYERS = 12
const edgeLayers = Array.from({ length: EDGE_LAYERS }, (_, index) => {
  const depth = (index + 1) / (EDGE_LAYERS + 1)
  return { '--edge': depth.toFixed(3), '--shine': (1 - Math.abs(depth - .5) * 2).toFixed(3) } as CSSProperties
})

/** A phone frame for app screenshots. Its size follows the inherited --phone-width custom property. */
export default function PhoneMockup({ src, alt = '', children, className = '', style, loading = 'lazy', depth = false }: PhoneMockupProps) {
  return (
    <div className={`phone-mockup ${depth ? 'has-depth' : ''} ${className}`} style={style}>
      {depth && edgeLayers.map((layer, index) => <span key={index} className="phone-mockup-edge" style={layer} aria-hidden="true" />)}
      <span className="phone-mockup-button is-action" aria-hidden="true" />
      <span className="phone-mockup-button is-volume-up" aria-hidden="true" />
      <span className="phone-mockup-button is-volume-down" aria-hidden="true" />
      <span className="phone-mockup-button is-power" aria-hidden="true" />
      <div className="phone-mockup-screen">
        {src ? <img src={src} alt={alt} width={390} height={868} loading={loading} decoding="async" draggable={false} /> : children}
      </div>
    </div>
  )
}
