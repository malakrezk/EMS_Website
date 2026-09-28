import type { HTMLInputTypeAttribute } from 'react'
import type { IconType } from 'react-icons'
import AppInput from '../common/AppInput'

export interface CustomerFieldDefinition {
  id: string
  label: string
  type: HTMLInputTypeAttribute
  placeholder: string
  required: boolean
  hint?: string
  icon?: IconType
}

interface CustomerFieldProps {
  field: CustomerFieldDefinition
  variant?: 'checkout' | 'quote'
  value: string
  onChange: (value: string) => void
}
export default function CustomerField({ field, variant = 'quote', value, onChange }: CustomerFieldProps) {
  const { icon: Icon, label, hint, ...input } = field
  const control = <AppInput {...input} variant={variant} value={value} onChange={event => onChange(event.target.value)} />
  return <div>
    <label htmlFor={field.id} className={`block text-xs ${variant === 'checkout' ? 'font-semibold' : 'font-medium'} text-slate-300 mb-1`}>
      {label} {field.required && <span className="text-paint-accent">*</span>}
      {hint && <span className="text-slate-500 text-[11px] font-normal">{hint}</span>}
    </label>
    {Icon ? <div className="relative"><Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />{control}</div> : control}
  </div>
}
