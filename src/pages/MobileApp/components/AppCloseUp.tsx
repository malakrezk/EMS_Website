import type { CSSProperties } from 'react'
import type { AppImage } from '../MobileApp.data'

/** A card or panel cut from the real app, framed so it can float beside a phone or fill a panel. */
export default function AppCloseUp({ image, className = '', style, loading = 'lazy' }: { image: AppImage; className?: string; style?: CSSProperties; loading?: 'eager' | 'lazy' }) {
  return (
    <figure className={`app-closeup ${className}`} style={style}>
      <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading={loading} decoding="async" draggable={false} />
    </figure>
  )
}
