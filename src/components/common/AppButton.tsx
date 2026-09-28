import type { ButtonHTMLAttributes } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { cn } from '../../utils/cn'

type Variant = 'primary' | 'outline' | 'brand'
type AppButtonProps = (ButtonHTMLAttributes<HTMLButtonElement> & { to?: never } | LinkProps) & { variant?: Variant }
const variants: Record<Variant, string> = { primary: 'btn-primary', outline: 'btn-outline', brand: 'brand-gradient-button' }

export default function AppButton({ variant = 'primary', className, ...props }: AppButtonProps) {
  const classes = cn(variants[variant], className)
  if ('to' in props && props.to !== undefined) return <Link {...props as LinkProps} className={classes} />
  return <button type="button" {...props as ButtonHTMLAttributes<HTMLButtonElement>} className={classes} />
}
