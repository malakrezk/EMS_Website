import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

/**
 * Consistent section heading used across the site: an uppercase mono eyebrow,
 * a display headline, and an optional supporting paragraph.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
  className = ''
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {eyebrow && (
        <span className="eyebrow mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'font-serif text-2xl sm:text-3xl md:text-[2.55rem] font-medium leading-[1.18] text-white'
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-sm sm:text-base leading-7 text-muted/85">{description}</p>
      )}
    </motion.div>
  )
}
