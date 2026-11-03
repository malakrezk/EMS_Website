import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { HiOutlineArrowDown, HiOutlineArrowLeft, HiOutlineArrowRight, HiOutlineArrowUpRight } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { images } from '../../../constants/images'
import { galleryItems } from '../Projects.data'

gsap.registerPlugin(ScrollTrigger)

const count = galleryItems.length
const sceneDuration = 2.6
const hold = .8
const transitionDuration = 1.8
const timelineDuration = (count - 1) * sceneDuration + hold
const captionChangeTime = hold + transitionDuration * .62

type PhotoPose = {
  xPercent: number
  yPercent: number
  scale: number
  opacity: number
  rotationX: number
  rotationY: number
}

// Every photograph has a fixed box; each scene changes only its transform.
// The photos travel one diagonal like a chain: the next waits docked on the featured photo's right edge,
// the previous recedes behind its upper-left corner, and the rest wait or leave further along the same line.
// Later photos always stack above earlier ones, so the incoming photo slides over the outgoing one.
const poseFor = (scene: number, photo: number): PhotoPose => {
  const offset = photo - scene
  if (offset === 0) return { xPercent: 0, yPercent: 0, scale: 1, opacity: 1, rotationX: 2, rotationY: -5 }
  if (offset === 1) return { xPercent: 57, yPercent: 20, scale: .32, opacity: 1, rotationX: 2, rotationY: -16 }
  if (offset === -1) return { xPercent: -60, yPercent: -18, scale: .36, opacity: .7, rotationX: 2, rotationY: 12 }
  if (offset > 1) return { xPercent: 104, yPercent: 32, scale: .22, opacity: 0, rotationX: 2, rotationY: -22 }
  return { xPercent: -104, yPercent: -46, scale: .24, opacity: 0, rotationX: 2, rotationY: 18 }
}
const compositions: PhotoPose[][] = Array.from({ length: count }, (_, scene) => Array.from({ length: count }, (_, photo) => poseFor(scene, photo)))

