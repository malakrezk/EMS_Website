

import Reveal from '../../../components/ui/Reveal'

export default function SectionHeading({ eyebrow, title, text, center = false }: { eyebrow: string; title: React.ReactNode; text?: string; center?: boolean }) {
  return (
    <Reveal className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="type-section-title mt-4 font-serif">{title}</h2>
      {text && <p className={`type-body mt-4 max-w-2xl text-slate-400 ${center ? 'mx-auto' : ''}`}>{text}</p>}
    </Reveal>
  )
}
