import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion'
import { useRef, type CSSProperties, type PointerEvent } from 'react'
import { HiOutlineArrowUpRight } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import Container from '../../../components/layout/Container'
import { images } from '../../../constants/images'
import '../Home.css'
import { aboutMilestones, ease, featuredPartners } from '../Home.data'

const lastMilestone = aboutMilestones.length - 1

// Each market arrives a second after the one before; the line to it draws in that second (timed in Home.css).
const arrival = (index: number) => index

const markerMotion: Variants = {
  hidden: { opacity: 0, scale: .4 },
  shown: (index: number) => ({ opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 320, damping: 17, delay: arrival(index) } }),
}

// A ring spreads from each marker as it arrives; the latest market keeps signalling.
const pingMotion: Variants = {
  hidden: { opacity: 0, scale: 1 },
  shown: (index: number) => ({ opacity: [0, .75, 0], scale: [1, 1, 2.3], transition: { duration: 1.5, times: [0, .05, 1], ease: 'easeOut', delay: arrival(index) + .1, repeat: index === lastMilestone ? Infinity : 0, repeatDelay: 2.2 } }),
}

const cardMotion: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  shown: (index: number) => ({ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: .8, ease, delay: arrival(index) + .15 } }),
}

// Moves the card's glow to sit under the pointer.
const followPointer = (event: PointerEvent<HTMLElement>) => {
  const box = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty('--spot-x', `${event.clientX - box.left}px`)
  event.currentTarget.style.setProperty('--spot-y', `${event.clientY - box.top}px`)
}

