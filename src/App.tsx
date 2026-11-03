import { lazy } from 'react'
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import Layout from './components/layout/Layout'
const About = lazy(() => import('./pages/About'))
const BMS = lazy(() => import('./pages/BMS'))
const Cart = lazy(() => import('./pages/Cart'))
const Contact = lazy(() => import('./pages/Contact'))
const Home = lazy(() => import('./pages/Home'))
const IndustryDetails = lazy(() => import('./pages/IndustryDetails'))
const IoT = lazy(() => import('./pages/IoT'))
const MobileApp = lazy(() => import('./pages/MobileApp'))
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
  const { search, hash } = useLocation()
  return <Navigate to={`/projects${id ? `/${id}` : ''}${search}${hash}`} replace />
}

export default function App() {
  return <Routes><Route element={<Layout />}>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/services" element={<Services />} />
    <Route path="/services/building-management" element={<BMS />} />
    <Route path="/services/building-management-systems" element={<Navigate to="/services/building-management" replace />} />
    <Route path="/services/iot" element={<IoT />} />
    <Route path="/services/:serviceId" element={<ServiceDetails />} />
    <Route path="/industries/:industryId" element={<IndustryDetails />} />
    <Route path="/solutions" element={<Solutions />} />
    <Route path="/digital-twin" element={<Navigate to="/solutions#digital-twin" replace />} />
    <Route path="/projects" element={<Projects />} />
    <Route path="/projects/:id" element={<ProjectDetails />} />
    <Route path="/case-studies" element={<LegacyProjectRedirect />} />
    <Route path="/case-studies/:id" element={<LegacyProjectRedirect />} />
    <Route path="/partners" element={<Partners />} />
    <Route path="/mobile-app" element={<MobileApp />} />
    <Route path="/store" element={<Store />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="*" element={<NotFound />} />
  </Route></Routes>
}
