import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import useScrollToTop from '../../hooks/useScrollToTop'
import Footer from './Footer'
import Navbar from './Navbar'

export default function Layout() {
  useScrollToTop()
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    // min-h-svh follows the visible height on phones whose browser bars come and go; min-h-screen stays as the fallback.
    <div className="relative flex min-h-screen min-h-svh w-full max-w-full flex-col overflow-x-clip bg-paint-navy">
      <Navbar />
      <main className={`w-full max-w-full flex-1 overflow-x-clip ${isHome ? '' : 'inner-page-route'}`}>
        <Suspense fallback={<div role="status" aria-live="polite" className="container-ems py-32 text-muted">Loading…</div>}><Outlet /></Suspense>
      </main>
      <Footer />
    </div>
  )
}
