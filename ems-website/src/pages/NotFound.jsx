import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiOutlineArrowLeft } from 'react-icons/hi2'

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-navy-800">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 bg-radial-glow" />
      <div className="container-ems relative text-center">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-sm uppercase tracking-[0.3em] text-cyan-300">Signal Lost</motion.p>
        <motion.h1 initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 100 }} className="mt-4 font-serif text-7xl text-white sm:text-9xl">404</motion.h1>
        <p className="mx-auto mt-4 max-w-md text-white/60">
          The page you're looking for has been disconnected from the network. Let's get you back online.
        </p>
        <Link to="/" className="btn-primary mt-8 inline-flex">
          <HiOutlineArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </section>
  )
}