export default function AboutSection() {
  const routeRef = useRef<HTMLOListElement>(null)
  const drawn = useInView(routeRef, { once: true, amount: .4 })
  const reducedMotion = useReducedMotion()

  return (
    <section id="home-about" className="home-major-section relative scroll-mt-20" aria-labelledby="home-about-title">
      <Container className="relative">
        <div className="home-about-lead">
          <div className="home-reveal home-about-copy">
            {/* The section's heading keeps the site's label style; the statement under it is the lead. */}
            <h2 id="home-about-title" className="section-eyebrow font-mono text-[clamp(.72rem,1vw,.9rem)] font-semibold uppercase tracking-[.3em] text-paint-primary">About EMS</h2>
            <p className="home-about-statement">EMS delivers integrated MEP, automation and smart infrastructure solutions that connect buildings, operations and technology across Egypt, Saudi Arabia and Oman.</p>
          </div>

          {/* The company's expansion in the order it happened. On first sight each market's marker arrives in turn, its card rising under it, and the line draws on to the next; with reduced motion it all simply appears. */}
          <motion.ol ref={routeRef} className="home-about-route" data-drawn={drawn || undefined} aria-label="How EMS has grown" initial={reducedMotion ? false : 'hidden'} animate={drawn || reducedMotion ? 'shown' : 'hidden'}>
            {aboutMilestones.map((milestone, index) => {
              const Icon = milestone.icon
              return <li key={milestone.id} className="home-about-step" style={{ '--step': index } as CSSProperties}>
                <motion.span className="home-about-marker" aria-hidden="true" custom={index} variants={markerMotion}>
                  {!reducedMotion && <motion.span className="home-about-ping" custom={index} variants={pingMotion} />}
                  <Icon />
                </motion.span>
                <span className="home-about-signal" aria-hidden="true" />
                <motion.div className="home-about-card" custom={index} variants={cardMotion} onPointerMove={followPointer}>
                  <span className="home-about-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.text}</p>
                </motion.div>
              </li>
            })}
          </motion.ol>
        </div>

        <div className="home-about-principles">
          {([['Our Mission', 'Analyze customer needs without compromising satisfaction—delivering economical, fast and high-quality solutions through full-scope MEP works and modern technologies.', 'Read our story'], ['Our Vision', 'Be a distinctive and independent MEP provider delivering modern, highly professional services across complete MEP requirements and the latest technologies.', 'Explore our direction']] as const).map(([title, text, cta], index) => (
            <motion.article key={title} initial={reducedMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .7, delay: index * .08, ease }}>
              <h3>{title}</h3>
              <p>{text}</p>
              <Link to="/about">{cta} <HiOutlineArrowUpRight aria-hidden="true" /></Link>
            </motion.article>
          ))}
        </div>

        <h3 className="home-reveal home-founder-heading">Meet the visionary behind EMS&apos;s innovative smart infrastructure solutions.</h3>

        <motion.div initial={reducedMotion ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .75, ease }} className="mx-auto mt-10 grid max-w-[1450px] items-center gap-12 lg:grid-cols-[.92fr_1.08fr] lg:gap-16">
          <section className="px-2 sm:px-4">
            <div className="relative w-fit">
              <img src={images.ahmedElzayat} alt="Ahmed Elzayat, CEO and Founder of EMS" loading="lazy" className="h-52 w-52 rounded-full border-4 border-paint-primary/35 object-cover object-top shadow-[0_20px_55px_rgba(0,0,0,.35)] sm:h-56 sm:w-56" />
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-paint-primary/40 bg-paint-primary px-4 py-2 text-[11px] font-bold uppercase tracking-[.08em] text-paint-navy shadow-lg">CEO &amp; Founder</span>
            </div>
            <h3 className="mt-9 font-serif text-[clamp(1.65rem,2.3vw,2.1rem)] font-medium text-white">Eng. Ahmed El-Zayat</h3>
            <p className="mt-4 max-w-2xl text-[clamp(1rem,1.1vw,1.06rem)] leading-[1.75] text-slate-300">With over 15 years of experience in IoT and AI technologies, Engineer Ahmed El-Zayat has led EMS to become a pioneer in smart infrastructure solutions. His vision is to transform how organizations operate through innovative technology integration.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="https://www.facebook.com/share/1LkNgGndZa/?mibextid=wwXIfr" target="_blank" rel="noreferrer" className="brand-gradient-button rounded-lg px-5 py-3 text-sm font-semibold">View Facebook Profile</a>
              <a href="https://eg.linkedin.com/in/ahmed-elzayat-a8325b41" target="_blank" rel="noreferrer" className="rounded-lg border border-paint-primary px-5 py-3 text-sm font-semibold text-paint-primary transition hover:bg-paint-primary hover:text-paint-navy">Connect on LinkedIn</a>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl bg-white/[.035]">
            <div className="p-6 sm:px-7 sm:py-6">
              <h3 className="font-serif text-[clamp(1.45rem,1.9vw,1.8rem)] font-medium text-white">Featured Podcast</h3>
              <p className="mt-2 text-[clamp(.95rem,1.05vw,1.02rem)] leading-[1.7] text-slate-300">Engineer Ahmed El-Zayat discusses the significance of Artificial Intelligence in enhancing and improving our daily lives in a special podcast episode.</p>
            </div>
            <div className="overflow-hidden bg-paint-blue-09">
              <video
                title="Ahmed Elzayat featured podcast about artificial intelligence"
                src={images.cBC20TALK}
                controls
                autoPlay
                muted
                preload="metadata"
                playsInline
                className="aspect-video w-full bg-black object-contain"
              >
                Your browser does not support the video element.
              </video>
            </div>
          </section>
        </motion.div>

        <section id="home-partners" aria-labelledby="home-partners-title">
          <div className="text-center">
            <h2 id="home-partners-title" className="font-mono text-[clamp(1.2rem,2vw,1.9rem)] font-semibold uppercase tracking-[.2em] text-paint-cyan">
              Our Partners
            </h2>
            <span aria-hidden="true" className="mx-auto mt-5 block h-0.5 w-12 rounded-full bg-paint-cyan/60" />
          </div>

          <div className="home-partners-cards">
            {featuredPartners.map(partner => (
              <div
                key={partner.id}
                className="home-partner-logo-card"
              >
                <img src={partner.logo} alt={`${partner.name} logo`} loading="lazy" decoding="async" className={`home-partner-logo home-partner-logo-${partner.id}`} />
              </div>
            ))}
          </div>
        </section>
      </Container>
    </section>
  )
}
