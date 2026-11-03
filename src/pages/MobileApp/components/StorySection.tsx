import { motion, useReducedMotion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import Container from '../../../components/layout/Container'
import PhoneMockup from '../../../components/ui/PhoneMockup'
import { ease, story } from '../MobileApp.data'
import AppCloseUp from './AppCloseUp'

gsap.registerPlugin(ScrollTrigger)

const { chapters } = story
const count = chapters.length
// Must match the media query in MobileApp.css that shows the pinned stage instead of the list.
const PINNED_QUERY = '(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)'
const pad = (value: number) => String(value).padStart(2, '0')
// On the timeline each chapter has one second: chapter n (from 1) changes over the .6 before n, then holds still until the next one.
const CHANGE = .6
const changeStart = (index: number) => index - CHANGE
// The last chapter holds a little longer before the page moves on.
const END_HOLD = .5
// The phone turns gently from side to side between chapters.
const pose = (index: number) => ({ rotateY: index % 2 === 0 ? 10 : -8, rotateX: 4, rotateZ: index % 2 === 0 ? -.8 : .8 })

export default function StorySection({ onNavigate }: { onNavigate: (top: number) => void }) {
  const stageRef = useRef<HTMLDivElement>(null)
  const trigger = useRef<ScrollTrigger | null>(null)
  const activeRef = useRef(0)
  const [active, setActive] = useState(0)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    const stage = stageRef.current
    if (!stage) return undefined
    const media = gsap.matchMedia()
    const context = gsap.context(() => {
      media.add(PINNED_QUERY, () => {
        const entry = stage.querySelector('.app-story-entry')
        const text = stage.querySelector('.app-story-text')
        const rig = stage.querySelector('.app-story-rig')
        const screens = gsap.utils.toArray<HTMLElement>('.app-story-screen', stage)
        // Each chapter's label and its copy change together.
        const kickers = gsap.utils.toArray<HTMLElement>('.app-story-kickers > .app-story-kicker', stage)
        const copies = gsap.utils.toArray<HTMLElement>('.app-story-copy', stage).map((copy, index) => [kickers[index], copy])
        const details = gsap.utils.toArray<HTMLElement>('.app-story-detail', stage)
        const progress = stage.querySelector('.app-story-progress > span')
        const show = (index: number) => {
          if (activeRef.current === index) return
          activeRef.current = index
          setActive(index)
        }

        gsap.set(rig, { ...pose(0), transformPerspective: 1700 })
        gsap.set(screens, { autoAlpha: 0 })
        gsap.set(screens[0], { autoAlpha: 1 })
        gsap.set(copies.flat(), { autoAlpha: 0, y: 24, filter: 'blur(4px)' })
        gsap.set(copies[0], { autoAlpha: 1, y: 0, filter: 'blur(0px)' })
        gsap.set(details, { autoAlpha: 0, x: 48, scale: .95 })
        gsap.set(details[0], { autoAlpha: 1, x: 0, scale: 1 })
        gsap.set(progress, { scaleX: 1 / count, transformOrigin: 'left center' })

        // As soon as the stage comes into view the phone rises and turns into place, and the copy follows,
        // so both are settled before the pin and the stage never scrolls in empty.
        gsap.fromTo(entry,
          { yPercent: 16, rotateX: 14, rotateY: -18, scale: .9, autoAlpha: 0, transformPerspective: 1700 },
          { yPercent: 0, rotateX: 0, rotateY: 0, scale: 1, autoAlpha: 1, ease: 'power2.out', scrollTrigger: { trigger: stage, start: 'top bottom', end: 'top 25%', scrub: 1 } })
        gsap.fromTo(text,
          { y: 48, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, ease: 'power2.out', scrollTrigger: { trigger: stage, start: 'top 75%', end: 'top 20%', scrub: 1 } })

        const timeline = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          // The counter and buttons switch halfway through each change.
          onUpdate() { show(Math.max(0, Math.min(count - 1, Math.floor(this.time() + CHANGE / 2)))) },
          scrollTrigger: {
            id: 'park-lane-story',
            trigger: stage,
            start: 'top top',
            end: () => `+=${window.innerHeight * (count - 1 + END_HOLD)}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        trigger.current = timeline.scrollTrigger ?? null
        for (let index = 1; index < count; index += 1) {
          const start = changeStart(index)
          timeline.to(rig, { ...pose(index), duration: CHANGE }, start)
          timeline.to(progress, { scaleX: (index + 1) / count, duration: CHANGE }, start)
          // The copy hands over without a blank beat: the old lines lift away as the new ones rise in.
          timeline.to(copies[index - 1], { autoAlpha: 0, y: -18, filter: 'blur(4px)', duration: .26, ease: 'power2.in' }, start)
          timeline.fromTo(copies[index], { autoAlpha: 0, y: 22, filter: 'blur(4px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: .38, ease: 'power3.out', immediateRender: false }, start + .2)
          // The new screen fades in over the old one, which stays lit underneath until it is covered, so the phone never dims.
          timeline.fromTo(screens[index], { autoAlpha: 0, scale: 1.05, yPercent: 2 }, { autoAlpha: 1, scale: 1, yPercent: 0, duration: .42, ease: 'power2.out', immediateRender: false }, start + .08)
          timeline.set(screens[index - 1], { autoAlpha: 0 }, start + .5)
          timeline.to(details[index - 1], { autoAlpha: 0, x: 24, scale: .97, duration: .26, ease: 'power2.in' }, start)
          timeline.fromTo(details[index], { autoAlpha: 0, x: 48, scale: .95 }, { autoAlpha: 1, x: 0, scale: 1, duration: .36, ease: 'power3.out', immediateRender: false }, start + .24)
        }
        timeline.to({}, { duration: END_HOLD })
        return () => {
          trigger.current = null
          show(0)
        }
      })
    }, stage)
    return () => {
      media.revert()
      context.revert()
      trigger.current = null
    }
  }, [])

  // The chapter buttons move the scroll position, so the scroll timeline stays the only animation.
  const goTo = (index: number) => {
    const scrollTrigger = trigger.current
    const duration = scrollTrigger?.animation?.duration()
    if (!scrollTrigger || !duration) return
    onNavigate(scrollTrigger.start + (index / duration) * (scrollTrigger.end - scrollTrigger.start))
  }

  const reveal = reducedMotion ? {} : {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: .9, ease },
  }

  return (
    <section id="app-story" className="app-story" aria-labelledby="app-story-title">
      <Container className="app-story-intro">
        <motion.div className="app-heading" {...reveal}>
          <p className="app-label">{story.label}</p>
          <h2 id="app-story-title">{story.title}</h2>
          <p>{story.text}</p>
        </motion.div>
      </Container>

      {/* Large screens with motion: one phone, pinned, that turns and changes screen as the page scrolls. */}
      <div ref={stageRef} className="app-story-stage">
        <div className="container-ems app-story-inner">
          <div className="app-story-text">
            {/* Each chapter's label leads the column, with the count right under it and the copy below. */}
            <div className="app-story-head">
              <div className="app-story-kickers">
                {chapters.map(chapter => <p key={chapter.id} className="app-story-kicker">{chapter.label}</p>)}
              </div>
              <div className="app-story-meta" aria-hidden="true">
                <p className="app-story-count"><span>{pad(active + 1)}</span> / {pad(count)}</p>
                <div className="app-story-progress"><span /></div>
              </div>
            </div>
            <div className="app-story-copies">
              {chapters.map(chapter => (
                <article key={chapter.id} className="app-story-copy">
                  <h3>{chapter.title}</h3>
                  <p>{chapter.text}</p>
                </article>
              ))}
            </div>
            <nav className="app-story-nav" aria-label="App chapters">
              {chapters.map((chapter, index) => (
                <button key={chapter.id} type="button" aria-current={index === active ? 'step' : undefined} onClick={() => goTo(index)}>{chapter.label}</button>
              ))}
            </nav>
          </div>
          <div className="app-story-visual">
            <span className="app-story-glow" aria-hidden="true" />
            <div className="app-story-entry">
              <div className="app-story-rig">
                <PhoneMockup>
                  {chapters.map((chapter, index) => (
                    <img key={chapter.id} className="app-story-screen" src={chapter.screen.src} alt={chapter.screen.alt} width={390} height={868} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" draggable={false} />
                  ))}
                </PhoneMockup>
              </div>
              <div className="app-story-details">
                {chapters.map(chapter => (
                  <AppCloseUp key={chapter.id} image={chapter.detail} className="app-story-detail" style={{ '--detail-top': chapter.detailTop } as CSSProperties} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phones, tablets and reduced motion: the same chapters, one after another. */}
      <Container className="app-story-list">
        {chapters.map(chapter => (
          <motion.article key={chapter.id} className="app-story-item" {...reveal}>
            <div className="app-story-item-copy">
              <p className="app-story-kicker">{chapter.label}</p>
              <h3>{chapter.title}</h3>
              <p>{chapter.text}</p>
            </div>
            <div className="app-story-item-visual">
              <PhoneMockup src={chapter.screen.src} alt={chapter.screen.alt} />
              <AppCloseUp image={chapter.detail} className="app-story-item-detail" />
            </div>
          </motion.article>
        ))}
      </Container>
    </section>
  )
}
