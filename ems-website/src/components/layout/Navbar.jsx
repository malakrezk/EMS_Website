import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineBars3, HiOutlineXMark } from 'react-icons/hi2'
import { cn } from '../../utils/cn'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/digital-twin', label: 'Digital Twin' },
  { to: '/projects', label: 'Case Studies' }
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
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
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition-all duration-500',
        scrolled || open
          ? 'border-b border-white/10 bg-[#061326]/90 shadow-[0_10px_28px_rgba(3,13,28,0.25)] backdrop-blur-xl'
          : 'border-b border-transparent bg-gradient-to-b from-[#061326]/75 to-transparent',
        open && 'shadow-lg'
      )}
    >
      <nav className={cn('container-ems flex items-center justify-between transition-all duration-500', scrolled ? 'h-[68px]' : 'h-[82px]')}>
        <Link to="/" className="flex min-w-0 items-center" onClick={() => setOpen(false)} aria-label="EMS home">
          <img
            src="/ems-logo.png"
            alt="EMS Engineering Management Systems"
            width="331"
            height="101"
            className={cn('h-auto w-[180px] object-contain object-left transition-all duration-500 sm:w-[210px]', scrolled ? 'max-h-[48px]' : 'max-h-[56px]')}
          />
        </Link>

        <div className="hidden lg:flex lg:items-center lg:gap-5 xl:gap-7">
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
          <Link to="/contact" className="ml-1 inline-flex items-center rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-xs font-semibold text-cyan-100 transition hover:border-cyan-300/50 hover:bg-cyan-300/15">Contact Us</Link>
        </div>

        <button
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white lg:hidden"
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
              <NavLink to="/contact" onClick={() => setOpen(false)} className={({ isActive }) => cn('mt-1 block rounded-md px-4 py-3 text-base font-medium transition-colors', isActive ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/5 hover:text-white')}>Contact</NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
