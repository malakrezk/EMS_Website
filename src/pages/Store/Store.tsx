import Container from '../../components/layout/Container'
import GlowRibbons from '../../components/common/GlowRibbons'
import PageBackground from '../../components/common/PageBackground'
import { images } from '../../constants/images'
import BenefitsSection from './components/BenefitsSection'
import CatalogSection from './components/CatalogSection'

import {
  HiOutlineCheckBadge,
  HiOutlineChevronRight
} from 'react-icons/hi2'
import { Link } from 'react-router-dom'

export default function Store() {

  return (
    <div className="engineering-page-background relative min-h-screen overflow-hidden pb-24 pt-28 sm:pt-36 text-white">
      <PageBackground />
      {/* Subtle ambient lighting */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-paint-accent/05 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 top-40 h-[450px] w-[450px] rounded-full bg-paint-cyan/05 blur-[140px]" />

      <Container className="relative mx-auto max-w-[1400px]">
        <div className="relative">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="relative flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
            <Link to="/" className="touch-target transition hover:text-white">Home</Link>
            <HiOutlineChevronRight className="h-3 w-3 text-slate-600" />
            <span className="text-paint-accent font-semibold">Store</span>
          </nav>

          {/* Clean Store Header */}
          <header className="relative isolate mt-4 overflow-hidden pb-8 pt-8 text-center sm:pb-10 sm:pt-10">
            <GlowRibbons className="!absolute !left-auto !top-auto bottom-0 right-0 !h-full !w-2/3 -z-10 opacity-20" />
            <div className="mx-auto flex max-w-6xl flex-col items-center">
              <h1 className="font-display text-[clamp(1.75rem,3.6vw,3.25rem)] font-semibold lg:whitespace-nowrap leading-[1.05] tracking-[-0.035em] text-paint-neutral-14">
                Industrial Automation, Delivered.
              </h1>
              <p className="mt-4 max-w-3xl text-[clamp(1rem,1.65vw,1.35rem)] leading-[1.55] text-slate-300">
                Explore reliable industrial hardware and control solutions for your next project.
              </p>
              <div className="mt-5 flex w-fit items-center justify-center gap-2 text-[11px] font-semibold text-paint-muted sm:text-xs">
                <HiOutlineCheckBadge aria-hidden="true" className="h-[17px] w-[17px] shrink-0 text-paint-accent" />
                <span>Siemens Certified Partner</span>
                <img src={images.siemens} alt="Siemens" className="ml-1 h-3.5 w-auto object-contain" />
              </div>
            </div>
          </header>
        </div>

        {/* Catalog Search & Filters */}
        <CatalogSection />

        <BenefitsSection />
      </Container>
    </div>
  )
}
