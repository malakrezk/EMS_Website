import { useState } from 'react'
import { HiOutlineArrowRight } from 'react-icons/hi2'
import Container from '../../../components/layout/Container'
import Reveal from '../../../components/ui/Reveal'
import { bmsTechnologies } from '../BMS.data'

export default function BMSTechnologyDiagram() {
  const [selected, setSelected] = useState(0)
  const active = bmsTechnologies[selected]
  return <section className="bms-section bms-intelligence" aria-labelledby="bms-intelligence-title"><Container>
    <Reveal className="bms-intelligence-intro"><p className="bms-label">04 / CONNECTED INTELLIGENCE</p><h2 id="bms-intelligence-title" className="bms-heading">From Building Automation<br /><span>to Intelligent Operations</span></h2><p>A modern Building Management System can provide more than centralized monitoring. When supported by compatible systems and properly structured data, BMS can become part of a broader digital operations environment.</p></Reveal>
    <Reveal><div className="bms-tech-flow" role="group" aria-label="Explore connected technology opportunities">{bmsTechnologies.map(({ id, title, icon: Icon }, index) => <div className="bms-tech-step" key={id}>
      <button type="button" aria-pressed={selected === index} aria-controls="bms-tech-description" onMouseEnter={() => setSelected(index)} onFocus={() => setSelected(index)} onClick={() => setSelected(index)}><span className="bms-tech-index">0{index + 1}</span><Icon aria-hidden="true" /><span>{title}</span></button>{index < bmsTechnologies.length - 1 && <span className="bms-tech-connector" aria-hidden="true"><HiOutlineArrowRight /></span>}
    </div>)}</div>
    <div id="bms-tech-description" className="bms-tech-description" aria-live="polite" aria-atomic="true"><div><active.icon aria-hidden="true" /><h3>{active.title}</h3></div><p>{active.text}<span>{active.detail}</span></p></div>
    <div className="bms-tech-context"><p>EMS helps project stakeholders evaluate integration opportunities involving BMS, SCADA, IoT, AI analytics, and Digital Twin technologies. The appropriate architecture depends on existing infrastructure, system compatibility, interfaces, and technical requirements.</p><p>This diagram illustrates possible integration opportunities, not a mandatory sequential architecture. Not every EMS BMS project includes all five technologies.</p></div>
    </Reveal>
  </Container></section>
}
