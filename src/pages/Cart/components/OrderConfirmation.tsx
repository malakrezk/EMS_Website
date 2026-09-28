import { motion } from 'framer-motion'
import {
  HiOutlineArrowLeft,
  HiOutlineCheckCircle
} from 'react-icons/hi2'
import AppButton from '../../../components/common/AppButton'
import Container from '../../../components/layout/Container'
import type { OrderRequest } from '../../../types/store.types'
interface OrderConfirmationProps {
  submittedData: OrderRequest
}
export default function OrderConfirmation({ submittedData }: OrderConfirmationProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-paint-navy pb-28 pt-32 text-white">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-16 h-96 w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(50,169,245,0.15),transparent_70%)] blur-3xl" />
      </div>

      <Container className="relative mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-[rgba(74,169,220,0.3)] bg-[radial-gradient(ellipse_at_top,rgba(35,199,255,0.08),transparent_60%),linear-gradient(180deg,var(--paint-gradient-04)_0%,var(--paint-gradient-03)_100%)] p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl"
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
              Thank You, {submittedData.customer.firstName}!
            </h1>
            <p className="mt-2 text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
              Your order request has been logged successfully. An EMS engineering sales representative will review your hardware requirements and prepare an official quotation.
            </p>
          </div>

          {/* Reference info strip */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-2xl border border-white/10 bg-paint-neutral-03/80 p-4 text-center">
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-wider text-slate-400">Order Ref</span>
              <strong className="mt-0.5 block font-mono text-sm font-bold text-paint-accent">{submittedData.orderNumber}</strong>
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
            <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-paint-accent">
              Requested Hardware ({submittedData.items.length} {submittedData.items.length === 1 ? 'model' : 'models'})
            </h2>
            <div className="mt-3 divide-y divide-white/10 rounded-2xl border border-white/10 bg-paint-neutral-03/50 overflow-hidden">
              {submittedData.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-3.5 sm:p-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-14 w-14 rounded-lg bg-white object-contain p-1.5 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-white text-sm truncate">{item.name}</p>
                    <p className="font-mono text-xs text-paint-blue-66">{item.partNumber}</p>
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
          <div className="mt-7 rounded-2xl border border-white/10 bg-paint-neutral-03/50 p-5">
            <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-paint-accent mb-3">
              Delivery &amp; Contact Details
            </h2>
            <dl className="grid gap-2.5 text-xs sm:grid-cols-2">
              <div className="flex flex-col">
                <dt className="text-slate-400">Full Name</dt>
                <dd className="font-semibold text-white mt-0.5">{submittedData.customer.firstName} {submittedData.customer.lastName}</dd>
              </div>
              {submittedData.customer.company && (
                <div className="flex flex-col">
                  <dt className="text-slate-400">Company / Organization</dt>
                  <dd className="font-semibold text-white mt-0.5">{submittedData.customer.company}</dd>
                </div>
              )}
              <div className="flex flex-col">
                <dt className="text-slate-400">Work Email</dt>
                <dd className="font-semibold text-white mt-0.5">{submittedData.customer.email}</dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-slate-400">Phone</dt>
                <dd className="font-semibold text-white mt-0.5">{submittedData.customer.phone}</dd>
              </div>
              <div className="flex flex-col sm:col-span-2">
                <dt className="text-slate-400">Delivery Address</dt>
                <dd className="font-semibold text-white mt-0.5">{submittedData.customer.address}</dd>
              </div>
              {submittedData.customer.notes && (
                <div className="flex flex-col sm:col-span-2">
                  <dt className="text-slate-400">Notes / Requirements</dt>
                  <dd className="font-semibold text-slate-300 mt-0.5">{submittedData.customer.notes}</dd>
                </div>
              )}
            </dl>
          </div>

          {/* Action buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <AppButton variant="brand"
              to="/store"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-xs font-bold shadow-lg shadow-paint-accent/25 active:scale-98 sm:w-auto"
            >
              <HiOutlineArrowLeft className="h-4 w-4" /> Return to Store Catalog
            </AppButton>
            <button
              type="button"
              onClick={() => window.print()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 text-xs font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              Print / Save Receipt
            </button>
          </div>
        </motion.div>
      </Container>
    </div>
  )
}
