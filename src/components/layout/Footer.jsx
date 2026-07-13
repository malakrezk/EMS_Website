import { Link } from 'react-router-dom'
import { HiOutlineEnvelope, HiOutlineMapPin, HiOutlinePhone } from 'react-icons/hi2'
import { services } from '../../data/services'
import { regionalMarkets } from '../../data/zeta'

const links = [
  ['/about', 'About'], ['/services', 'Services'], ['/solutions', 'Solutions'],
  ['/projects', 'Case Studies'], ['/contact', 'Contact Us'],
]

export default function Footer() {
  return <footer className="border-t border-white/10 bg-[#020812] text-white/65"><div className="container-ems py-[clamp(3.5rem,7vw,6rem)]"><div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_.7fr_1fr_1.15fr]">
    <div><Link to="/" aria-label="EMS home"><img src="/ems-logo.png" alt="EMS Engineering Management Systems" width="331" height="101" className="h-auto w-48 object-contain object-left" /></Link><p className="mt-5 max-w-sm text-[13px] leading-6 text-white/45">Connected building and infrastructure operations through BMS, SCADA, IoT, AI, digital twins and robotics.</p><a href="https://www.ems-me.com" className="mt-4 inline-block text-xs text-cyan-300">www.ems-me.com</a></div>
    <div><h3 className="text-xs font-semibold uppercase tracking-[.2em] text-white">Navigate</h3><ul className="mt-5 space-y-3 text-sm">{links.map(([to, label]) => <li key={to}><Link to={to} className="transition hover:text-cyan-300">{label}</Link></li>)}</ul></div>
    <div><h3 className="text-xs font-semibold uppercase tracking-[.2em] text-white">Capabilities</h3><ul className="mt-5 space-y-3 text-sm">{services.map(service => <li key={service.id}><Link to={`/services/${service.id}`} className="transition hover:text-cyan-300">{service.label}</Link></li>)}</ul></div>
    <div><h3 className="text-xs font-semibold uppercase tracking-[.2em] text-white">Contact</h3><ul className="mt-5 space-y-4 text-[13px] leading-6"><li className="flex gap-3"><HiOutlineMapPin className="mt-1 h-4 w-4 flex-none text-cyan-400" /><span>Villa 17, Bayram El-Tunsi St., El Nargis 2, Fifth Settlement, New Cairo, Egypt</span></li><li className="flex items-center gap-3"><HiOutlinePhone className="h-4 w-4 flex-none text-cyan-400" /><a href="tel:+201202542095">+20 120 254 2095</a></li><li className="flex items-center gap-3"><HiOutlineEnvelope className="h-4 w-4 flex-none text-cyan-400" /><a href="mailto:info@ems-me.com">info@ems-me.com</a></li></ul><p className="mt-6 text-[10px] uppercase tracking-[.18em] text-white/35">{regionalMarkets.join(' · ')}</p></div>
  </div></div><div className="border-t border-white/10"><div className="container-ems flex flex-col gap-2 py-6 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} EMS Engineering Management Systems.</p><p>ZETA connected operations platform.</p></div></div></footer>
}
