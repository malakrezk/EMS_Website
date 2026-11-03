import type { MotionValue } from 'framer-motion'
import { motion } from 'framer-motion'
import type { IconType } from 'react-icons'
import {
  HiOutlineArrowLeft, HiOutlineArrowRight
} from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import AppButton from '../../../components/common/AppButton'
import Container from '../../../components/layout/Container'
import type { Service } from '../../../types/content.types'
import { heroOverrides, reveal } from '../ServiceDetails.data'

interface HeroSectionProps {
  heroRef: React.RefObject<HTMLDivElement>
  heroY: MotionValue<string>
  service: Service
  Icon: IconType
}
export default function HeroSection({ heroRef, heroY, service, Icon }: HeroSectionProps) {
  const override = heroOverrides[service.id]
  const centered = override?.centered
  return (
    <section ref={heroRef} className="relative flex min-h-[min(760px,100svh)] items-end overflow-hidden pb-20 pt-28 md:min-h-[min(860px,100svh)] md:pb-28">
      {/* A wide artwork with text near its edges is shown without the parallax overscan, so nothing is cropped away. */}
      <motion.img style={override?.fullImage ? undefined : { y: heroY }} initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.8 }} src={override?.image ?? service.image} alt="" className={override?.fullImage ? 'absolute inset-0 h-full w-full object-cover' : 'absolute -inset-y-[12%] inset-x-0 h-[124%] w-full object-cover'} />
      {/* Text on the left is backed by darkening the artwork from the left. Centred text gets an even dim, a fade up from the bottom and a soft shadow right behind it, all of which leave the top of the subject clear. */}
      {centered
        ? <><div className="absolute inset-0 bg-paint-neutral-08/35" /><div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-paint-section via-paint-section/75 to-transparent" /><div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_42%_at_50%_70%,color-mix(in_srgb,var(--paint-section)_88%,transparent),transparent)]" /></>
        : <div className="absolute inset-0 bg-gradient-to-r from-paint-neutral-08/95 via-paint-section/75 to-paint-section/20" />}
      <div className="absolute inset-0 bg-gradient-to-t from-paint-section via-transparent to-paint-section/35" />
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(var(--paint-gradient-01)_0.8px,transparent_0.8px)] [background-size:36px_36px]" />
      {/* Refined layout: the back link sits at the top of the hero, apart from the bottom-aligned text. */}
      {override?.refined && <Container className="absolute inset-x-0 top-28 z-10 md:top-32"><Link to="/services" className="touch-target inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-cyan-200"><HiOutlineArrowLeft /> All services</Link></Container>}
      <Container className="relative z-10">
        <motion.div variants={reveal} initial="hidden" animate="show" className={centered ? 'mx-auto max-w-4xl text-center' : 'max-w-4xl'}>
          {!override?.refined && <Link to="/services" className="touch-target mb-8 inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-cyan-200"><HiOutlineArrowLeft /> All services</Link>}
          {!override?.refined && <div className="flex h-14 w-14 items-center justify-center rounded-sm border border-cyan-200/30 bg-cyan-300/10 text-cyan-200 backdrop-blur"><Icon className="h-7 w-7" /></div>}
          <p className={`${override?.refined ? 'mt-0' : 'mt-7'} text-xs font-semibold uppercase tracking-[.32em] text-cyan-300`}>EMS Engineering Expertise</p>
          <h1 className={`${override?.refined ? 'mt-12 md:mt-16' : 'mt-4'} font-serif text-4xl leading-[1.1] sm:text-5xl md:text-6xl`} style={override?.compactTitle ? { fontSize: 'clamp(2.25rem, 3.6vw, 3.25rem)' } : undefined}>{override?.title ?? service.title}</h1>
          <p className={`${override?.refined ? 'mt-6 leading-8' : 'mt-5 leading-7'} ${centered ? 'mx-auto' : ''} max-w-2xl text-base text-slate-200 md:text-lg`}>{service.short}</p>
          <AppButton to="/contact" className={override?.refined ? 'mt-12 md:mt-14' : 'mt-9'}>Request Consultation <HiOutlineArrowRight /></AppButton>
        </motion.div>
      </Container>
    </section>
  )
}
