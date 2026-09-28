import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  HiOutlineArrowUpRight,
  HiOutlineCheckBadge,
  HiOutlineEye
} from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import Container from '../../../components/layout/Container'
import { images } from '../../../constants/images'
import '../Home.css'
import { aboutMilestones, ease, featuredPartners } from '../Home.data'
import Eyebrow from '../components/Eyebrow'

export default function AboutSection() {
  const [partnersUnderlineVisible, setPartnersUnderlineVisible] = useState(false)

  return (
    <section id="home-about" className="home-major-section relative scroll-mt-20 overflow-hidden border-t border-white/10 bg-[radial-gradient(circle_at_50%_-10%,rgba(35,199,255,.13),transparent_38%),radial-gradient(circle_at_8%_58%,rgba(41,155,240,.12),transparent_32%),radial-gradient(circle_at_92%_72%,rgba(20,88,145,.16),transparent_34%),linear-gradient(145deg,var(--paint-neutral-06)_0%,var(--paint-blue-12)_48%,var(--paint-blue-06)_100%)]">
      <div className="home-grid pointer-events-none absolute inset-0 opacity-[.14] [mask-image:radial-gradient(ellipse_at_center,black,transparent_76%)]" />
      <div className="pointer-events-none absolute inset-x-[12%] top-0 h-px bg-gradient-to-r from-transparent via-paint-cyan/45 to-transparent" />
      <div className="home-case-orb pointer-events-none absolute -left-36 top-24 h-80 w-80 rounded-full bg-paint-primary/12 blur-[120px]" />
      <div className="home-case-orb is-delayed pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-paint-blue-33/12 blur-[150px]" />

      <Container className="relative">
        <div className="mx-auto max-w-5xl text-center">
          <div className="home-reveal home-about-intro">
            <Eyebrow>About EMS</Eyebrow>
            <p className="mx-auto mt-6 max-w-4xl text-[clamp(.9rem,1.3vw,1.08rem)] leading-8 text-slate-300">EMS delivers integrated MEP, automation and smart infrastructure solutions that connect buildings, operations and technology across Egypt, England and the GCC.</p>
          </div>
        </div>

        <div className="relative mx-auto mt-14 max-w-[1450px] lg:mt-16">
          <span className="absolute left-5 right-5 top-[17px] hidden h-px bg-gradient-to-r from-transparent via-paint-primary/55 to-transparent md:block" />
          <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
            {aboutMilestones.map(([title, text, Icon], index) => (
              <motion.article key={title} initial={{ opacity: 0, y: 24, scale: .97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: '-50px' }} whileHover={{ y: -6, scale: 1.01 }} transition={{ duration: .6, delay: index * .09, ease }} className="group relative pt-0 md:pt-8">
                <span className="relative z-10 mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-paint-primary/50 bg-paint-blue-09 text-paint-cyan shadow-[0_0_25px_rgba(41,155,240,.2)] md:absolute md:left-0 md:top-0">
                  <Icon aria-hidden="true" className="h-5 w-5 transition duration-300 group-hover:scale-110" />
                </span>
                <div className="h-full min-h-36 rounded-2xl border border-white/[.04] bg-paint-panel/80 p-6 transition duration-500 group-hover:border-paint-primary/30 group-hover:bg-paint-card/75 group-hover:shadow-[0_20px_45px_rgba(0,0,0,.2)]">
                  <h3 className="text-sm font-bold text-paint-cyan">{title}</h3>
                  <p className="mt-1.5 text-[12px] leading-[1.55] text-slate-400">{text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-[1450px] gap-8 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <motion.article initial={{ opacity: 0, x: -24, scale: .98 }} whileInView={{ opacity: 1, x: 0, scale: 1 }} viewport={{ once: true, margin: '-60px' }} whileHover={{ y: -6, scale: 1.01 }} transition={{ duration: .7, ease }} className="group relative isolate overflow-hidden rounded-2xl border border-paint-primary/25 bg-[linear-gradient(135deg,var(--paint-card)_0%,var(--paint-panel)_72%)] p-7 transition-shadow duration-500 hover:shadow-[0_24px_60px_rgba(0,0,0,.24)] sm:p-8 lg:col-span-6">
            <span className="absolute -right-2 -top-10 -z-10 font-serif text-[9rem] leading-none text-white/[.025]">01</span>
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-paint-cyan/25 bg-paint-cyan/10 text-paint-cyan"><HiOutlineCheckBadge className="h-5 w-5" /></span>
              <span className="font-mono text-[8px] uppercase tracking-[.22em] text-slate-500">Our purpose</span>
            </div>
            <h3 className="mt-5 font-serif text-[clamp(1.65rem,2.35vw,2.2rem)]">Our Mission</h3>
            <p className="mt-3 max-w-xl text-[13px] leading-6 text-slate-300">Analyze customer needs without compromising satisfaction—delivering economical, fast and high-quality solutions through full-scope MEP works and modern technologies.</p>
            <Link to="/about" className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold text-paint-cyan transition hover:gap-3 hover:text-white">Read our story <HiOutlineArrowUpRight /></Link>
          </motion.article>

          <motion.article initial={{ opacity: 0, x: 24, scale: .98 }} whileInView={{ opacity: 1, x: 0, scale: 1 }} viewport={{ once: true, margin: '-60px' }} whileHover={{ y: -6, scale: 1.01 }} transition={{ duration: .7, delay: .08, ease }} className="group relative isolate overflow-hidden rounded-2xl border border-paint-primary/25 bg-[linear-gradient(135deg,var(--paint-panel)_0%,var(--paint-card)_100%)] p-7 transition-shadow duration-500 hover:shadow-[0_24px_60px_rgba(0,0,0,.24)] sm:p-8 lg:col-span-6">
            <span className="absolute -right-2 -top-10 -z-10 font-serif text-[9rem] leading-none text-white/[.025]">02</span>
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-paint-cyan/25 bg-paint-cyan/10 text-paint-cyan"><HiOutlineEye className="h-5 w-5" /></span>
              <span className="font-mono text-[8px] uppercase tracking-[.22em] text-slate-500">Our direction</span>
            </div>
            <h3 className="mt-5 font-serif text-[clamp(1.65rem,2.35vw,2.2rem)]">Our Vision</h3>
            <p className="mt-3 max-w-xl text-[13px] leading-6 text-slate-300">Be a distinctive and independent MEP provider delivering modern, highly professional services across complete MEP requirements and the latest technologies.</p>
            <Link to="/about" className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold text-paint-cyan transition hover:gap-3 hover:text-white">Explore our direction <HiOutlineArrowUpRight /></Link>
          </motion.article>
        </div>

        <div className="mx-auto mt-16 max-w-[1450px] lg:mt-20">
          <p className="mx-auto max-w-4xl text-center text-[clamp(1rem,1.5vw,1.3rem)] leading-relaxed text-paint-muted">Meet the visionary behind EMS&apos;s innovative smart infrastructure solutions.</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .75, ease }} className="mx-auto mt-10 grid max-w-[1450px] items-center gap-12 lg:grid-cols-[.92fr_1.08fr] lg:gap-16">
          <section className="px-2 sm:px-4">
            <div className="relative w-fit">
              <img src={images.ahmedElzayat} alt="Ahmed Elzayat, CEO and Founder of EMS" loading="lazy" className="h-52 w-52 rounded-full border-4 border-paint-primary/35 object-cover object-top shadow-[0_20px_55px_rgba(0,0,0,.35)] sm:h-56 sm:w-56" />
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-paint-primary/40 bg-paint-primary px-4 py-2 text-[11px] font-bold uppercase tracking-[.08em] text-paint-navy shadow-lg">CEO &amp; Founder</span>
            </div>
            <h3 className="mt-9 font-sans text-[clamp(1.55rem,2.2vw,2rem)] font-bold text-white">Eng. Ahmed El-Zayat</h3>
            <p className="mt-4 max-w-2xl text-[clamp(.85rem,1.1vw,1rem)] leading-7 text-paint-muted">With over 15 years of experience in IoT and AI technologies, Engineer Ahmed El-Zayat has led EMS to become a pioneer in smart infrastructure solutions. His vision is to transform how organizations operate through innovative technology integration.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="https://www.facebook.com/share/1LkNgGndZa/?mibextid=wwXIfr" target="_blank" rel="noreferrer" className="brand-gradient-button rounded-lg px-5 py-3 text-[12px] font-semibold">View Facebook Profile</a>
              <a href="https://eg.linkedin.com/in/ahmed-elzayat-a8325b41" target="_blank" rel="noreferrer" className="rounded-lg border border-paint-primary px-5 py-3 text-[12px] font-semibold text-paint-primary transition hover:bg-paint-primary hover:text-paint-navy">Connect on LinkedIn</a>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-paint-primary/25 bg-paint-panel shadow-[0_28px_80px_rgba(0,0,0,.24)] transition duration-500 hover:-translate-y-1 hover:border-paint-primary/45 hover:shadow-[0_32px_90px_rgba(0,0,0,.3)]">
            <div className="p-6 sm:px-7 sm:py-6">
              <h3 className="font-sans text-[clamp(1.3rem,1.8vw,1.65rem)] font-bold text-white">Featured Podcast</h3>
              <p className="mt-2 text-[clamp(.84rem,1.05vw,.98rem)] leading-6 text-paint-muted">Engineer Ahmed El-Zayat discusses the significance of Artificial Intelligence in enhancing and improving our daily lives in a special podcast episode.</p>
            </div>
            <div className="overflow-hidden border-t border-paint-primary/25 bg-paint-blue-09">
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

        <div className="relative mx-auto mt-20 max-w-[1250px] lg:mt-24">
          <div aria-hidden="true" className="home-partners-aura pointer-events-none absolute inset-x-[14%] top-8 h-32 rounded-full bg-[linear-gradient(90deg,rgba(41,155,240,.16),rgba(35,199,255,.12),rgba(33,211,184,.13))] blur-[70px]" />
          <div className="home-reveal text-center">
            <button
              type="button"
              aria-pressed={partnersUnderlineVisible}
              onClick={() => setPartnersUnderlineVisible(visible => !visible)}
              className="home-partners-title rounded-sm font-mono text-[clamp(1.1rem,1.8vw,1.55rem)] font-extrabold uppercase tracking-[.22em] outline-none focus-visible:ring-2 focus-visible:ring-paint-primary focus-visible:ring-offset-4 focus-visible:ring-offset-paint-blue-09"
            >
              Our Partners
            </button>
            <span
              aria-hidden="true"
              className={`mx-auto mt-4 block h-0.5 rounded-full bg-gradient-to-r from-paint-primary via-paint-cyan to-paint-action-green transition-[width,opacity] duration-500 ${partnersUnderlineVisible ? 'w-24 opacity-100' : 'w-12 opacity-60'}`}
            />
          </div>

          <div className="relative mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-5 sm:grid-cols-4 sm:gap-6 lg:gap-8">
            {featuredPartners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 22, scale: .94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                whileHover={{ y: -6, scale: 1.035 }}
                transition={{ duration: .55, delay: index * .08, ease }}
                className="home-partner-logo-card flex h-24 items-center justify-center rounded-2xl px-5 sm:h-28"
              >
                <img src={partner.logo} alt={`${partner.name} logo`} loading="lazy" className={`relative z-10 h-8 w-28 object-contain opacity-90 transition-opacity hover:opacity-100 sm:h-9 sm:w-32 ${partner.id === 'oracle' ? 'scale-[2.35]' : ''}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
