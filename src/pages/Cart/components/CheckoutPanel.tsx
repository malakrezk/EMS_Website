import {
  HiOutlineArrowRight,
  HiOutlineDocumentText,
  HiOutlineShoppingCart
} from 'react-icons/hi2'
import AppButton from '../../../components/common/AppButton'
import CustomerField from '../../../components/store/CustomerField'
import { checkoutFields } from '../../../data/customerFields'
import type { CartItem } from '../../../types/store.types'
interface CheckoutPanelProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  submitError: string
  formData: { firstName: string; lastName: string; email: string; phone: string; company: string; address: string; notes: string }
  setFormData: React.Dispatch<React.SetStateAction<{ firstName: string; lastName: string; email: string; phone: string; company: string; address: string; notes: string }>>
  items: CartItem[]
  totalQuantity: number
  isSubmitting: boolean
}
export default function CheckoutPanel({ handleSubmit, submitError, formData, setFormData, items, totalQuantity, isSubmitting }: CheckoutPanelProps) {
  return (
    <aside className="lg:sticky lg:top-28">
      <div className="rounded-3xl border border-[rgba(74,169,220,0.3)] bg-[radial-gradient(ellipse_at_top,rgba(35,199,255,0.08),transparent_60%),linear-gradient(180deg,var(--paint-gradient-04)_0%,var(--paint-gradient-03)_100%)] p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        {/* Card Header */}
        <div className="border-b border-white/10 pb-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-paint-accent">
              Order Request Form
            </span>
            <span className="rounded-full bg-paint-accent/10 px-2 py-0.5 font-mono text-[10px] font-bold text-paint-accent">
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
          {submitError && <p role="alert" className="col-span-full text-sm text-red-300">{submitError}</p>}
          {/* Names (2 cols) */}
          <div className="grid gap-3 sm:grid-cols-2">
            <CustomerField variant="checkout" field={checkoutFields.firstName} value={formData.firstName} onChange={value => setFormData({ ...formData, firstName: value })} />

            <CustomerField variant="checkout" field={checkoutFields.lastName} value={formData.lastName} onChange={value => setFormData({ ...formData, lastName: value })} />
          </div>

          {/* Email */}
          <CustomerField variant="checkout" field={checkoutFields.email} value={formData.email} onChange={value => setFormData({ ...formData, email: value })} />

          {/* Phone */}
          <CustomerField variant="checkout" field={checkoutFields.phone} value={formData.phone} onChange={value => setFormData({ ...formData, phone: value })} />

          {/* Company (Optional) */}
          <CustomerField variant="checkout" field={checkoutFields.company} value={formData.company} onChange={value => setFormData({ ...formData, company: value })} />

          {/* Address */}
          <CustomerField variant="checkout" field={checkoutFields.address} value={formData.address} onChange={value => setFormData({ ...formData, address: value })} />

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
                className="w-full rounded-xl border border-white/15 bg-paint-blue-05 pl-10 pr-3 py-2.5 text-sm text-white placeholder:text-slate-500 transition focus:border-paint-accent focus:outline-none focus:ring-1 focus:ring-paint-accent resize-none"
              />
            </div>
          </div>

          {/* Order Summary Strip */}
          <div className="rounded-xl border border-white/10 bg-paint-neutral-02 p-3.5 space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Total Hardware Models:</span>
              <span className="font-semibold text-white">{items.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Total Requested Units:</span>
              <span className="font-mono text-sm font-bold text-paint-accent">{totalQuantity} units</span>
            </div>
            <div className="flex justify-between items-center pt-1 border-t border-white/10">
              <span className="text-slate-400">Pricing Mode:</span>
              <span className="text-emerald-400 font-medium">Formal Quotation &amp; PO</span>
            </div>
          </div>

          {/* Big CTA Button */}
          <AppButton variant="brand"
            type="submit"
            disabled={isSubmitting}
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl px-6 py-4 text-sm font-bold shadow-[0_10px_28px_rgba(41,155,240,0.35)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-75"
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-paint-navy border-t-transparent" />
                <span>Sending Order Request...</span>
              </>
            ) : (
              <>
                <HiOutlineShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span>Request Order</span>
                <HiOutlineArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </AppButton>

          <p className="text-center text-[11px] text-slate-400">
            🔒 No payment required today. An official EMS proposal will be dispatched to your email.
          </p>
        </form>
      </div>
    </aside>
  )
}
