

export default function SectionIntro({ number: _number, label, title, text, align = 'left', compact = false }: { number?: string; label?: string; title: React.ReactNode; text?: string; align?: 'left' | 'center'; compact?: boolean }) {
  return (
    <div className={`solutions-reveal ${align === 'center' ? 'mx-auto max-w-4xl text-center' : compact ? 'max-w-sm' : 'max-w-4xl'}`}>
      {label && <p className="section-eyebrow">{label}</p>}
      <h2 className={`mt-2 font-serif font-medium leading-[1.06] tracking-[-.03em] text-white ${compact ? 'text-[clamp(1.3rem,1.9vw,1.7rem)]' : 'text-[clamp(2.65rem,5vw,5.15rem)] leading-[.95]'}`}>{title}</h2>
      {text && <p className={`mt-3 ${align === 'center' ? 'mx-auto' : ''} ${compact ? 'max-w-sm text-[13px] leading-6 text-paint-muted' : 'section-copy max-w-2xl'}`}>{text}</p>}
    </div>
  )
}
