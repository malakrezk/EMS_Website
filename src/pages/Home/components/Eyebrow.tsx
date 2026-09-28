

export default function Eyebrow({ children, className = '' }: React.PropsWithChildren<{ className?: string }>) {
  return <p className={`section-eyebrow font-mono text-[clamp(.72rem,1vw,.9rem)] font-semibold uppercase tracking-[.3em] text-paint-primary ${className}`}>{children}</p>
}
