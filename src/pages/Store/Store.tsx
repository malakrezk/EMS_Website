import Container from '../../components/layout/Container'
import { images } from '../../constants/images'
import BenefitsSection from './components/BenefitsSection'
import CatalogSection from './components/CatalogSection'
import { storePerks } from './Store.data'

import {
  HiOutlineCheck,
  HiOutlineCheckBadge,
  HiOutlineChevronRight
} from 'react-icons/hi2'
import { Link } from 'react-router-dom'

export default function Store() {

  return (
    <div className="relative min-h-screen overflow-hidden bg-paint-navy pb-24 pt-28 sm:pt-36 text-white">
      {/* Subtle ambient lighting */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-paint-accent/05 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 top-40 h-[450px] w-[450px] rounded-full bg-paint-cyan/05 blur-[140px]" />

      <Container className="relative mx-auto max-w-[1400px]">
        <div className="relative">
          {/* Animated hero background (brand button gradient) */}
          <div aria-hidden="true" className="store-hero-bg pointer-events-none absolute -top-28 bottom-0 left-1/2 w-screen -translate-x-1/2 overflow-hidden sm:-top-36">
            <span className="store-hero-shine absolute inset-0" />
          </div>

          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="relative flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
            <Link to="/" className="transition hover:text-white">Home</Link>
            <HiOutlineChevronRight className="h-3 w-3 text-slate-600" />
            <span className="text-paint-accent font-semibold">Store</span>
          </nav>

          {/* Clean Store Header */}
          <header className="relative mt-8 pb-20 pt-10 text-center sm:pb-28 sm:pt-16">
            <div className="mx-auto flex max-w-6xl flex-col items-center">
              <h1 className="font-display text-[clamp(1.75rem,3.6vw,3.25rem)] font-semibold lg:whitespace-nowrap leading-[1.05] tracking-[-0.035em] text-paint-neutral-14">
                Your Trusted Industrial Hardware Store
              </h1>
              <p className="mt-6 max-w-4xl text-[clamp(1rem,1.65vw,1.35rem)] leading-[1.55] text-slate-300">
                Discover reliable PLCs, HMIs, I/O modules, communication devices, and instrumentation with expert engineering support.
              </p>
              <div className="mt-7 flex w-fit items-center justify-center gap-2 text-[11px] font-semibold text-paint-muted sm:text-xs">
                <HiOutlineCheckBadge aria-hidden="true" className="h-[17px] w-[17px] shrink-0 text-paint-accent" />
                <span>Siemens Certified Partner</span>
                <img src={images.siemens} alt="Siemens" className="ml-1 h-3.5 w-auto object-contain" />
              </div>
            </div>
          </header>
        </div>

        {/* Store Perks Marquee */}
        <div className="store-perks-strip relative left-1/2 w-screen -translate-x-1/2 overflow-hidden py-4">
          <span aria-hidden="true" className="store-hero-shine pointer-events-none absolute inset-0" />
          <div className="partner-marquee-track relative flex w-max hover:[animation-play-state:paused]">
            {[0, 1].map((copy) => (
              <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
                {Array.from({ length: 3 }).flatMap((_, round) =>
                  storePerks.map((perk) => (
                    <li key={`${round}-${perk}`} className="flex items-center gap-2 whitespace-nowrap px-10 text-sm font-bold text-paint-navy sm:text-base">
                      <HiOutlineCheck aria-hidden="true" className="h-5 w-5 shrink-0 stroke-[2.5]" />
                      {perk}
                    </li>
                  ))
                )}
              </ul>
            ))}
          </div>
        </div>

        {/* Catalog Search & Filters */}
        <CatalogSection />

        <BenefitsSection />
      </Container>
    </div>
  )
}
