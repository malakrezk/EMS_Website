import type { ReactNode } from 'react'
import Reveal from '../../../components/ui/Reveal'
import { cn } from '../../../utils/cn'

interface SectionHeadingProps {
  id: string
  label: string
  title: ReactNode
  intro?: string
  className?: string
}

export default function SectionHeading({ id, label, title, intro, className }: SectionHeadingProps) {
  return (
    <Reveal className={cn('about-heading', className)}>
      <p className="eyebrow about-label"><span aria-hidden="true" className="about-label-rule" />{label}</p>
      <h2 id={id} className="about-title about-display">{title}</h2>
      {intro && <p className="about-intro">{intro}</p>}
    </Reveal>
  )
}
