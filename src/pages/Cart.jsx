import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineBuildingOffice2,
  HiOutlineCheckCircle,
  HiOutlineChevronRight,
  HiOutlineDocumentText,
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlineMinus,
  HiOutlinePhone,
  HiOutlinePlus,
  HiOutlineShieldCheck,
  HiOutlineShoppingCart,
  HiOutlineTrash,
  HiOutlineTruck,
  HiOutlineUser,
  HiOutlineWrenchScrewdriver,
} from 'react-icons/hi2'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { items, updateQuantity, removeFromCart, clearCart } = useCart()
  const [submitted, setSubmitted] = useState(false)
  const [submittedData, setSubmittedData] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    notes: '',
  })

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const orderNumber = `EMS-${Math.floor(100000 + Math.random() * 900000)}`
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })

    const payload = {
      orderNumber,
      customer: formData,
      items: [...items],
      totalQuantity,
      date,
    }

    try {
      const response = await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}))
        console.warn('API send-order warning:', errData.error)
      }
    } catch (err) {
      console.error('Failed to send order email:', err)
    } finally {
      setSubmittedData(payload)
      clearCart()
      setIsSubmitting(false)
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // --- SUBMITTED / CONFIRMATION SCREEN ---
  if (submitted && submittedData) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#010B1F] pb-28 pt-32 text-white">
        {/* Ambient background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-16 h-96 w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(50,169,245,0.15),transparent_70%)] blur-3xl" />
        </div>

        <div className="container-ems relative mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border border-[rgba(74,169,220,0.3)] bg-[radial-gradient(ellipse_at_top,rgba(35,199,255,0.08),transparent_60%),linear-gradient(180deg,#071b32_0%,#041021_100%)] p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl"
          >
            {/* Header badge & icon */}
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.25)]">
                <HiOutlineCheckCircle className="h-9 w-9" />
              </div>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono font-semibold uppercase tracking-widest text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Order Request Submitted
              </div>

              <h1 className="mt-3 font-serif text-[clamp(2rem,4vw,3rem)] tracking-tight text-white">
                Thank You, {submittedData.firstName}!
              </h1>
              <p className="mt-2 text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                Your order request has been logged successfully. An EMS engineering sales representative will review your hardware requirements and prepare an official quotation.
              </p>
            </div>

            {/* Reference info strip */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-2xl border border-white/10 bg-[#020916]/80 p-4 text-center">
              <div>
                <span className="block font-mono text-[10px] uppercase tracking-wider text-slate-400">Order Ref</span>
                <strong className="mt-0.5 block font-mono text-sm font-bold text-[#32A9F5]">{submittedData.orderNumber}</strong>
              </div>
              <div>
                <span className="block font-mono text-[10px] uppercase tracking-wider text-slate-400">Date</span>
                <strong className="mt-0.5 block text-sm font-semibold text-white">{submittedData.date}</strong>
              </div>
              <div>
                <span className="block font-mono text-[10px] uppercase tracking-wider text-slate-400">Total Units</span>
                <strong className="mt-0.5 block text-sm font-semibold text-white">{submittedData.totalQuantity} items</strong>
              </div>
              <div>
                <span className="block font-mono text-[10px] uppercase tracking-wider text-slate-400">Status</span>
                <strong className="mt-0.5 block text-sm font-semibold text-emerald-400">Under Review</strong>
              </div>
            </div>

            {/* Requested Hardware Breakdown */}
            <div className="mt-7">
              <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#32A9F5]">
                Requested Hardware ({submittedData.items.length} {submittedData.items.length === 1 ? 'model' : 'models'})
              </h2>
              <div className="mt-3 divide-y divide-white/10 rounded-2xl border border-white/10 bg-[#020916]/50 overflow-hidden">
                {submittedData.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-3.5 sm:p-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-14 w-14 rounded-lg bg-white object-contain p-1.5 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-white text-sm truncate">{item.name}</p>
                      <p className="font-mono text-xs text-[#8fb9d6]">{item.partNumber}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block rounded-md bg-white/10 px-2.5 py-1 text-xs font-mono font-bold text-white">
                        Qty: {item.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Details Summary */}
            <div className="mt-7 rounded-2xl border border-white/10 bg-[#020916]/50 p-5">
              <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#32A9F5] mb-3">
                Delivery &amp; Contact Details
              </h2>
              <dl className="grid gap-2.5 text-xs sm:grid-cols-2">
                <div className="flex flex-col">
                  <dt className="text-slate-400">Full Name</dt>
                  <dd className="font-semibold text-white mt-0.5">{submittedData.firstName} {submittedData.lastName}</dd>
                </div>
                {submittedData.company && (
                  <div className="flex flex-col">
                    <dt className="text-slate-400">Company / Organization</dt>
                    <dd className="font-semibold text-white mt-0.5">{submittedData.company}</dd>
                  </div>
                )}
                <div className="flex flex-col">
                  <dt className="text-slate-400">Work Email</dt>
                  <dd className="font-semibold text-white mt-0.5">{submittedData.email}</dd>
                </div>
                <div className="flex flex-col">
                  <dt className="text-slate-400">Phone</dt>
                  <dd className="font-semibold text-white mt-0.5">{submittedData.phone}</dd>
                </div>
                <div className="flex flex-col sm:col-span-2">
                  <dt className="text-slate-400">Delivery Address</dt>
                  <dd className="font-semibold text-white mt-0.5">{submittedData.address}</dd>
                </div>
                {submittedData.notes && (
                  <div className="flex flex-col sm:col-span-2">
                    <dt className="text-slate-400">Notes / Requirements</dt>
                    <dd className="font-semibold text-slate-300 mt-0.5">{submittedData.notes}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                to="/store"
                className="brand-gradient-button inline-flex w-full items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-xs font-bold shadow-lg shadow-[#32A9F5]/25 active:scale-98 sm:w-auto"
              >
                <HiOutlineArrowLeft className="h-4 w-4" /> Return to Store Catalog
              </Link>
              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 text-xs font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                Print / Save Receipt
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    )
  }

  // --- EMPTY CART STATE ---
  if (items.length === 0) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#010B1F] pb-24 pt-36 text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-[#32A9F5]/10 blur-[130px]" />
        </div>

        <div className="container-ems relative mx-auto max-w-2xl">
          <div className="rounded-3xl border border-white/10 bg-[radial-gradient(ellipse_at_top,rgba(35,199,255,0.06),transparent_60%),linear-gradient(180deg,#071b32_0%,#041021_100%)] p-10 sm:p-14 text-center shadow-2xl backdrop-blur-xl">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-[#32A9F5]">
              <HiOutlineShoppingCart className="h-10 w-10" />
            </div>
            <p className="mt-6 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#32A9F5]">
              Procurement Cart
            </p>
            <h1 className="mt-2 font-serif text-[clamp(2.2rem,4vw,3.2rem)] tracking-tight">
              Your Cart is Empty
            </h1>
            <p className="mt-3 text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Explore the Siemens hardware catalog to select PLCs, HMIs, I/O modules and request an official quotation.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                to="/store"
                className="brand-gradient-button inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-xs font-bold shadow-lg shadow-[#32A9F5]/20 active:scale-98"
              >
                <HiOutlineArrowLeft className="h-4 w-4" /> Browse Hardware Catalog
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  // --- ACTIVE CART REQUEST ORDER FLOW ---
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#010B1F] pb-28 pt-32 text-white">
      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(rgba(89,220,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(89,220,255,.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div className="pointer-events-none absolute -left-40 top-32 h-[450px] w-[450px] rounded-full bg-[#32A9F5]/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 top-72 h-[450px] w-[450px] rounded-full bg-[#23C7FF]/08 blur-[140px]" />

      <div className="container-ems relative mx-auto max-w-[1400px]">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
          <Link to="/" className="transition hover:text-white">Home</Link>
          <HiOutlineChevronRight className="h-3 w-3 text-slate-600" />
          <Link to="/store" className="transition hover:text-white">Store</Link>
          <HiOutlineChevronRight className="h-3 w-3 text-slate-600" />
          <span className="text-[#32A9F5] font-semibold">Request Order</span>
        </nav>

        {/* Page Hero Header */}
        <header className="mt-6 flex flex-col justify-between gap-4 border-b border-white/10 pb-8 lg:flex-row lg:items-end">
          <div>
            <h1 className="font-serif text-[clamp(2.4rem,4.5vw,4rem)] tracking-tight text-white leading-none">
              Request Order
            </h1>
            <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-slate-300">
              Review your selected components, adjust hardware quantities, and submit your contact details for formal quotation and order processing.
            </p>
          </div>
        </header>

        {/* 2-Column Professional Layout */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.18fr_0.82fr] items-start">
          {/* ================= LEFT COLUMN: Selected Hardware ================= */}
          <section className="space-y-4">
            <div className="flex flex-col items-start gap-3 border-b border-white/10 pb-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg font-semibold text-white">Selected Hardware</h2>
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-xs font-bold text-[#32A9F5]">
                  {items.length} {items.length === 1 ? 'item' : 'items'} · {totalQuantity} units
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/store"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#32A9F5] transition hover:text-white"
                >
                  <HiOutlinePlus className="h-3.5 w-3.5" /> Add More Products
                </Link>
                <span className="h-3.5 w-px bg-white/15" />
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs font-semibold text-slate-400 transition hover:text-red-400"
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Products List */}
            <div className="space-y-3.5">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="group relative flex flex-col gap-4 rounded-2xl border border-[rgba(74,169,220,0.22)] bg-[radial-gradient(circle_at_0%_0%,rgba(74,169,220,.10),transparent_45%),linear-gradient(135deg,#071b30_0%,#041021_100%)] p-4 text-white shadow-lg transition-all duration-300 hover:border-[#32A9F5]/45 hover:shadow-[0_12px_32px_rgba(0,0,0,0.35)] sm:flex-row sm:items-center"
                >
                  {/* Product Image Frame */}
                  <div className="relative h-24 w-24 shrink-0 rounded-xl bg-white p-2 shadow-inner flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-slate-300">
                        Siemens Genuine
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        In Stock
                      </span>
                    </div>

                    <h3 className="mt-1.5 text-base font-semibold leading-snug text-white">
                      {item.name}
                    </h3>

                    <div className="mt-1 flex items-center gap-2">
                      <span className="font-mono text-xs text-[#8fb9d6] bg-[#020b18] px-2 py-0.5 rounded border border-white/10">
                        {item.partNumber}
                      </span>
                    </div>
                  </div>

                  {/* Quantity Stepper & Controls */}
                  <div className="flex items-center justify-between border-t border-white/10 pt-3 sm:border-t-0 sm:pt-0 gap-3">
                    <div className="flex items-center rounded-xl border border-white/15 bg-[#020b18]/80 p-1">
                      <button
                        type="button"
                        aria-label={`Decrease ${item.name}`}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-white/20 active:scale-90"
                      >
                        <HiOutlineMinus className="h-3.5 w-3.5" />
                      </button>

                      <span className="min-w-[2.5rem] text-center font-mono text-base font-bold text-white select-none">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        aria-label={`Increase ${item.name}`}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-white/20 active:scale-90"
                      >
                        <HiOutlinePlus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Trash Button */}
                    <button
                      type="button"
                      aria-label={`Remove ${item.name}`}
                      onClick={() => removeFromCart(item.id)}
                      title="Remove product"
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-slate-400 transition hover:border-red-400/50 hover:bg-red-500/10 hover:text-red-400"
                    >
                      <HiOutlineTrash className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Industrial Value Props / Trust strip */}
            <div className="mt-8 grid gap-3 sm:grid-cols-3 pt-2">
              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#07182e]/60 p-3.5">
                <HiOutlineShieldCheck className="h-5 w-5 shrink-0 text-[#32A9F5] mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-white">Authorized Partner</h4>
                  <p className="mt-0.5 text-[11px] leading-4 text-slate-400">100% Genuine Siemens hardware with factory certificates.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#07182e]/60 p-3.5">
                <HiOutlineTruck className="h-5 w-5 shrink-0 text-[#32A9F5] mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-white">Express Logistics</h4>
                  <p className="mt-0.5 text-[11px] leading-4 text-slate-400">Tracked dispatch directly to your facility or warehouse.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#07182e]/60 p-3.5">
                <HiOutlineWrenchScrewdriver className="h-5 w-5 shrink-0 text-[#32A9F5] mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-white">Engineering Support</h4>
                  <p className="mt-0.5 text-[11px] leading-4 text-slate-400">PLC/SCADA programming and integration advisory available.</p>
                </div>
              </div>
            </div>
          </section>

          {/* ================= RIGHT COLUMN: Sticky Order Form ================= */}
          <aside className="lg:sticky lg:top-28">
            <div className="rounded-3xl border border-[rgba(74,169,220,0.3)] bg-[radial-gradient(ellipse_at_top,rgba(35,199,255,0.08),transparent_60%),linear-gradient(180deg,#071b32_0%,#041021_100%)] p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">
              {/* Card Header */}
              <div className="border-b border-white/10 pb-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#32A9F5]">
                    Order Request Form
                  </span>
                  <span className="rounded-full bg-[#32A9F5]/10 px-2 py-0.5 font-mono text-[10px] font-bold text-[#32A9F5]">
                    Step 2 of 2
                  </span>
                </div>
                <h2 className="mt-1 font-serif text-2xl font-semibold text-white">
                  Customer &amp; Delivery Info
                </h2>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                  Enter your contact details to submit your order request. Official quotation &amp; delivery timeframe will be provided.
                </p>
              </div>

              {/* The Form */}
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                {/* Names (2 cols) */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="order-firstName" className="block text-xs font-semibold text-slate-300 mb-1">
                      First Name <span className="text-[#32A9F5]">*</span>
                    </label>
                    <div className="relative">
                      <HiOutlineUser className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                      <input
                        id="order-firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="John"
                        className="h-11 w-full rounded-xl border border-white/15 bg-[#030d1d] pl-10 pr-3 text-sm text-white placeholder:text-slate-500 transition focus:border-[#32A9F5] focus:outline-none focus:ring-1 focus:ring-[#32A9F5]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="order-lastName" className="block text-xs font-semibold text-slate-300 mb-1">
                      Last Name <span className="text-[#32A9F5]">*</span>
                    </label>
                    <div className="relative">
                      <HiOutlineUser className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                      <input
                        id="order-lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="Smith"
                        className="h-11 w-full rounded-xl border border-white/15 bg-[#030d1d] pl-10 pr-3 text-sm text-white placeholder:text-slate-500 transition focus:border-[#32A9F5] focus:outline-none focus:ring-1 focus:ring-[#32A9F5]"
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="order-email" className="block text-xs font-semibold text-slate-300 mb-1">
                    Work Email <span className="text-[#32A9F5]">*</span>
                  </label>
                  <div className="relative">
                    <HiOutlineEnvelope className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      id="order-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john.smith@company.com"
                      className="h-11 w-full rounded-xl border border-white/15 bg-[#030d1d] pl-10 pr-3 text-sm text-white placeholder:text-slate-500 transition focus:border-[#32A9F5] focus:outline-none focus:ring-1 focus:ring-[#32A9F5]"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="order-phone" className="block text-xs font-semibold text-slate-300 mb-1">
                    Phone / Mobile <span className="text-[#32A9F5]">*</span>
                  </label>
                  <div className="relative">
                    <HiOutlinePhone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      id="order-phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+20 1xx xxx xxxx"
                      className="h-11 w-full rounded-xl border border-white/15 bg-[#030d1d] pl-10 pr-3 text-sm text-white placeholder:text-slate-500 transition focus:border-[#32A9F5] focus:outline-none focus:ring-1 focus:ring-[#32A9F5]"
                    />
                  </div>
                </div>

                {/* Company (Optional) */}
                <div>
                  <label htmlFor="order-company" className="block text-xs font-semibold text-slate-300 mb-1">
                    Company / Organization <span className="text-slate-500 text-[11px] font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <HiOutlineBuildingOffice2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      id="order-company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Arab Contractors, Eni, Petrojet..."
                      className="h-11 w-full rounded-xl border border-white/15 bg-[#030d1d] pl-10 pr-3 text-sm text-white placeholder:text-slate-500 transition focus:border-[#32A9F5] focus:outline-none focus:ring-1 focus:ring-[#32A9F5]"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="order-address" className="block text-xs font-semibold text-slate-300 mb-1">
                    Delivery Address / Facility Location <span className="text-[#32A9F5]">*</span>
                  </label>
                  <div className="relative">
                    <HiOutlineMapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      id="order-address"
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Facility name, Street, City, Country"
                      className="h-11 w-full rounded-xl border border-white/15 bg-[#030d1d] pl-10 pr-3 text-sm text-white placeholder:text-slate-500 transition focus:border-[#32A9F5] focus:outline-none focus:ring-1 focus:ring-[#32A9F5]"
                    />
                  </div>
                </div>

                {/* Notes / Special Requirements */}
                <div>
                  <label htmlFor="order-notes" className="block text-xs font-semibold text-slate-300 mb-1">
                    Project Notes / PO Details <span className="text-slate-500 text-[11px] font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <HiOutlineDocumentText className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                    <textarea
                      id="order-notes"
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Target delivery date, technical specs, or tender reference..."
                      className="w-full rounded-xl border border-white/15 bg-[#030d1d] pl-10 pr-3 py-2.5 text-sm text-white placeholder:text-slate-500 transition focus:border-[#32A9F5] focus:outline-none focus:ring-1 focus:ring-[#32A9F5] resize-none"
                    />
                  </div>
                </div>

                {/* Order Summary Strip */}
                <div className="rounded-xl border border-white/10 bg-[#020814] p-3.5 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Total Hardware Models:</span>
                    <span className="font-semibold text-white">{items.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Total Requested Units:</span>
                    <span className="font-mono text-sm font-bold text-[#32A9F5]">{totalQuantity} units</span>
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t border-white/10">
                    <span className="text-slate-400">Pricing Mode:</span>
                    <span className="text-emerald-400 font-medium">Formal Quotation &amp; PO</span>
                  </div>
                </div>

                {/* Big CTA Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="brand-gradient-button group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl px-6 py-4 text-sm font-bold shadow-[0_10px_28px_rgba(41,155,240,0.35)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#010B1F] border-t-transparent" />
                      <span>Sending Order Request...</span>
                    </>
                  ) : (
                    <>
                      <HiOutlineShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />
                      <span>Request Order</span>
                      <HiOutlineArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-slate-400">
                  🔒 No payment required today. An official EMS proposal will be dispatched to your email.
                </p>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
