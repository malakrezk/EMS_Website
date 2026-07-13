import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import useScrollToTop from '../../hooks/useScrollToTop'

export default function Layout() {
  useScrollToTop()

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
