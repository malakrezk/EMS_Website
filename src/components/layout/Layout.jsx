import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import useScrollToTop from '../../hooks/useScrollToTop'

export default function Layout() {
  useScrollToTop()
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="relative flex min-h-screen w-full max-w-full flex-col overflow-x-clip bg-[#010B1F]">
      <Navbar />
      <main className={`w-full max-w-full flex-1 overflow-x-clip ${isHome ? '' : 'inner-page-route'}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
