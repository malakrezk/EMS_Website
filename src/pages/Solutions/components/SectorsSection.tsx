import Container from '../../../components/layout/Container'
import '../Solutions.css'
import { sectors } from '../Solutions.data'
import SectionIntro from '../components/SectionIntro'
import SectorCard from '../components/SectorCard'

export default function SectorsSection() {
  return (
    <section className="solutions-sector-section relative overflow-hidden border-y border-white/10 py-[clamp(3rem,5vw,4.5rem)] lg:pb-[6rem]">
      <Container className="">
        <div className="solutions-sector-heading grid gap-6 text-center">
          <p className="solutions-reveal section-eyebrow">Solution Sectors</p>
          <SectionIntro title="Solutions Designed for Every Environment" align="center" />
          <p className="solutions-reveal mx-auto max-w-2xl text-sm leading-7 text-paint-muted">Six distinct operational environments, each supported by an EMS digital layer engineered around its infrastructure, systems and people.</p>
        </div>
        <div className="mt-8">{sectors.map((item, index) => <SectorCard key={item.id} item={item} index={index} />)}</div>
      </Container>
    </section>
  )
}
