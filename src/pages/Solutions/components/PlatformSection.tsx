import Container from '../../../components/layout/Container'
import { images } from '../../../constants/images'
import '../Solutions.css'
import { approach } from '../Solutions.data'
import SectionIntro from '../components/SectionIntro'

export default function PlatformSection() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 py-[clamp(3.5rem,6vw,5.5rem)]">
      {/* Background image like Home services section */}
      <img src={images.heroControlRoom02} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[.22]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,rgba(11,50,81,.28),transparent_58%),linear-gradient(90deg,rgba(3,8,22,.72),rgba(7,23,51,.38)_50%,rgba(3,8,22,.72))]" />
      <Container className="relative z-10">
        <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end lg:gap-20">
          <SectionIntro compact number="02" label="Our solution approach" title="Engineered as one connected system." text="We begin with the operation—not the product. Every layer is then designed around performance, resilience and the people responsible for both." />
          <div className="solutions-photo-rail solutions-reveal relative aspect-[1365/768] overflow-hidden border border-white/10">
            <img src={images.solutionsApproachDashboard} alt="EMS monitoring dashboard for the Investors-Ext sewage lifting station, showing energy, pumps, flow and sump levels" width={1365} height={768} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-paint-navy/45 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 border-l border-paint-accent bg-paint-navy/75 px-4 py-3 backdrop-blur"><p className="font-mono text-[8px] uppercase tracking-[.2em] text-paint-accent">EMS integration layer</p><p className="mt-1 text-xs text-white/70">Field to dashboard. Signal to decision.</p></div>
          </div>
        </div>

        <div className="solutions-approach-track relative mt-12 lg:mt-16">
          <div aria-hidden="true" className="solutions-approach-rail">
            <span className="solutions-approach-progress" />
            <span className="solutions-approach-pulse" />
          </div>
          <ol className="relative grid gap-2 md:grid-cols-4 md:gap-6 lg:gap-10">
            {approach.map((step) => (
              <li key={step.title} className="solutions-approach-step group relative grid grid-cols-[48px_1fr] gap-5 py-5 md:block md:py-0">
                <span className="solutions-approach-marker relative z-10 flex h-12 w-12 items-center justify-center rounded-full border bg-paint-navy font-mono text-[9px]">{step.number}</span>
                <div className="md:mt-7">
                  <p className="font-mono text-[8px] uppercase tracking-[.2em] text-white/30">Phase {step.number}</p>
                  <h3 className="solutions-approach-title mt-2 font-serif text-[clamp(1.5rem,2vw,2.1rem)] leading-[1.08] tracking-[-.03em] transition-colors duration-500 group-hover:text-paint-accent">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-paint-muted">{step.text}</p>
                  <div className="mt-4 h-px w-10 bg-paint-accent/50 transition-all duration-700 group-hover:w-full" />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
