import { useState, type CSSProperties } from 'react'
import { HiOutlineArrowUpRight } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import Container from '../../../components/layout/Container'
import Reveal from '../../../components/ui/Reveal'
import { cn } from '../../../utils/cn'
import { ecosystem, type EcosystemNode } from '../About.data'
import SectionHeading from './SectionHeading'

// The diagram keeps a fixed 5:4 ratio, so percentages map uniformly onto this viewBox.
const VIEW = { width: 1000, height: 800 }
const HUB = { x: VIEW.width / 2, y: VIEW.height / 2 }
const point = ({ x, y }: EcosystemNode) => ({ x: x / 100 * VIEW.width, y: y / 100 * VIEW.height })
const { nodes } = ecosystem
const perimeter = nodes.map(node => { const p = point(node); return `${p.x},${p.y}` }).join(' ')

function ConnectionLines({ activeId }: { activeId: string }) {
  return (
    <svg className="about-eco-lines" viewBox={`0 0 ${VIEW.width} ${VIEW.height}`} aria-hidden="true" focusable="false">
      <polygon points={perimeter} className="about-eco-perimeter" />
      <circle cx={HUB.x} cy={HUB.y} r={170} className="about-eco-orbit" />
      <circle cx={HUB.x} cy={HUB.y} r={250} className="about-eco-orbit is-outer" />
      {nodes.map(node => {
        const p = point(node)
        const active = node.id === activeId
        return (
          <g key={node.id} className={cn('about-eco-link', active && 'is-active')}>
            <line x1={p.x} y1={p.y} x2={HUB.x} y2={HUB.y} className="about-eco-spoke" />
            <line x1={p.x} y1={p.y} x2={HUB.x} y2={HUB.y} className="about-eco-flow" />
          </g>
        )
      })}
    </svg>
  )
}

export default function EcosystemSection() {
  const [activeId, setActiveId] = useState(nodes[0].id)
  const activeIndex = Math.max(0, nodes.findIndex(node => node.id === activeId))
  const active = nodes[activeIndex]

  return (
    <section className="about-section" aria-labelledby="about-ecosystem-title">
      <Container>
        <SectionHeading id="about-ecosystem-title" label={ecosystem.label} title={ecosystem.title} intro={ecosystem.intro} />

        <Reveal className="about-eco">
          <div className="about-eco-diagram">
            <ConnectionLines activeId={activeId} />
            <div className="about-eco-hub">
              <span className="about-eco-hub-label about-display">{ecosystem.hub.label}</span>
              <span className="about-eco-hub-text">{ecosystem.hub.text}</span>
            </div>
            <ul className="about-eco-nodes" aria-label="EMS engineering capabilities">
              {nodes.map((node, index) => (
                <li key={node.id} className={cn('about-eco-node', node.id === activeId && 'is-active')} style={{ '--x': `${node.x}%`, '--y': `${node.y}%` } as CSSProperties}>
                  <Link to={node.to} onMouseEnter={() => setActiveId(node.id)} onFocus={() => setActiveId(node.id)} className="about-eco-node-link">
                    <span aria-hidden="true" className="about-eco-dot" />
                    <span className="about-eco-node-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                    <span className="about-eco-node-label">{node.label}</span>
                    <span className="about-eco-node-title">{node.title}</span>
                    <span className="about-eco-node-summary">{node.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <aside className="about-eco-panel" aria-live="polite" aria-label="Selected capability">
            <p className="about-mono">{String(activeIndex + 1).padStart(2, '0')} / {String(nodes.length).padStart(2, '0')} — {active.label}</p>
            <h3 className="about-eco-panel-title about-display">{active.title}</h3>
            <p className="about-body">{active.summary}</p>
            <ul className="about-eco-capabilities">{active.capabilities.map(item => <li key={item}>{item}</li>)}</ul>
            <Link to={active.to} className="about-text-link touch-target">Explore {active.label}<HiOutlineArrowUpRight aria-hidden="true" /></Link>
          </aside>
        </Reveal>

        <div className="about-disciplines">
          <Reveal className="about-disciplines-head">
            <p className="about-mono">Disciplines</p>
            <h3 className="about-subtitle about-display">{ecosystem.disciplinesTitle}</h3>
          </Reveal>
          <ul className="about-discipline-list">
            {ecosystem.disciplines.map(({ title, text }, index) => (
              <li key={title}>
                <Reveal delay={index * .06}>
                  <h4 className="about-minor-title">{title}</h4>
                  <p className="about-small">{text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <div className="about-outcomes">
          <Reveal><p className="about-mono">Operational outcomes</p></Reveal>
          <ul className="about-outcome-list">
            {ecosystem.outcomes.map(({ title, text }, index) => (
              <li key={title}>
                <Reveal delay={(index % 3) * .05}>
                  <h4 className="about-outcome-title">{title}</h4>
                  <p className="about-small">{text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
