import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export const inputClassName = 'w-full rounded-sm border border-white/15 bg-white/5 px-4 py-3 text-sm text-white transition focus:border-cyan-300 focus:bg-white/[.08] focus:outline-none'
const variants = {
  contact: inputClassName,
  checkout: 'h-11 w-full rounded-xl border border-white/15 bg-paint-blue-05 pl-10 pr-3 text-sm text-white placeholder:text-slate-500 transition focus:border-paint-accent focus:outline-none focus:ring-1 focus:ring-paint-accent',
  quote: 'h-10 w-full rounded-lg border border-white/15 bg-paint-blue-08 px-3 text-sm text-white placeholder:text-slate-500 focus:border-paint-accent focus:outline-none focus:ring-1 focus:ring-paint-accent',
}
const AppInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & { variant?: keyof typeof variants }>(function AppInput({ className, variant = 'contact', ...props }, ref) {
  return <input ref={ref} {...props} className={cn(variants[variant], className)} />
})
export default AppInput
