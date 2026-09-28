

import Eyebrow from './Eyebrow'

export default function SectionTitle({ eyebrow, title, text, align = 'left' }: { eyebrow: string; title: React.ReactNode; text?: string; align?: 'left' | 'center' }) {
  return <div className={`home-reveal home-section-heading max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 className="home-section-title mt-5 font-serif leading-[.98] tracking-[-.025em] text-white">{title}</h2>
    {text && <p className={`home-section-copy section-copy mt-6 max-w-2xl leading-7 text-slate-400 ${align === 'center' ? 'mx-auto' : ''}`}>{text}</p>}
  </div>
}
