import { useEffect, useRef, useState } from 'react'
import type { IconType } from 'react-icons'
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa6'
import { HiOutlineArrowUpRight, HiPlay } from 'react-icons/hi2'
import Container from '../../../components/layout/Container'
import Reveal from '../../../components/ui/Reveal'
import { leadership, type LeadershipLinkId } from '../About.data'
import SectionHeading from './SectionHeading'

const linkIcons: Record<LeadershipLinkId, IconType> = { biography: HiOutlineArrowUpRight, linkedin: FaLinkedinIn, facebook: FaFacebookF }
const { interview } = leadership

function InterviewPlayer() {
  const [playing, setPlaying] = useState(false)
  const frameRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (playing) frameRef.current?.focus()
  }, [playing])

  return (
    <div className="about-video">
      {playing ? (
        <iframe
          ref={frameRef}
          title={`${leadership.name} featured interview: ${interview.title}`}
          src={`https://www.youtube-nocookie.com/embed/${interview.youtubeId}?autoplay=1&rel=0`}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="about-video-poster" aria-label={`Play interview: ${interview.title}`}>
          <img src={`https://img.youtube.com/vi/${interview.youtubeId}/maxresdefault.jpg`} alt="" loading="lazy" decoding="async" width={1280} height={720} />
          <span aria-hidden="true" className="about-video-control">
            <span className="about-video-play"><HiPlay /></span>
            <span className="about-video-hint">Play interview</span>
          </span>
        </button>
      )}
    </div>
  )
}

export default function LeadershipSection() {
  return (
    <section className="about-section" aria-labelledby="about-leadership-title">
      <Container>
        <SectionHeading id="about-leadership-title" label={leadership.label} title={leadership.title} intro={leadership.intro} />

        <div className="about-leadership-grid">
          <Reveal className="about-leadership-media">
            <figure>
              <InterviewPlayer />
              <figcaption className="about-video-caption">
                <span className="about-mono">{interview.eyebrow}</span>
                <span className="about-video-title about-display">{interview.title}</span>
                <span className="about-small">{interview.text}</span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={.1} className="about-profile">
            <div className="about-profile-head">
              <img src={leadership.portrait} alt={`${leadership.name}, ${leadership.role} of EMS`} loading="lazy" decoding="async" width={160} height={160} />
              <div>
                <h3 className="about-profile-name about-display">{leadership.name}</h3>
                <p className="about-mono">{leadership.role}</p>
              </div>
            </div>
            <p className="about-body">{leadership.biography}</p>
            <div className="about-profile-vision">
              <p className="about-mono">Leadership vision</p>
              <p className="about-body">{leadership.vision}</p>
            </div>
            <ul className="about-profile-links" aria-label={`${leadership.name} profiles`}>
              {leadership.links.map(({ id, label, href }) => {
                const Icon = linkIcons[id]
                return (
                  <li key={id}>
                    <a href={href} target="_blank" rel="noreferrer" className="about-chip-link">
                      <Icon aria-hidden="true" />{label}<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
