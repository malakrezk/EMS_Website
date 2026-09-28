

export default function SectionIntro({ number: _number, label, title, text, align = 'left' }: { number?: string; label?: string; title: React.ReactNode; text?: string; align?: 'left' | 'center' }) {
  return (
    <div className={`solutions-reveal ${align === 'center' ? 'mx-auto max-w-4xl text-center' : 'max-w-4xl'}`}>
      {label && <p className="section-eyebrow">{label}</p>}
      <h2 className="mt-5 font-serif text-[clamp(2.65rem,5vw,5.15rem)] font-medium leading-[.95] tracking-[-.04em] text-white">{title}</h2>
      {text && <p className={`section-copy mt-6 max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}>{text}</p>}
    </div>
  )
}
