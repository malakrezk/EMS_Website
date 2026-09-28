import Container from '../../../components/layout/Container'
import { images } from '../../../constants/images'
import '../Solutions.css'
import { approach } from '../Solutions.data'
import SectionIntro from '../components/SectionIntro'

export default function PlatformSection() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 py-[clamp(5.5rem,10vw,9rem)]">
      {/* Background image like Home services section */}
      <img src={images.heroControlRoom02} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[.22]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(11,50,81,.22),transparent_48%),linear-gradient(90deg,rgba(2,8,18,.96),rgba(2,8,18,.62)_50%,rgba(2,8,18,.96))]" />
      <Container className="grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-20 relative z-10">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionIntro number="02" label="Our solution approach" title="Engineered as one connected system." text="We begin with the operation—not the product. Every layer is then designed around performance, resilience and the people responsible for both." />
          <div className="solutions-photo-rail solutions-reveal relative mt-10 aspect-[1.45/1] overflow-hidden border border-white/10">
            <img src={images.heroControlRoom03} alt="EMS integrated engineering control environment" loading="lazy" className="solutions-parallax absolute inset-0 h-[115%] w-full object-cover opacity-75" />
            <div className="absolute inset-0 bg-gradient-to-t from-paint-navy/80 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 border-l border-paint-accent bg-paint-navy/75 px-4 py-3 backdrop-blur"><p className="font-mono text-[8px] uppercase tracking-[.2em] text-paint-accent">EMS integration layer</p><p className="mt-1 text-xs text-white/70">Field to dashboard. Signal to decision.</p></div>
          </div>
        </div>
        <div className="solutions-approach-line relative space-y-3">
          {approach.map((step) => (
            <article key={step.title} className="solutions-reveal group relative grid min-h-44 grid-cols-[40px_1fr] gap-6 border-b border-white/10 py-8 last:border-b-0 sm:grid-cols-[48px_1fr] sm:gap-8 sm:py-10">
              <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-paint-accent/40 bg-paint-navy font-mono text-[8px] text-paint-accent sm:h-12 sm:w-12">{step.number}</span>
              <div><p className="font-mono text-[8px] uppercase tracking-[.2em] text-white/30">Phase {step.number}</p><h3 className="mt-3 font-serif text-[clamp(1.8rem,2.8vw,2.8rem)] tracking-[-.03em] transition group-hover:text-paint-accent">{step.title}</h3><p className="mt-4 max-w-xl text-sm leading-7 text-paint-muted">{step.text}</p><div className="mt-6 h-px w-10 bg-paint-accent/50 transition-all duration-700 group-hover:w-full" /></div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
