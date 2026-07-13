import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineMapPin,
  HiOutlinePaperAirplane
} from 'react-icons/hi2'
import { FaLinkedinIn, FaXTwitter, FaFacebookF, FaYoutube } from 'react-icons/fa6'
import { services } from '../../data/services'
import { industries } from '../../data/industries'

const quickLinks = [
  { to: '/about', label: 'About Us' },
  { to: '/projects', label: 'Projects' },
  { to: '/partners', label: 'Partners' },
  { to: '/contact', label: 'Contact' }
]

const social = [
  { icon: FaLinkedinIn, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: FaXTwitter, href: 'https://x.com', label: 'X' },
  { icon: FaFacebookF, href: 'https://facebook.com', label: 'Facebook' },
  { icon: FaYoutube, href: 'https://youtube.com', label: 'YouTube' }
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    // No backend is wired up — this simulates a successful subscription for demo purposes.
    if (email) setSubscribed(true)
  }

  return (
    <footer className="bg-navy-900 text-white/70">
      {/* Newsletter */}
      <div className="border-b border-white/[0.08]">
        <div className="container-ems flex flex-col items-center justify-between gap-6 py-10 md:flex-row">
          <div className="text-center md:text-left">
            <h4 className="font-display text-lg font-semibold text-white">Stay ahead of the grid</h4>
            <p className="mt-1 text-sm text-white/50">Engineering insights and project news, occasionally, never spam.</p>
          </div>
          {subscribed ? (
            <p className="text-sm font-medium text-cyan-400">Thanks — you're subscribed.</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex w-full max-w-sm gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-md border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-cyan-500 focus:outline-none"
              />
              <button type="submit" aria-label="Subscribe" className="btn-primary flex-shrink-0 !px-4 !py-2.5">
                <HiOutlinePaperAirplane className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="container-ems py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex" aria-label="EMS home">
              <img src="/ems-logo.png" alt="EMS Engineering Management Systems" width="331" height="101" className="h-auto w-52 object-contain object-left" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/50">
              Engineering the systems that keep power flowing — SCADA, EMS, automation, protection, and control for
              critical infrastructure worldwide.
            </p>
            <div className="mt-6 flex gap-3">
              {social.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-white/60 transition-colors hover:border-cyan-500 hover:text-cyan-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="transition-colors hover:text-cyan-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Services</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {services.slice(0, 5).map((s) => (
                <li key={s.id}>
                  <Link to={`/services/${s.id}`} className="transition-colors hover:text-cyan-400">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Industries</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {industries.slice(0, 5).map((ind) => (
                <li key={ind.id}>
                  <Link to="/solutions" className="transition-colors hover:text-cyan-400">
                    {ind.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Contact</h4>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <HiOutlineMapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-500" />
                <span>Zeta Business Tower, Sheikh Zayed Road, Dubai, UAE</span>
              </li>
              <li className="flex items-center gap-3">
                <HiOutlinePhone className="h-4 w-4 flex-shrink-0 text-cyan-500" />
                <a href="tel:+97142223344" className="transition-colors hover:text-cyan-400">
                  +971 4 222 3344
                </a>
              </li>
              <li className="flex items-center gap-3">
                <HiOutlineEnvelope className="h-4 w-4 flex-shrink-0 text-cyan-500" />
                <a href="mailto:info@ems-me.com" className="transition-colors hover:text-cyan-400">
                  info@ems-me.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-ems flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/40 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} EMS Engineering Management Systems. All rights reserved.</p>
          <p>Built for reliable, resilient, and future-ready power networks.</p>
        </div>
      </div>
    </footer>
  )
}
