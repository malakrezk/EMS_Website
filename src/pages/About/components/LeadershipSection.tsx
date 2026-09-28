import { FaLinkedinIn } from 'react-icons/fa6'
import {
  HiOutlineArrowRight,
  HiOutlinePlay
} from 'react-icons/hi2'
import Container from '../../../components/layout/Container'
import Reveal from '../../../components/ui/Reveal'
import { images } from '../../../constants/images'
import '../About.css'
import SectionHeading from '../components/SectionHeading'

interface LeadershipSectionProps {
  playing: boolean
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>
}
export default function LeadershipSection({ playing, setPlaying }: LeadershipSectionProps) {
  return (
    <section className="section-padding about-section-rule border-y">
      <Container className=""><SectionHeading eyebrow="05 / Leadership" title="A vision shaped by engineering and enterprise." text="Meet the leadership guiding EMS toward more connected, sustainable infrastructure across the region." />
        <div className="mt-12 grid gap-6 lg:grid-cols-[.9fr_1.1fr]"><Reveal><article className="card-surface grid h-full overflow-hidden sm:grid-cols-[200px_1fr]"><div className="relative min-h-[280px] sm:min-h-full"><img src={images.ahmedElzayat} alt="Ahmed Elzayat, Founder and CEO of EMS" className="absolute inset-0 h-full w-full object-cover object-top" /><div className="absolute inset-0 bg-gradient-to-t from-paint-panel/55 to-transparent sm:bg-gradient-to-r" /></div><div className="flex flex-col justify-center p-6"><p className="font-mono text-[9px] uppercase tracking-[.22em] text-paint-blue-45">Founder &amp; CEO</p><h3 className="type-subheading mt-3 font-serif">Ahmed Elzayat</h3><p className="mt-4 text-[13px] leading-6 text-slate-400">A mechanical power engineer and business leader with two decades of experience across Egypt and GCC markets, connecting rigorous engineering delivery with intelligent automation and digital transformation.</p><div className="mt-6 flex flex-wrap gap-2"><a href="https://enterpriseam.com/egypt/2024/10/31/my-morning-routine-ahmed-elzayat-founder-and-ceo-of-engineering-management-systems/" target="_blank" rel="noreferrer" className="btn-outline">Biography <HiOutlineArrowRight /></a><a href="https://eg.linkedin.com/in/ahmed-elzayat-a8325b41" target="_blank" rel="noreferrer" className="btn-primary"><FaLinkedinIn /> LinkedIn</a></div></div></article></Reveal><Reveal delay={.08}><article className="card-surface h-full overflow-hidden">{playing ? <iframe title="Ahmed Elzayat featured interview" src="https://www.youtube-nocookie.com/embed/_xLHsVvXjvE?autoplay=1&rel=0" className="aspect-video w-full border-0" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /> : <button type="button" onClick={() => setPlaying(true)} className="group relative block aspect-video w-full overflow-hidden text-left"><img src="https://img.youtube.com/vi/_xLHsVvXjvE/maxresdefault.jpg" alt="Ahmed Elzayat featured interview" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-paint-navy/25 transition group-hover:bg-paint-navy/10" /><span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-paint-navy/80 text-white shadow-xl transition group-hover:scale-110 group-hover:bg-[rgb(33,124,154)]"><HiOutlinePlay className="ml-1 h-6 w-6" /></span></button>}<div className="p-5 sm:p-6"><p className="font-mono text-[9px] uppercase tracking-[.22em] text-paint-blue-45">Featured conversation</p><h3 className="type-card-title mt-2 font-serif">Artificial intelligence and the future of daily life</h3><p className="mt-2 text-[12px] leading-5 text-slate-400">A closer look at the experience, innovation and ambition shaping EMS.</p></div></article></Reveal></div>
      </Container>
    </section>
  )
}
