import {
  HiOutlineArrowLeft,
  HiOutlineShoppingCart
} from 'react-icons/hi2'
import AppButton from '../../../components/common/AppButton'
import Container from '../../../components/layout/Container'
export default function EmptyCart() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-paint-navy pb-24 pt-36 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-paint-accent/10 blur-[130px]" />
      </div>

      <Container className="relative mx-auto max-w-2xl">
        <div className="rounded-3xl border border-white/10 bg-[radial-gradient(ellipse_at_top,rgba(35,199,255,0.06),transparent_60%),linear-gradient(180deg,var(--paint-gradient-04)_0%,var(--paint-gradient-03)_100%)] p-10 sm:p-14 text-center shadow-2xl backdrop-blur-xl">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-paint-accent">
            <HiOutlineShoppingCart className="h-10 w-10" />
          </div>
          <p className="mt-6 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-paint-accent">
            Procurement Cart
          </p>
          <h1 className="mt-2 font-serif text-[clamp(2.2rem,4vw,3.2rem)] tracking-tight">
            Your Cart is Empty
          </h1>
          <p className="mt-3 text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            Explore the Siemens hardware catalog to select PLCs, HMIs, I/O modules and request an official quotation.
          </p>
          <div className="mt-8 flex justify-center">
            <AppButton variant="brand"
              to="/store"
              className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-xs font-bold shadow-lg shadow-paint-accent/20 active:scale-98"
            >
              <HiOutlineArrowLeft className="h-4 w-4" /> Browse Hardware Catalog
            </AppButton>
          </div>
        </div>
      </Container>
    </div>
  )
}
