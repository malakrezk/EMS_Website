import { storeBenefits } from '../Store.data'

export default function BenefitsSection() {
  return (
    <section
      aria-labelledby="store-benefits-title"
      className="relative mt-20 overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(145deg,var(--paint-blue-16)_0%,var(--paint-blue-10)_55%,var(--paint-gradient-05)_100%)] px-5 py-12 shadow-[0_24px_70px_rgba(0,0,0,0.24)] sm:px-8 sm:py-14 lg:px-12"
    >
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(var(--paint-accent)_0.7px,transparent_0.7px)] [background-size:34px_34px] [mask-image:linear-gradient(to_bottom,black,transparent_72%)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-96 -translate-x-1/2 rounded-full bg-paint-cyan/10 blur-[90px]" />

      <div className="relative text-center">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-paint-accent">The EMS advantage</p>
        <h2 id="store-benefits-title" className="mt-4 font-serif text-[clamp(2rem,3.4vw,3rem)] leading-tight text-white">
          Why Choose EMS
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-400">
          Reliable products, informed guidance and engineering support for every order.
        </p>
      </div>

      <div className="relative mt-10 grid gap-4 md:grid-cols-3 md:gap-0">
        {storeBenefits.map(({ icon: Icon, title, description }, index) => (
          <article
            key={title}
            className={`group flex flex-col items-center rounded-2xl px-5 py-7 text-center transition duration-300 hover:-translate-y-1 hover:bg-white/[0.035] ${index > 0 ? 'md:border-l md:border-white/10' : ''
              }`}
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-paint-accent/25 bg-paint-accent/10 text-paint-blue-49 transition duration-300 group-hover:border-paint-accent/55 group-hover:bg-paint-accent/15">
              <Icon aria-hidden="true" className="h-7 w-7" />
            </span>
            <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">{description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
