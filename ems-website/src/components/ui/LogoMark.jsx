/**
 * Abstract "skyline" logomark — a cluster of building silhouettes of varying
 * heights inside a bordered frame. Used as the icon half of the EMS wordmark
 * in the navbar and footer.
 */
export default function LogoMark({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="15" width="4.5" height="17" rx="0.5" fill="currentColor" opacity="0.55" />
      <rect x="14.5" y="8" width="4.5" height="24" rx="0.5" fill="currentColor" />
      <rect x="21" y="18" width="4.5" height="14" rx="0.5" fill="currentColor" opacity="0.7" />
      <rect x="27.5" y="11" width="4" height="21" rx="0.5" fill="currentColor" opacity="0.9" />
      <line x1="6" y1="32.5" x2="34" y2="32.5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    </svg>
  )
}
