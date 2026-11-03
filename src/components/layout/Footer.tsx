import type { IconType } from 'react-icons'
import { HiOutlineArrowUp, HiOutlineArrowUpRight, HiOutlineEnvelope, HiOutlineMapPin, HiOutlinePhone } from 'react-icons/hi2'
import { Link, NavLink } from 'react-router-dom'
import { navigation as links } from '../../config/navigationConfig'
import { images } from '../../constants/images'
import { services } from '../../data/services'
import { regionalMarkets } from '../../data/zeta'
import Container from './Container'
import './Footer.css'

const contactDetails: { label: string; text: string; href?: string; icon: IconType }[] = [
  { label: 'Address', text: 'Villa 17, Bayram El-Tunsi St., El Nargis 2, Fifth Settlement, New Cairo, Egypt', icon: HiOutlineMapPin },
  { label: 'Phone', text: '+20 120 254 2095', href: 'tel:+201202542095', icon: HiOutlinePhone },
  { label: 'Email', text: 'info@ems-me.com', href: 'mailto:info@ems-me.com', icon: HiOutlineEnvelope },
]

function backToTop() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
  // Keyboard users carry on from the start of the page, not from the footer.
  document.querySelector<HTMLElement>('header a')?.focus({ preventScroll: true })
}

export default function Footer() {
  return <footer className="site-footer">
    <Container>
      <div className="site-footer-main">
        <div className="site-footer-brand">
          <Link to="/" aria-label="EMS home" className="site-footer-logo"><img src={images.emsLogo} alt="EMS Engineering Management Systems" width="331" height="101" /></Link>
          <p>Connected building and infrastructure operations through BMS, SCADA, IoT, AI, digital twins and robotics.</p>
          <a href="https://www.ems-me.com" className="site-footer-site">www.ems-me.com <HiOutlineArrowUpRight aria-hidden="true" /></a>
          <h3 className="site-footer-heading site-footer-presence-heading">Regional presence</h3>
          <ul className="site-footer-markets">{regionalMarkets.map(market => <li key={market}>{market}</li>)}</ul>
        </div>

        <nav className="site-footer-nav" aria-labelledby="site-footer-navigate">
          <h3 id="site-footer-navigate" className="site-footer-heading">Navigate</h3>
          <ul className="site-footer-links">{links.map(({ to, label }) => <li key={to}><NavLink to={to} end={to === '/'}>{label}</NavLink></li>)}</ul>
        </nav>

        <nav className="site-footer-capabilities" aria-labelledby="site-footer-capabilities">
          <h3 id="site-footer-capabilities" className="site-footer-heading">Capabilities</h3>
          <ul className="site-footer-links">{services.map(service => <li key={service.id}><NavLink to={`/services/${service.id}`}>{service.label}</NavLink></li>)}</ul>
        </nav>

        <div className="site-footer-contact">
          <h3 className="site-footer-heading">Contact</h3>
          <ul className="site-footer-contact-list">
            {contactDetails.map(({ label, text, href, icon: Icon }) => {
              const content = <>
                <span className="site-footer-contact-icon" aria-hidden="true"><Icon /></span>
                <span><span className="site-footer-contact-label">{label}</span><span className="site-footer-contact-value">{text}</span></span>
              </>
              return <li key={label}>{href ? <a href={href} className="site-footer-contact-item">{content}</a> : <div className="site-footer-contact-item">{content}</div>}</li>
            })}
          </ul>
        </div>
      </div>
    </Container>

    <div className="site-footer-bar">
      <Container className="site-footer-bar-inner">
        <p>© {new Date().getFullYear()} EMS Engineering Management Systems.</p>
        <p className="site-footer-platform">ZETA connected operations platform.</p>
        <button type="button" className="site-footer-top" onClick={backToTop}>Back to top <HiOutlineArrowUp aria-hidden="true" /></button>
      </Container>
    </div>
  </footer>
}