export default function CinematicGallery({ onNavigate }: { onNavigate: (top: number) => void }) {
  const root = useRef<HTMLElement>(null)
  const trigger = useRef<ScrollTrigger | null>(null)
  const activeIndex = useRef(0)
  const [index, setIndex] = useState(0)
  const [pinned, setPinned] = useState(false)

  useLayoutEffect(() => {
    const section = root.current
    if (!section) return
    const updateIndex = (next: number) => {
      if (activeIndex.current !== next) {
        activeIndex.current = next
        setIndex(next)
      }
    }
    const media = gsap.matchMedia()
    const context = gsap.context(() => {
      media.add('(min-width: 768px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)', () => {
        setPinned(true)
        const photos = gsap.utils.toArray<HTMLElement>('.project-story-photo', section)
        const captions = gsap.utils.toArray<HTMLElement>('.project-story-copy', section)
        const progress = section.querySelector('.project-story-progress-fill')
        const updateFromTime = (time: number) => {
          const next = Math.min(count - 1, Math.max(0, Math.floor((time - captionChangeTime) / sceneDuration) + 1))
          updateIndex(next)
        }
        const timeline = gsap.timeline({
          onUpdate() { updateFromTime(this.time()) },
          scrollTrigger: {
            id: 'ems-project-story',
            trigger: section,
            start: 'top top',
            end: () => `+=${window.innerHeight * (count - 1) * 1.5}`,
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        trigger.current = timeline.scrollTrigger ?? null
        photos.forEach((photo, photoIndex) => gsap.set(photo, { ...compositions[0][photoIndex], zIndex: 1 + photoIndex, transformPerspective: 1600, transformOrigin: '50% 50%' }))
        gsap.set(captions, { autoAlpha: 0, y: 22 })
        gsap.set(captions[0], { autoAlpha: 1, y: 0 })
        gsap.set(progress, { scaleX: 1 / count, transformOrigin: 'left center' })

        for (let scene = 1; scene < count; scene += 1) {
          const start = (scene - 1) * sceneDuration + hold
          photos.forEach((photo, photoIndex) => {
            timeline.to(photo, { ...compositions[scene][photoIndex], duration: transitionDuration, ease: 'power2.inOut' }, start)
          })
          timeline.to(captions[scene - 1], { autoAlpha: 0, y: -18, duration: .32 }, start + .72)
          timeline.fromTo(captions[scene], { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: .42, immediateRender: false }, start + transitionDuration * .62)
          timeline.to(progress, { scaleX: (scene + 1) / count, duration: transitionDuration, ease: 'none' }, start)
        }
        timeline.to('.project-story-backdrop', { yPercent: -8, scale: 1.08, duration: timelineDuration, ease: 'none' }, 0)
        updateFromTime(timeline.time())
        return () => {
          trigger.current = null
          setPinned(false)
        }
      })
      media.add({
        small: '(max-width: 767px)',
        short: '(max-height: 599px)',
        reduced: '(prefers-reduced-motion: reduce)',
      }, () => {
        const scenes = Array.from(section.querySelectorAll<HTMLElement>('.project-story-scene'))
        const updateVisibleProject = () => {
          const focusLine = window.innerHeight * .4
          const next = scenes.reduce((closest, scene, sceneIndex) =>
            Math.abs(scene.getBoundingClientRect().top - focusLine) < Math.abs(scenes[closest].getBoundingClientRect().top - focusLine) ? sceneIndex : closest, 0)
          updateIndex(next)
        }
        const observer = new IntersectionObserver(updateVisibleProject, { rootMargin: '-15% 0px -35% 0px', threshold: [0, .25, .5, .75] })
        scenes.forEach(scene => observer.observe(scene))
        window.addEventListener('scroll', updateVisibleProject, { passive: true })
        updateVisibleProject()
        return () => { observer.disconnect(); window.removeEventListener('scroll', updateVisibleProject) }
      })
    }, section)
    return () => {
      media.revert()
      context.revert()
      trigger.current = null
    }
  }, [])

  const go = (step: number) => {
    const next = Math.max(0, Math.min(count - 1, activeIndex.current + step))
    const scrollTrigger = trigger.current
    if (scrollTrigger) {
      const time = next * sceneDuration + hold / 2
      const top = scrollTrigger.start + (time / timelineDuration) * (scrollTrigger.end - scrollTrigger.start)
      // Buttons move the scroll position, never a second animation timeline.
      onNavigate(top)
    } else {
      root.current?.querySelectorAll<HTMLElement>('.project-story-scene')[next]?.scrollIntoView({ behavior: 'auto', block: 'start' })
    }
  }

  return <section ref={root} id="project-gallery" aria-labelledby="project-gallery-heading" className="project-story" style={{ '--story-progress': (index + 1) / count } as CSSProperties}>
    <div
      className="project-story-stage"
      role="group"
      aria-label="EMS projects gallery"
      tabIndex={0}
      onKeyDown={event => {
        if (event.target !== event.currentTarget) return
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault()
          go(event.key === 'ArrowRight' ? 1 : -1)
        }
      }}
    >
      <img className="project-story-backdrop" src={images.sectorTowersCn05} alt="" aria-hidden="true" width={1448} height={1086} decoding="async" />
      <header className="project-story-header">
        <div><p className="project-story-eyebrow">EMS / Selected work</p><h2 id="project-gallery-heading">Engineering in focus.</h2></div>
        <p className="project-story-scroll"><HiOutlineArrowDown aria-hidden="true" /> Scroll to explore</p>
      </header>
      <div className="project-story-controls">
        <p className="project-story-counter" aria-live="polite" aria-atomic="true"><span>{String(index + 1).padStart(2, '0')}</span> / {String(count).padStart(2, '0')}</p>
        <div className="project-story-progress" role="progressbar" aria-label="Featured project progress" aria-valuemin={1} aria-valuemax={count} aria-valuenow={index + 1} aria-valuetext={galleryItems[index].name}>
          <div className="project-story-progress-fill" />
        </div>
        <div className="project-story-arrows">
          <button type="button" onClick={() => go(-1)} disabled={index === 0} aria-label="Previous project"><HiOutlineArrowLeft aria-hidden="true" /></button>
          <button type="button" onClick={() => go(1)} disabled={index === count - 1} aria-label="Next project"><HiOutlineArrowRight aria-hidden="true" /></button>
        </div>
      </div>
      <div className="project-story-scenes">
        {galleryItems.map((project, projectIndex) => <article
          key={project.id}
          data-project-index={projectIndex}
          className="project-story-scene"
          aria-label={`${String(projectIndex + 1).padStart(2, '0')} / ${project.name}`}
        >
          <div className="project-story-photo" aria-hidden={pinned && index !== projectIndex}>
            <img src={project.image} alt={project.imageAlt} width={1440} height={900} loading="eager" decoding="async" draggable={false} />
            <span aria-hidden="true" className="project-story-photo-number">{String(projectIndex + 1).padStart(2, '0')}</span>
          </div>
          <div className="project-story-copy" aria-hidden={pinned && index !== projectIndex}>
            <div className="project-story-title">
              <p className="project-story-eyebrow">{String(projectIndex + 1).padStart(2, '0')} / {project.category}</p>
              <h3>{project.name}</h3>
            </div>
            <div className="project-story-description">
              <p>{project.description}</p>
              <Link to={project.to} tabIndex={pinned && index !== projectIndex ? -1 : undefined}>
                {project.linkLabel} <HiOutlineArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </article>)}
      </div>
    </div>
  </section>
}
