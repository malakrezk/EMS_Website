import { AnimatePresence, motion } from 'framer-motion'
import { Fragment, useEffect, useRef, useState } from 'react'
import { HiOutlineBars3, HiOutlineGlobeAlt, HiOutlineShoppingCart, HiOutlineXMark } from 'react-icons/hi2'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navigation } from '../../config/navigationConfig'
import { images } from '../../constants/images'
import { useCart } from '../../context/CartContext'
import { useAppTheme } from '../../hooks/useAppTheme'
import { cn } from '../../utils/cn'

const links = navigation.filter(link => link.to !== '/services')

const regions = [
  { name: 'Egypt', flag: images.egypt },
  { name: 'Saudi Arabia', flag: images.saudiArabia },
  { name: 'Oman', flag: images.oman },
]

// The header shows one row with dividers; the mobile menu leaves the dividers out, since its row can wrap and a divider would end a line.
function NavbarRegions({ className = '', dividers = true }) {
  return (
    <div role="group" className={cn("max-w-full items-center gap-3 font-['Manrope'] text-[11px] font-semibold text-white/85", className)} aria-label="EMS regional presence">
      <HiOutlineGlobeAlt aria-hidden="true" className="h-[18px] w-[18px] shrink-0 text-paint-blue-54" />
      {regions.map(({ name, flag }, index) => (
        <Fragment key={name}>
          {dividers && index > 0 && <span aria-hidden="true" className="h-4 w-px shrink-0 bg-paint-blue-64/25" />}
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <img src={flag} alt={`${name} flag`} width="21" height="14" className="h-3.5 w-[21px] shrink-0 rounded-[2px] object-cover shadow-[0_0_0_1px_rgba(255,255,255,.12)]" />
            <span>{name}</span>
          </div>
        </Fragment>
      ))}
    </div>
  )
}

export default function Navbar() {
  const { breakpoints } = useAppTheme()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [overBmsHero, setOverBmsHero] = useState(false)
  const location = useLocation()
  const { itemCount } = useCart()
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onResize = () => window.innerWidth >= breakpoints.lg && setOpen(false)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [breakpoints.lg])

  useEffect(() => setOpen(false), [location.pathname])

  // While the menu is open the page behind it stays still, and Escape closes it.
  useEffect(() => {
    if (!open) return undefined
    const root = document.documentElement
    const previousOverflow = root.style.overflow
    root.style.overflow = 'hidden'
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      toggleRef.current?.focus()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      root.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const isBms = location.pathname === '/services/building-management'
      const hero = isBms ? document.querySelector('.bms-hero') : null
      setOverBmsHero(isBms && (!hero || hero.getBoundingClientRect().bottom > 82))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [location.pathname])

  return (
    <>
    {/* Dims the page under the open menu; a tap on it closes the menu. Kept outside the header, whose backdrop blur would trap a fixed child. */}
    <AnimatePresence>
      {open && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: .25 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-paint-navy/70 backdrop-blur-sm lg:hidden"
        />
      )}
    </AnimatePresence>
    <header className={cn(
      'fixed inset-x-0 top-0 z-50 bg-origin-border transition-all duration-500',
      open
        ? 'border-b border-white/10 bg-paint-card/95 shadow-[0_10px_28px_rgba(3,13,28,0.25)] backdrop-blur-xl'
        : overBmsHero
          ? 'border-b border-transparent bg-transparent'
        : scrolled
          ? 'border-b border-white/[.06] bg-paint-navy/75 backdrop-blur-md'
          : 'border-b border-transparent bg-gradient-to-b from-paint-navy/80 via-paint-navy/35 to-transparent backdrop-blur-[3px]'
    )}>
      {/* From lg the links sit in the middle column, centred between the logo and the cart group, so both gaps are equal. */}
      <nav className={cn('container-ems grid grid-cols-[1fr_auto] items-center transition-all duration-500 lg:grid-cols-[auto_minmax(0,1fr)_auto]', scrolled ? 'h-[68px]' : 'h-[82px]')}>
        <Link to="/" className="flex min-w-0 items-center pl-2" onClick={() => setOpen(false)} aria-label="EMS home">
          {/* From lg the logo's column sizes to the logo, so max-w-full is lifted (it would resolve against the column and shrink the logo).
              lg:-mr-1.5 trims the logo file's 6px of transparent right edge, so the gap is measured from the visible logo. */}
          <img
            src={images.emsLogo}
            alt="EMS Engineering Management Systems"
            width="331"
            height="101"
            className="-ml-3 h-auto w-[180px] max-w-full object-contain object-left transition-all duration-500 sm:-ml-4 sm:w-[205px] lg:-ml-[20px] lg:-mr-1.5 lg:w-[220px] lg:max-w-none"
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
            className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-paint-blue-42/80 bg-paint-panel/75 text-white/90 backdrop-blur-md transition-colors duration-300 hover:border-paint-blue-47 hover:bg-paint-blue-25 hover:text-paint-blue-63"
          >
            <HiOutlineShoppingCart className="h-[22px] w-[22px]" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-paint-navy bg-paint-cyan px-1 font-['Manrope'] text-[9px] font-bold leading-none text-paint-navy">
                {itemCount}
              </span>
            )}
          </Link>
          <NavbarRegions className="hidden h-11 xl:flex" />
          <button
            ref={toggleRef}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <HiOutlineXMark className="h-6 w-6" /> : <HiOutlineBars3 className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-paint-blue-34 bg-paint-blue-23 lg:hidden"
          >
            {/* Scrolls on its own on short screens, such as a phone held sideways; 82px is the header's full height. */}
            <div className="flex max-h-[calc(100svh-82px)] flex-col gap-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6">
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
                <NavbarRegions dividers={false} className="flex min-h-11 flex-wrap gap-y-2" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    </>
  )
}
