import { HiOutlineCheck } from 'react-icons/hi2'
import Container from '../../../components/layout/Container'
import Reveal from '../../../components/ui/Reveal'
import { images } from '../../../constants/images'
import { bmsAdvantages } from '../BMS.data'

export default function BMSWhyEMS() {
  return <section className="bms-section bms-why" aria-labelledby="bms-why-title"><Container className="bms-split">
    <Reveal className="bms-why-image"><img src={images.heroControlRoom03} alt="Engineering control room with integrated infrastructure monitoring displays" width={900} height={1100} loading="lazy" decoding="async" /><div /><p>THE ENGINEERING<br /><span>BEHIND THE INTELLIGENCE.</span></p></Reveal>
    <div><Reveal><p className="bms-label">05 / WHY EMS</p><h2 id="bms-why-title" className="bms-heading">Engineering Expertise.<br /><span>Connected Solutions.</span></h2></Reveal><div className="bms-advantages">{bmsAdvantages.map(({ title, text }, index) => <Reveal key={title} delay={index * .04}><div className="bms-advantage"><span><HiOutlineCheck aria-hidden="true" /></span><div><h3>{title}</h3><p>{text}</p></div></div></Reveal>)}</div></div>
  </Container></section>
}
