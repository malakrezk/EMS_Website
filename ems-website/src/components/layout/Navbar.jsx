import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineBars3, HiOutlineGlobeAlt, HiOutlineXMark } from 'react-icons/hi2'
import { cn } from '../../utils/cn'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/solutions', label: 'Solutions' },
  { to: '/projects', label: 'Case Studies' }
]

function EgyptFlag() {
  return (
    <svg viewBox="0 0 36 24" role="img" aria-label="Egypt flag" className="h-3.5 w-[22px] shrink-0 overflow-hidden rounded-[2px]">
      <path fill="#ce1126" d="M0 0h36v8H0z" />
      <path fill="#fff" d="M0 8h36v8H0z" />
      <path fill="#000" d="M0 16h36v8H0z" />
      <path fill="#c8a54b" d="m18 9.2 2 1.1-.5 3.8h-3l-.5-3.8z" />
    </svg>
  )
}

function SaudiFlag() {
  return (
    <svg viewBox="0 0 36 24" role="img" aria-label="Saudi Arabia flag" className="h-3.5 w-[22px] shrink-0 overflow-hidden rounded-[2px]">
      <rect width="36" height="24" fill="#087a3e" />
      <path d="M9 16.7h18M11.5 18.3h13" stroke="#fff" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M12 8.2h12M10.5 10.4h15M13 12.6h10" stroke="#fff" strokeWidth="1" strokeLinecap="round" opacity=".95" />
    </svg>
  )
}

function NavbarRegions({ className = '' }) {
  return (
    <div className={cn('items-center gap-3 text-white', className)} aria-label="EMS regional presence">
      <HiOutlineGlobeAlt aria-hidden="true" className="h-5 w-5 shrink-0 text-white" />
      <div className="flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold">
        <EgyptFlag />
        <span>Egypt</span>
      </div>
      <span aria-hidden="true" className="h-4 w-px bg-white/25" />
      <div className="flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold">
        <SaudiFlag />
        <span>Saudi Arabia</span>
      </div>
    </div>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [pastHomeHero, setPastHomeHero] = useState(false)
  const location = useLocation()

  useEffect(() => {
    // Close mobile menu whenever the viewport is resized back to desktop
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const servicesSection = document.getElementById('home-services')
      const servicesTop = servicesSection?.offsetTop ?? window.innerHeight
      setPastHomeHero(location.pathname === '/' && window.scrollY >= servicesTop - 90)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition-all duration-500',
        open
          ? 'border-b border-white/10 bg-[#061326]/95 shadow-[0_10px_28px_rgba(3,13,28,0.25)] backdrop-blur-xl'
          : pastHomeHero
            ? 'border-b border-transparent bg-transparent shadow-none backdrop-blur-none'
            : scrolled
              ? 'border-b border-white/10 bg-[#061326]/90 shadow-[0_10px_28px_rgba(3,13,28,0.25)] backdrop-blur-xl'
              : 'border-b border-transparent bg-gradient-to-b from-[#061326]/75 to-transparent',
        open && 'shadow-lg'
      )}
    >
      <nav className={cn('container-ems grid grid-cols-[1fr_auto] items-center transition-all duration-500 lg:grid-cols-[1fr_auto_1fr]', scrolled ? 'h-[68px]' : 'h-[82px]')}>
        <Link to="/" className="flex min-w-0 items-center pl-2" onClick={() => setOpen(false)} aria-label="EMS home">
          <img
            src="/ems-logo.png"
            alt="EMS Engineering Management Systems"
            width="331"
            height="101"
            className="-ml-[20px] h-auto w-[220px] max-w-full object-contain object-left transition-all duration-500"
          />
        </Link>

        <div className="hidden lg:flex lg:items-center lg:justify-center lg:gap-4 xl:gap-7">
          {links.map((link) => {
            const isActive = link.to === '/' ? location.pathname === '/' : location.pathname.startsWith(link.to)
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={cn(
                  'group relative whitespace-nowrap px-0.5 py-2 text-[13px] font-medium text-white/75 transition-colors duration-200 hover:text-white',
                  isActive && 'text-white'
                )}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-cyan-300/80 transition-transform duration-300 group-hover:scale-x-100" />
                {isActive && (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className="absolute -bottom-1 left-0 h-px w-full bg-cyan-300"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </NavLink>
            )
          })}
        </div>
        <div className="hidden items-center justify-self-end gap-5 lg:flex">
          <NavbarRegions className="hidden xl:flex" />
          <Link to="/contact" className="inline-flex items-center rounded-full border border-[#32A9F5] bg-[#010B1F]/70 px-5 py-2 text-xs font-semibold text-white transition duration-300 hover:bg-[#32A9F5] hover:text-[#010B1F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#32A9F5]">Contact Us</Link>
        </div>

        <button
          className="flex h-11 w-11 items-center justify-center justify-self-end rounded-full border border-white/15 bg-white/5 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <HiOutlineXMark className="h-6 w-6" /> : <HiOutlineBars3 className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-[#16416f] bg-[#092f61] lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4 sm:px-6">
              {links.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'block rounded-md px-4 py-3 text-base font-medium transition-colors',
                        isActive ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/5 hover:text-white'
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <NavbarRegions className="my-3 flex flex-wrap border-y border-white/10 px-4 py-4" />
              <NavLink to="/contact" onClick={() => setOpen(false)} className="mt-2 block rounded-full border border-[#32A9F5] bg-[#010B1F]/70 px-5 py-3 text-center text-base font-semibold text-white transition duration-300 hover:bg-[#32A9F5] hover:text-[#010B1F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#32A9F5]">Contact Us</NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
