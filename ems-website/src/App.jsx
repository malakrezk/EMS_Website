import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import ServiceDetails from './pages/ServiceDetails'
import IndustryDetails from './pages/IndustryDetails'
import Solutions from './pages/Solutions'
import Projects from './pages/Projects'
import ProjectDetails from './pages/ProjectDetails'
import Partners from './pages/Partners'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

const DigitalTwin = lazy(() => import('./pages/DigitalTwin'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:serviceId" element={<ServiceDetails />} />
        <Route path="/industries/:industryId" element={<IndustryDetails />} />
        <Route path="/digital-twin" element={<Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[#030a13] text-xs uppercase tracking-[.3em] text-cyan-300">Initializing Digital Twin…</div>}><DigitalTwin /></Suspense>} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
