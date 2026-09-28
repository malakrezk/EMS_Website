import { motion } from 'framer-motion'
import {
  HiOutlineArrowRight,
  HiOutlineArrowUpRight,
  HiOutlinePlay
} from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import Container from '../../../components/layout/Container'
import type { Project } from '../../../types/content.types'
import '../Home.css'
import { ease, homeCaseStudies } from '../Home.data'
import SectionTitle from '../components/SectionTitle'

interface CaseStudiesSectionProps {
  reducedMotion: boolean | null
  setActiveVideo: React.Dispatch<React.SetStateAction<Project | null>>
}
export default function CaseStudiesSection({ reducedMotion, setActiveVideo }: CaseStudiesSectionProps) {
  return (
    <section id="home-case-studies" className="home-major-section relative scroll-mt-20 overflow-hidden bg-[radial-gradient(circle_at_50%_-10%,rgba(35,199,255,.13),transparent_38%),radial-gradient(circle_at_8%_58%,rgba(41,155,240,.12),transparent_32%),radial-gradient(circle_at_92%_72%,rgba(20,88,145,.16),transparent_34%),linear-gradient(145deg,var(--paint-neutral-06)_0%,var(--paint-blue-12)_48%,var(--paint-blue-06)_100%)]">
      <div className="home-grid pointer-events-none absolute inset-0 opacity-[.14] [mask-image:radial-gradient(ellipse_at_center,black,transparent_76%)]" />
      <div className="pointer-events-none absolute inset-x-[12%] top-0 h-px bg-gradient-to-r from-transparent via-paint-cyan/45 to-transparent" />
      <div className="home-case-orb pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-paint-primary/15 blur-[110px]" />
      <div className="home-case-orb is-delayed pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-paint-cyan/10 blur-[125px]" />
      <div className="home-case-orb pointer-events-none absolute left-1/2 top-[42%] h-64 w-[34rem] -translate-x-1/2 rounded-full bg-paint-blue-39/10 blur-[115px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-[36%] h-72 w-72 rotate-12 rounded-[3rem] border border-paint-primary/10" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 top-[14%] h-64 w-64 -rotate-12 rounded-full border border-paint-cyan/10" />
      <div aria-hidden="true" className="home-data-particle pointer-events-none absolute left-[12%] top-[22%] h-1.5 w-1.5 rounded-full bg-paint-cyan/60 shadow-[0_0_16px_rgba(35,199,255,.65)]" />
      <div aria-hidden="true" className="home-data-particle pointer-events-none absolute right-[17%] top-[42%] h-1 w-1 rounded-full bg-paint-primary/70 shadow-[0_0_14px_rgba(41,155,240,.7)] [animation-delay:-1.8s]" />
      <div aria-hidden="true" className="home-data-particle pointer-events-none absolute bottom-[18%] left-[46%] h-1 w-1 rounded-full bg-paint-cyan/55 shadow-[0_0_12px_rgba(35,199,255,.6)] [animation-delay:-3.2s]" />
      <Container className="relative">
        <div className="flex flex-col items-center text-center"><SectionTitle eyebrow="Case studies" title="Complex Systems. Clear Results." text="Selected EMS applications show how complex infrastructure becomes a clearer, connected operating environment." align="center" /><Link to="/projects" className="home-reveal mt-6 inline-flex w-fit items-center gap-2 text-xs font-semibold text-paint-primary transition hover:gap-3">View all case studies <HiOutlineArrowRight /></Link></div>
        <div className="mx-auto mt-8 grid w-full max-w-[1400px] gap-4 md:grid-cols-2 xl:grid-cols-3">
          {homeCaseStudies.map((project, index) => <motion.article key={project.id} initial={reducedMotion ? false : { opacity: 0, y: 34, scale: .96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .75, delay: (index % 3) * .12, ease }} className="home-case-card group relative flex min-h-[500px] flex-col overflow-hidden rounded-2xl border border-[rgba(74,169,220,0.28)] bg-[radial-gradient(circle_at_0%_0%,rgba(74,169,220,.16),transparent_40%),linear-gradient(135deg,var(--paint-blue-36)_0%,var(--paint-blue-31)_50%,var(--paint-blue-18)_100%)] shadow-[0_20px_40px_rgba(0,0,0,.35)] transition-all duration-500 ease-out md:hover:-translate-y-2 md:hover:border-[rgba(74,169,220,0.5)] md:hover:bg-[radial-gradient(circle_at_0%_0%,rgba(74,169,220,.24),transparent_42%),linear-gradient(135deg,var(--paint-blue-36)_0%,var(--paint-blue-31)_50%,var(--paint-blue-18)_100%)] md:hover:shadow-[0_26px_54px_rgba(0,0,0,.4),0_0_30px_rgba(74,169,220,.22)]">
            <span aria-hidden="true" className="home-case-glow pointer-events-none absolute -right-24 -top-24 z-10 h-64 w-64 rounded-full bg-paint-cyan/20 blur-[80px]" />
            <span aria-hidden="true" className="home-case-accent pointer-events-none absolute inset-x-0 top-0 z-30 h-[2px] bg-gradient-to-r from-transparent via-paint-cyan to-transparent" />
            <span aria-hidden="true" className="home-case-sweep pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(115deg,transparent_40%,rgba(148,224,255,.14)_50%,transparent_60%)] transition-transform duration-[1400ms] ease-out mix-blend-screen md:group-hover:translate-x-full" />
            <header className="home-case-copy relative z-20 min-h-[122px] px-4 py-5 sm:px-5">
              <h3 className="font-serif text-[clamp(1.25rem,1.55vw,1.65rem)] leading-[1.12] text-white">{project.name}</h3>
              <p className="mt-2 text-[11px] font-semibold text-paint-cyan sm:text-xs">{project.location}</p>
            </header>
            <div className="relative aspect-video shrink-0 overflow-hidden bg-paint-blue-14">
              {project.videoSrc
                ? <button
                  type="button"
                  onClick={() => setActiveVideo(project)}
                  onMouseEnter={event => {
                    const video = event.currentTarget.querySelector('video')
                    video?.play().catch(() => undefined)
                  }}
                  onMouseLeave={event => {
                    const video = event.currentTarget.querySelector('video')
                    if (!video) return
                    video.pause()
                    if (project.poster) {
                      video.load()
                      return
                    }
                    if (Number.isFinite(video.duration)) video.currentTime = Math.min(1, Math.max(.2, video.duration * .02))
                  }}
                  onFocus={event => event.currentTarget.querySelector('video')?.play().catch(() => undefined)}
                  onBlur={event => {
                    const video = event.currentTarget.querySelector('video')
                    if (!video) return
                    video.pause()
                    if (project.poster) video.load()
                  }}
                  aria-label={`Preview ${project.name} video; click to open the large video player`}
                  className="group/video relative block h-full w-full cursor-pointer overflow-hidden bg-paint-blue-14 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-paint-cyan"
                >
                  <video
                    key={`${project.videoSrc}-dashboard-preview`}
                    src={project.videoSrc}
                    poster={project.poster}
                    preload="metadata"
                    muted
                    loop
                    playsInline
                    aria-hidden="true"
                    onLoadedMetadata={event => {
                      const video = event.currentTarget
                      if (project.poster) return
                      if (video.dataset.previewReady) return
                      video.dataset.previewReady = 'true'
                      video.currentTime = Number.isFinite(video.duration) ? Math.min(1, Math.max(.2, video.duration * .02)) : 1
                    }}
                    className={`home-case-media pointer-events-none absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[1200ms] ease-out md:group-hover:scale-[1.06] ${project.id === 'smart-hospital' ? 'scale-[1.025]' : ''} ${project.id === 'industrial-scada-system' ? 'scale-[1.02]' : ''}`}
                  >
                    Your browser does not support the video element.
                  </video>
                  <span className="absolute inset-0 bg-paint-navy/[.04] transition duration-300 group-hover/video:bg-transparent" />
                  <span className="home-case-play pointer-events-none absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-paint-navy/80 text-white shadow-[0_12px_35px_rgba(0,0,0,.4)] backdrop-blur transition-all duration-300 md:group-hover/video:scale-110 md:group-hover/video:shadow-[0_0_22px_rgba(34,211,238,.6)] group-hover/video:scale-90 group-hover/video:opacity-0 group-focus-visible/video:scale-90 group-focus-visible/video:opacity-0"><HiOutlinePlay className="ml-0.5 h-6 w-6" /></span>
                </button>
                : project.videoId
                  ? <iframe src={`https://www.youtube-nocookie.com/embed/${project.videoId}?rel=0`} title={`${project.name} project video`} loading="lazy" className="h-full w-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                  : <><img src={project.image} alt={`${project.name} — ${project.location}`} loading="lazy" className="home-case-media h-full w-full object-cover transition-transform duration-[1200ms] ease-out md:group-hover:scale-[1.06]" /><div className="absolute inset-0 bg-gradient-to-t from-paint-blue-14 via-paint-blue-14/10 to-transparent" /></>}
              {!project.videoSrc && !project.videoId && <span className="absolute bottom-4 left-5 rounded-full border border-white/15 bg-paint-section/75 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[.18em] text-paint-primary backdrop-blur-xl">{project.industry}</span>}
            </div>
            <div className="home-case-copy relative z-20 flex flex-1 flex-col p-4 sm:p-5">
              <p className="text-[11px] leading-5 text-slate-400 sm:text-[12px]">{project.description}</p>
              <div className="mt-4 space-y-1.5 border-t border-white/10 pt-4">
                {project.highlights.map(highlight => <p key={highlight} className="text-[11px] font-semibold text-paint-cyan">{highlight}</p>)}
              </div>
              <Link to={`/projects/${project.id}`} className="mt-auto inline-flex w-fit items-center gap-2 pt-5 text-[11px] font-semibold text-paint-muted transition hover:gap-3 hover:text-paint-accent focus-visible:text-paint-accent">Read the full story <HiOutlineArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
            </div>
          </motion.article>)}
        </div>
      </Container>
    </section>
  )
}
