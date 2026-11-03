import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, useState, type PointerEvent } from 'react'
import { HiOutlineArrowUpRight, HiOutlineMinus } from 'react-icons/hi2'
import Container from '../../../components/layout/Container'
import Reveal from '../../../components/ui/Reveal'
import { transitions } from '../../../theme/transitions'
import { bmsServices } from '../BMS.data'

type Capability = (typeof bmsServices)[number]

// Featured panels lean their image slightly away from the pointer; the CSS applies it only on hover-capable screens.
const tilt = (event: PointerEvent<HTMLElement>) => {
  const card = event.currentTarget
  const box = card.getBoundingClientRect()
  card.style.setProperty('--mx', ((event.clientX - box.left) / box.width - .5).toFixed(3))
  card.style.setProperty('--my', ((event.clientY - box.top) / box.height - .5).toFixed(3))
}
const untilt = (event: PointerEvent<HTMLElement>) => {
  event.currentTarget.style.setProperty('--mx', '0')
  event.currentTarget.style.setProperty('--my', '0')
}

function CapabilityCard({ item, index, open, onToggle }: { item: Capability; index: number; open: boolean; onToggle: () => void }) {
  const { id, layout, title, icon: Icon, description, scope, image, alt, focus, source } = item
  const reduced = useReducedMotion()
  const card = useRef<HTMLElement>(null)
  // The card, not the clipped image, is watched: a fully clipped element can be missed by the observer.
  const inView = useInView(card, { once: true, margin: '-60px' })
  const feature = layout === 'feature'
  return <article ref={card} className={`bms-xp-card is-${layout}${open ? ' is-expanded' : ''}`} onPointerMove={feature ? tilt : undefined} onPointerLeave={feature ? untilt : undefined}>
    <div className="bms-xp-media">
      <motion.div
        className="bms-xp-reveal"
        initial={reduced ? false : { clipPath: 'inset(0 0 100% 0)' }}
        animate={reduced || inView ? { clipPath: 'inset(0 0 0% 0)' } : undefined}
        transition={{ duration: 1.1, delay: .1 + index * .07, ease: transitions.reveal }}
      >
        <img src={image} alt={alt} style={{ objectPosition: focus }} decoding="async" draggable={false} />
      </motion.div>
      <span className="bms-xp-source">{source}</span>
    </div>
    <div className="bms-xp-body">
      <div className="bms-xp-meta"><Icon aria-hidden="true" /><span>0{index + 1}</span></div>
      <h3>{title}</h3>
      <p>{description}</p>
      <button type="button" aria-label={`${open ? 'Close scope' : 'Explore scope'}: ${title}`} aria-expanded={open} aria-controls={`bms-scope-${id}`} onClick={onToggle}><span>{open ? 'Close scope' : 'Explore scope'}</span>{open ? <HiOutlineMinus aria-hidden="true" /> : <HiOutlineArrowUpRight aria-hidden="true" />}</button>
      <div id={`bms-scope-${id}`} hidden={!open} className="bms-service-scope">{scope}</div>
    </div>
  </article>
}

export default function BMSServices() {
  const [expanded, setExpanded] = useState<string | null>(null)
  return <section id="bms-services" className="bms-section bms-expertise" aria-labelledby="bms-services-title"><Container>
    <Reveal className="bms-section-intro"><div><p className="bms-label">02 / OUR EXPERTISE</p><h2 id="bms-services-title" className="bms-heading">Integrated Solutions for<br /><span>Intelligent Buildings</span></h2></div><p>From centralized monitoring to advanced automation, EMS provides engineering and system integration services tailored to modern building requirements.</p></Reveal>
    <div className="bms-xp-grid">{bmsServices.map((item, index) => <Reveal key={item.id} delay={index * .07} className={`bms-xp-cell is-${item.id}`}>
      <CapabilityCard item={item} index={index} open={expanded === item.id} onToggle={() => setExpanded(expanded === item.id ? null : item.id)} />
    </Reveal>)}</div>
  </Container></section>
}
