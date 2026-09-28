import Container from '../../../components/layout/Container'
import '../About.css'
import { statistics } from '../About.data'
import SectionHeading from '../components/SectionHeading'
import Stat from '../components/Stat'

export default function TrackRecordSection() {
  return (
    <section className="section-padding about-section-rule border-y">
      <Container className=""><SectionHeading eyebrow="03 / Track record" title="Experience built through deliberate evolution." text="Our existing milestones reflect how EMS has grown from engineering delivery into connected operational intelligence." center />
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4">{statistics.map(stat => <Stat key={stat.label} {...stat} />)}</div>
      </Container>
    </section>
  )
}
