import Container from '../../components/layout/Container'
import { sendOrder } from '../../services/orderService'
import type { OrderRequest } from '../../types/store.types'
import CartItems from './components/CartItems'
import CheckoutPanel from './components/CheckoutPanel'
import EmptyCart from './components/EmptyCart'
import OrderConfirmation from './components/OrderConfirmation'

import { useState } from 'react'
import {
  HiOutlineChevronRight
} from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

export default function Cart() {
  const { items, updateQuantity, removeFromCart, clearCart } = useCart()
  const [submitted, setSubmitted] = useState(false)
  const [submittedData, setSubmittedData] = useState<OrderRequest | null>(null)
  const [submitError, setSubmitError] = useState('')
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

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
      await sendOrder(payload)
      setSubmittedData(payload)
      clearCart()
      setIsSubmitting(false)
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setSubmitError('Your request could not be sent. Please try again. Your selected items have been kept.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // --- SUBMITTED / CONFIRMATION SCREEN ---
  if (submitted && submittedData) {
    return (
      <OrderConfirmation submittedData={submittedData} />
    )
  }

  // --- EMPTY CART STATE ---
  if (items.length === 0) {
    return (
      <EmptyCart />
    )
  }

  // --- ACTIVE CART REQUEST ORDER FLOW ---
  return (
    <div className="relative min-h-screen overflow-hidden bg-paint-navy pb-28 pt-32 text-white">
      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(rgba(89,220,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(89,220,255,.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div className="pointer-events-none absolute -left-40 top-32 h-[450px] w-[450px] rounded-full bg-paint-accent/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 top-72 h-[450px] w-[450px] rounded-full bg-paint-cyan/08 blur-[140px]" />

      <Container className="relative mx-auto max-w-[1400px]">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
          <Link to="/" className="transition hover:text-white">Home</Link>
          <HiOutlineChevronRight className="h-3 w-3 text-slate-600" />
          <Link to="/store" className="transition hover:text-white">Store</Link>
          <HiOutlineChevronRight className="h-3 w-3 text-slate-600" />
          <span className="text-paint-accent font-semibold">Request Order</span>
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
          <CartItems items={items} totalQuantity={totalQuantity} clearCart={clearCart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />

          {/* ================= RIGHT COLUMN: Sticky Order Form ================= */}
          <CheckoutPanel handleSubmit={handleSubmit} submitError={submitError} formData={formData} setFormData={setFormData} items={items} totalQuantity={totalQuantity} isSubmitting={isSubmitting} />
        </div>
      </Container>
    </div>
  )
}
