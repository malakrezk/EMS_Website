import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { HiOutlineSignal } from 'react-icons/hi2'
import Container from '../../../components/layout/Container'
import Reveal from '../../../components/ui/Reveal'
import { transitions } from '../../../theme/transitions'
import { integrations } from '../IoT.data'

const { items } = integrations

export default function IoTIntegrations() {
  const reduced = useReducedMotion()
  const diagram = useRef<HTMLDivElement>(null)
  const inView = useInView(diagram, { margin: '-120px' })
  const [active, setActive] = useState(0)
  // The hub walks through each platform on its own until someone points at one; then it follows them.
  const [touched, setTouched] = useState(false)
  useEffect(() => {
    if (reduced || touched || !inView) return undefined
    const timer = window.setInterval(() => setActive(current => (current + 1) % items.length), 3200)
    return () => window.clearInterval(timer)
  }, [reduced, touched, inView])
  const choose = (index: number) => { setTouched(true); setActive(index) }
  const item = items[active]

  return <section className="iot-section iot-integrations" aria-labelledby="iot-integrations-title">
    <Container>
      <div className="iot-section-head">
        <h2 id="iot-integrations-title" className="iot-heading">{integrations.title}</h2>
        <p>{integrations.lead}</p>
      </div>

      <div className="iot-hub-layout">
        <Reveal className="iot-hub-wrap">
          <div ref={diagram} className="iot-hub" role="group" aria-label="Platforms IoT data can be integrated with">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {items.map((link, index) => <g key={link.id}>
                <line x1="50" y1="50" x2={link.x} y2={link.y} className="iot-hub-line" />
                {active === index && <line x1="50" y1="50" x2={link.x} y2={link.y} className="iot-hub-flow" />}
              </g>)}
            </svg>
            <div className="iot-hub-core"><HiOutlineSignal aria-hidden="true" /><span>Connected IoT data</span></div>
            {items.map(({ id, name, icon: Icon, x, y }, index) => <button
              key={id}
              type="button"
              className="iot-hub-node"
              style={{ left: `${x}%`, top: `${y}%` }}
              aria-pressed={active === index}
              aria-controls="iot-hub-detail"
              onClick={() => choose(index)}
              onMouseEnter={() => choose(index)}
              onFocus={() => choose(index)}
            ><span className="iot-hub-icon"><Icon aria-hidden="true" /></span><span className="iot-hub-name">{name}</span></button>)}
          </div>
        </Reveal>

        <div className="iot-hub-side">
          <p className="iot-hub-intro">{integrations.intro}</p>
          <div id="iot-hub-detail" className="iot-hub-detail" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={item.id} initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -8 }} transition={{ duration: .35, ease: transitions.reveal }}>
                <item.icon aria-hidden="true" />
                <h3>{item.name}</h3>
                <p>{item.purpose.charAt(0).toUpperCase() + item.purpose.slice(1)}.</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <ul className="iot-hub-list">
            {items.map(({ id, name, purpose, icon: Icon }) => <li key={id}><Icon aria-hidden="true" /><p><strong>{name}</strong> {purpose}</p></li>)}
          </ul>
          <p className="iot-hub-note">{integrations.note}</p>
        </div>
      </div>
    </Container>
  </section>
}
