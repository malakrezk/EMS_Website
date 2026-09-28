import { HiOutlineArrowRight } from 'react-icons/hi2'
import AppButton from '../../../components/common/AppButton'
import Container from '../../../components/layout/Container'

export default function ContactSection() {
  return (
    <section className="border-t border-white/10 bg-paint-blue-15 py-[clamp(3.5rem,6vw,5.5rem)] text-center"><Container className=""><h2 className="type-section-title mx-auto max-w-2xl font-serif">Plan the right connected architecture for your facility.</h2><p className="type-body mx-auto mt-4 max-w-xl text-slate-400">Discuss your operating environment, systems and deployment requirements with EMS.</p><AppButton to="/contact" className="mt-7">Talk to EMS <HiOutlineArrowRight /></AppButton></Container></section>
  )
}
