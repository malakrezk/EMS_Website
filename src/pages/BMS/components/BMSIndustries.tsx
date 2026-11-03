import { HiOutlineArrowUpRight } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import Container from '../../../components/layout/Container'
import Reveal from '../../../components/ui/Reveal'
import { bmsIndustries } from '../BMS.data'

export default function BMSIndustries() {
  return <section className="bms-section" aria-labelledby="bms-industries-title"><Container>
    <Reveal className="bms-section-intro"><div><p className="bms-label">03 / INDUSTRIES</p><h2 id="bms-industries-title" className="bms-heading">Smart Building Solutions<br /><span>Across Industries</span></h2></div><p>Our building automation and integration solutions support a wide range of modern facilities and infrastructure environments.</p></Reveal>
    <div className="bms-industries-grid">{bmsIndustries.map(({ title, label, image, icon: Icon, to, alt }, index) => <Reveal key={title} delay={(index % 3) * .05}>
      <Link className="bms-industry-card" to={to}><img src={image} alt={alt} width={800} height={600} loading="lazy" decoding="async" /><div className="bms-industry-shade" /><span className="bms-industry-number">0{index + 1} / <Icon aria-hidden="true" /></span><div className="bms-industry-copy"><p>{label}</p><h3>{title}</h3><span>Explore industry <HiOutlineArrowUpRight aria-hidden="true" /></span></div></Link>
    </Reveal>)}</div>
  </Container></section>
}
