import { useRef, useState } from 'react'
import {
  HiOutlineArrowRight,
  HiOutlineCheckBadge,
  HiOutlinePlay,
  HiOutlineSpeakerWave, HiOutlineSpeakerXMark
} from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import Container from '../../../components/layout/Container'
import { images } from '../../../constants/images'
import '../Home.css'
import Eyebrow from '../components/Eyebrow'

export default function HeroSection() {
  const heroVideoRef = useRef<HTMLVideoElement>(null)
  const [heroMuted, setHeroMuted] = useState(true)

  return (
    <section id="home-hero" className="relative min-h-[100svh] scroll-mt-20 overflow-hidden">
      {/* Full-width hero video with smooth left-panel shade */}
      <div aria-hidden="true" className="absolute inset-0 z-[1] overflow-hidden">
        <video
          ref={heroVideoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{ willChange: 'transform' }}
          className="pointer-events-none absolute inset-0 h-full w-full object-contain object-right"
        >
          <source src={images.alNamaHero} type="video/mp4" />
        </video>
        {/* Smooth left-panel shade — wide gradient for cinematic fade */}
        <div className="home-hero-video-shade" />
        {/* Top fade behind navbar */}
        <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,var(--paint-hero)_0%,rgba(0,8,22,.7)_5%,rgba(0,8,22,.25)_12%,transparent_20%)]" />
        {/* Bottom vignette */}
        <div className="absolute inset-0 z-10 bg-[linear-gradient(0deg,rgba(1,11,31,.6)_0%,rgba(1,11,31,.2)_8%,transparent_18%)]" />
      </div>

      <Container className="home-hero-content relative z-10 flex min-h-[100svh] items-center pt-28">
        <div className="home-hero-column relative">
          <div className="home-hero-support"><Eyebrow className="home-hero-eyebrow">Engineering Management Systems · Since 2016</Eyebrow></div>
          <div className="relative">
            <div aria-hidden="true" className="pointer-events-none absolute -inset-x-8 -inset-y-6 -z-10 rounded-[2rem] bg-[linear-gradient(90deg,rgba(2,11,24,.18)_0%,rgba(16,42,67,.15)_100%)] blur-2xl" />
            <h1 className="home-hero-title mt-16">
              <span className="home-hero-word"><span className="home-hero-line-primary">Artificial Intelligence</span></span>
              <span className="home-hero-word">
                <span className="home-hero-line-secondary">
                  <span className="home-hero-highlight">Automation</span>{' '}
                  <span className="home-hero-ampersand">&amp;</span>{' '}
                  <span className="home-hero-digitalization">Digitalization</span>
                </span>
              </span>
            </h1>
          </div>
          <p className="home-hero-technologies home-hero-support mt-20">BMS · SCADA · IoT · AI · Digital Twin · Robotics</p>
          <div className="home-hero-actions home-hero-support mt-12 flex flex-wrap gap-3">
            <Link to="/solutions" className="home-hero-action home-hero-primary gap-2">Explore Solutions <HiOutlineArrowRight aria-hidden="true" /></Link>
            <Link to="/projects" className="home-hero-action home-hero-secondary">View Projects</Link>
          </div>
          <div className="home-hero-trust home-hero-support mt-10">
            <div className="home-hero-trust-item flex w-fit items-center gap-2 text-[11px] font-semibold text-paint-muted sm:text-xs">
              <HiOutlineCheckBadge aria-hidden="true" className="h-[17px] w-[17px] shrink-0 text-paint-accent" />
              <span>Siemens Certified Partner</span>
              <img src={images.siemens} alt="Siemens" className="ml-1 h-3.5 w-auto object-contain" />
            </div>
          </div>
        </div>
      </Container>

      <div className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex"><span className="font-mono text-[8px] uppercase tracking-[.28em] text-white/50">Scroll to explore</span><span className="home-scroll-line relative h-10 w-px overflow-hidden bg-white/15" /></div>
      <div className="absolute bottom-8 right-[max(1.5rem,4vw)] z-10 flex items-center gap-4">
        <button
          type="button"
          onClick={() => {
            const video = heroVideoRef.current
            if (!video) return
            video.muted = !video.muted
            setHeroMuted(video.muted)
          }}
          aria-label={heroMuted ? 'Unmute video' : 'Mute video'}
          className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-paint-navy/60 text-white/70 backdrop-blur-md transition-all duration-300 hover:border-paint-accent/60 hover:bg-paint-navy/80 hover:text-white hover:shadow-[0_0_20px_rgba(50,169,245,.15)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-paint-accent"
        >
          {heroMuted
            ? <HiOutlineSpeakerXMark className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            : <HiOutlineSpeakerWave className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
          }
        </button>
        <span className="hidden font-mono text-[9px] uppercase tracking-[.2em] text-white/45 lg:flex lg:items-center lg:gap-3"><HiOutlinePlay className="text-paint-primary" /> Cinematic infrastructure</span>
      </div>
    </section>
  )
}
