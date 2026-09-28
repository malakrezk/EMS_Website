import {
  HiOutlineWrenchScrewdriver
} from 'react-icons/hi2'
import AppButton from '../../../components/common/AppButton'
import Container from '../../../components/layout/Container'
import type { Service } from '../../../types/content.types'

interface ContactSectionProps {
  service: Service
}
export default function ContactSection({ service }: ContactSectionProps) {
  return (
    <section className="relative overflow-hidden py-28 text-center"><img src={service.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-30" /><div className="absolute inset-0 bg-paint-section/85" /><Container className="relative"><HiOutlineWrenchScrewdriver className="mx-auto h-9 w-9 text-cyan-300" /><h2 className="mx-auto mt-6 max-w-3xl font-serif text-4xl md:text-5xl">Ready to engineer your next system?</h2><p className="mx-auto mt-5 max-w-xl text-slate-300">Talk with our specialists about requirements, constraints, timelines, and the right path forward.</p><div className="mt-8 flex flex-wrap justify-center gap-4"><AppButton to="/contact" className="">Request Consultation</AppButton><AppButton variant="outline" to="/contact" className="">Talk to an Engineer</AppButton></div></Container></section>
  )
}
