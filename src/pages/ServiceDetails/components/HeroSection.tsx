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
import { reveal } from '../ServiceDetails.data'

interface HeroSectionProps {
  heroRef: React.RefObject<HTMLDivElement>
  heroY: MotionValue<string>
  service: Service
  Icon: IconType
}
export default function HeroSection({ heroRef, heroY, service, Icon }: HeroSectionProps) {
  return (
    <section ref={heroRef} className="relative flex min-h-[760px] items-end overflow-hidden pb-20 pt-28 md:min-h-[860px] md:pb-28">
      <motion.img style={{ y: heroY }} initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.8 }} src={service.image} alt="" className="absolute -inset-y-[12%] inset-x-0 h-[124%] w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-paint-neutral-08/95 via-paint-section/75 to-paint-section/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-paint-section via-transparent to-paint-section/35" />
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(var(--paint-gradient-01)_0.8px,transparent_0.8px)] [background-size:36px_36px]" />
      <Container className="relative z-10">
        <motion.div variants={reveal} initial="hidden" animate="show" className="max-w-4xl">
          <Link to="/services" className="mb-8 inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-cyan-200"><HiOutlineArrowLeft /> All services</Link>
          <div className="flex h-14 w-14 items-center justify-center rounded-sm border border-cyan-200/30 bg-cyan-300/10 text-cyan-200 backdrop-blur"><Icon className="h-7 w-7" /></div>
          <p className="mt-7 text-xs font-semibold uppercase tracking-[.32em] text-cyan-300">EMS Engineering Expertise</p>
          <h1 className="mt-4 font-serif text-4xl leading-[1.1] sm:text-5xl md:text-6xl">{service.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 md:text-lg">{service.short}</p>
          <AppButton to="/contact" className="mt-9">Request Consultation <HiOutlineArrowRight /></AppButton>
        </motion.div>
      </Container>
    </section>
  )
}
