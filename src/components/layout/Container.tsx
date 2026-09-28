import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

const Container = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function Container({ className, ...props }, ref) {
  return <div ref={ref} {...props} className={cn('container-ems', className)} />
})
export default Container
