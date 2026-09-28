import {
  HiOutlineArrowRight,
  HiOutlineBolt
} from 'react-icons/hi2'
import AppButton from '../../../components/common/AppButton'
import Reveal from '../../../components/ui/Reveal'
import '../About.css'
import { images } from '../About.data'

export default function ContactSection() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 py-[clamp(4.5rem,8vw,7rem)] text-center"><img src={images.operations} alt="Connected operations environment" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-15" /><div className="absolute inset-0 bg-paint-navy/85" /><Reveal className="container-ems relative"><HiOutlineBolt className="mx-auto h-7 w-7 text-paint-primary" /><p className="eyebrow mt-5 justify-center">07 / Talk to our engineering team</p><h2 className="type-section-title mx-auto mt-4 max-w-3xl font-serif">Let&apos;s engineer what comes next.</h2><p className="type-body mx-auto mt-4 max-w-xl text-slate-400">Bring us your facility, infrastructure challenge or digital-transformation ambition.</p><div className="mt-7 flex flex-wrap justify-center gap-3"><AppButton to="/contact" className="">Start a Conversation <HiOutlineArrowRight /></AppButton><AppButton variant="outline" to="/services" className="">Explore Services</AppButton></div></Reveal></section>
  )
}
