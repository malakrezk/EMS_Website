import { motion } from 'framer-motion'
import type { IconType } from 'react-icons'
import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import AppButton from '../../../components/common/AppButton'
import Container from '../../../components/layout/Container'
import type { Industry } from '../../../types/content.types'

interface HeroSectionProps {
  industry: Industry
  Icon: IconType
}
export default function HeroSection({ industry, Icon }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-[680px] items-end overflow-hidden pb-20 pt-28"><motion.img initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }} src={industry.image} alt={`${industry.title} infrastructure`} className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-paint-neutral-08/95 via-paint-section/70 to-transparent" /><div className="absolute inset-0 bg-gradient-to-t from-paint-section via-transparent to-paint-section/30" /><Container className="relative"><Link to="/" className="inline-flex items-center gap-2 text-xs text-slate-300 hover:text-cyan-200"><HiOutlineArrowLeft /> Back to industries</Link><Icon className="mt-8 h-8 w-8 text-cyan-300" /><p className="mt-5 text-xs uppercase tracking-[.3em] text-cyan-300">Industry expertise</p><h1 className="mt-4 max-w-3xl font-serif text-4xl sm:text-5xl md:text-6xl">Smart engineering for {industry.title}</h1><p className="mt-5 max-w-2xl text-base leading-7 text-slate-200">{industry.description}</p><AppButton to="/contact" className="mt-8">Discuss Your Project <HiOutlineArrowRight /></AppButton></Container></section>
  )
}
