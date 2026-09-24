import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineBars3, HiOutlineGlobeAlt, HiOutlineShoppingCart, HiOutlineXMark } from 'react-icons/hi2'
import { useCart } from '../../context/CartContext'
import { cn } from '../../utils/cn'

const links = [
  { to: '/', label: 'Home' },
  { to: '/solutions', label: 'Solutions' },
  { to: '/services', label: 'Services' },
  { to: '/case-studies', label: 'Projects' },
  { to: '/store', label: 'Products' },
  { to: '/about', label: 'About' },
]

function EgyptFlag() {
  return (
    <img src="/flags/egypt.svg" alt="Egypt flag" width="24" height="16" className="h-4 w-6 shrink-0 rounded-[3px] object-cover shadow-[0_0_0_1px_rgba(255,255,255,.12)]" />
  )
}

function SaudiFlag() {
  return (
    <img src="/flags/saudi-arabia.svg" alt="Saudi Arabia flag" width="24" height="16" className="h-4 w-6 shrink-0 rounded-[3px] object-cover shadow-[0_0_0_1px_rgba(255,255,255,.12)]" />
  )
}

function NavbarRegions({ className = '' }) {
  return (
    <div className={cn("h-11 max-w-full items-center gap-3 font-['Manrope'] text-[11px] font-semibold text-white/85", className)} aria-label="EMS regional presence">
      <HiOutlineGlobeAlt aria-hidden="true" className="h-[19px] w-[19px] shrink-0 text-[#55c7f5]" />
      <div className="flex items-center gap-2 whitespace-nowrap"><EgyptFlag /><span>Egypt</span></div>
      <span aria-hidden="true" className="h-5 w-px shrink-0 bg-[#8aa0b5]/25" />
      <div className="flex items-center gap-2 whitespace-nowrap"><SaudiFlag /><span>Saudi Arabia</span></div>
    </div>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { itemCount } = useCart()

  useEffect(() => {
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={cn(
      'fixed inset-x-0 top-0 z-50 transition-all duration-500',
      open
        ? 'border-b border-white/10 bg-[#0B2548]/95 shadow-[0_10px_28px_rgba(3,13,28,0.25)] backdrop-blur-xl'
        : scrolled
          ? 'border-b border-white/[.06] bg-[#010B1F]/75 backdrop-blur-md'
          : 'border-b border-transparent bg-gradient-to-b from-[#010B1F]/80 via-[#010B1F]/35 to-transparent backdrop-blur-[3px]'
    )}>
      <nav className={cn('container-ems grid grid-cols-[1fr_auto] items-center transition-all duration-500 lg:grid-cols-[1fr_auto_1fr]', scrolled ? 'h-[68px]' : 'h-[82px]')}>
        <Link to="/" className="flex min-w-0 items-center pl-2" onClick={() => setOpen(false)} aria-label="EMS home">
          <img
            src="/ems-logo.png"
            alt="EMS Engineering Management Systems"
            width="331"
            height="101"
            className="-ml-3 h-auto w-[180px] max-w-full object-contain object-left transition-all duration-500 sm:-ml-4 sm:w-[205px] lg:-ml-[20px] lg:w-[220px]"
          />
        </Link>

        <div className="hidden items-center justify-center gap-4 lg:flex xl:gap-7">
          {links.map((link) => {
            const isActive = link.to === '/' ? location.pathname === '/' : location.pathname.startsWith(link.to)
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={cn(
                  'group relative whitespace-nowrap px-0.5 py-2 text-[13px] font-medium text-white/75 transition-colors hover:text-white',
                  isActive && 'text-white'
                )}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-cyan-300/80 transition-transform group-hover:scale-x-100" />
                {isActive && <motion.span layoutId="nav-active-indicator" className="absolute -bottom-1 left-0 h-px w-full bg-cyan-300" />}
              </NavLink>
            )
          })}
        </div>

        <div className="flex items-center justify-self-end gap-2 xl:gap-4">
          <Link
            to={itemCount > 0 ? '/cart' : '/store'}
            aria-label={itemCount > 0 ? `Open cart with ${itemCount} items` : 'Open products page'}
            className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#29445e]/80 bg-[#07182e]/75 text-white/90 backdrop-blur-md transition-colors duration-300 hover:border-[#3f7da1] hover:bg-[#0a2038] hover:text-[#76d8ff]"
          >
            <HiOutlineShoppingCart className="h-[22px] w-[22px]" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-[#010B1F] bg-[#23C7FF] px-1 font-['Manrope'] text-[9px] font-bold leading-none text-[#010B1F]">
                {itemCount}
              </span>
            )}
          </Link>
          <NavbarRegions className="hidden xl:flex" />
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <HiOutlineXMark className="h-6 w-6" /> : <HiOutlineBars3 className="h-6 w-6" />}
          </button>
        </div>
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
            <div className="flex max-h-[calc(100dvh-68px)] flex-col gap-1 overflow-y-auto px-4 py-4 sm:px-6">
              {links.map((link, index) => (
                <motion.div key={link.to} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.04 }}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) => cn(
                      'block rounded-md px-4 py-3 text-base font-medium transition-colors',
                      isActive ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/5 hover:text-white'
                    )}
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <div className="mt-3 border-t border-white/10 px-4 pt-4">
                <NavbarRegions className="flex flex-wrap" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
