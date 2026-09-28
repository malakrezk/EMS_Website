import { HiOutlineArrowRight } from 'react-icons/hi2'
import AppButton from '../../../components/common/AppButton'
import Container from '../../../components/layout/Container'
import type { Industry } from '../../../types/content.types'

interface ContactSectionProps {
  industry: Industry
}
export default function ContactSection({ industry }: ContactSectionProps) {
  return (
    <section className="relative overflow-hidden py-24 text-center"><img src={industry.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-25" /><div className="absolute inset-0 bg-paint-section/85" /><Container className="relative"><h2 className="mx-auto max-w-2xl font-serif text-3xl md:text-4xl">Build a better {industry.title.toLowerCase()} environment</h2><p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-300">Talk to EMS about the infrastructure, automation, and performance outcomes your next project demands.</p><AppButton to="/contact" className="mt-7">Request Consultation <HiOutlineArrowRight /></AppButton></Container></section>
  )
}
