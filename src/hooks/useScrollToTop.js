import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Ensures every route change starts the user at the top of the page
export default function useScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])
}
