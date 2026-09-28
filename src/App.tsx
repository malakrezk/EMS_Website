import { lazy } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import Layout from './components/layout/Layout'
const About = lazy(() => import('./pages/About'))
const Cart = lazy(() => import('./pages/Cart'))
const Contact = lazy(() => import('./pages/Contact'))
const Home = lazy(() => import('./pages/Home'))
const IndustryDetails = lazy(() => import('./pages/IndustryDetails'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Partners = lazy(() => import('./pages/Partners'))
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'))
const Projects = lazy(() => import('./pages/Projects'))
const ServiceDetails = lazy(() => import('./pages/ServiceDetails'))
const Services = lazy(() => import('./pages/Services'))
const Solutions = lazy(() => import('./pages/Solutions'))
const Store = lazy(() => import('./pages/Store'))

function LegacyProjectRedirect() {
  const { id } = useParams()
  return <Navigate to={`/case-studies/${id}`} replace />
}

export default function App() {
  return <Routes><Route element={<Layout />}>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/services" element={<Services />} />
    <Route path="/services/:serviceId" element={<ServiceDetails />} />
    <Route path="/industries/:industryId" element={<IndustryDetails />} />
    <Route path="/solutions" element={<Solutions />} />
    <Route path="/digital-twin" element={<Navigate to="/solutions#digital-twin" replace />} />
    <Route path="/projects" element={<Navigate to="/case-studies" replace />} />
    <Route path="/projects/:id" element={<LegacyProjectRedirect />} />
    <Route path="/case-studies" element={<Projects />} />
    <Route path="/case-studies/:id" element={<ProjectDetails />} />
    <Route path="/partners" element={<Partners />} />
    <Route path="/store" element={<Store />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="*" element={<NotFound />} />
  </Route></Routes>
}
