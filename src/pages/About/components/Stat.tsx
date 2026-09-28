
import useCountUp from '../../../hooks/useCountUp'

export default function Stat({ value, suffix = '', label }: { value: number; suffix?: string; label: string }) {
  const { ref, value: count } = useCountUp(value, 1400)
  return (
    <div ref={ref} className="border-l border-paint-primary/45 pl-4">
      <p className="font-serif text-[clamp(1.8rem,3vw,2.6rem)] text-white">{count}{suffix}</p>
      <p className="mt-1 text-[9px] uppercase tracking-[.16em] text-slate-400">{label}</p>
    </div>
  )
}
