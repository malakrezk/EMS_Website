import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
import { borderRadius } from './src/theme/borderRadius'
import { breakpoints, responsiveScreens, screens } from './src/theme/breakpoints'
import { colors, paintColors } from './src/theme/colors'
import { shadows } from './src/theme/shadows'
import { containers, spacing } from './src/theme/spacing'
import { transitions } from './src/theme/transitions'
import { fontFamily, typography } from './src/theme/typography'
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: { ...screens, ...responsiveScreens },
    spacing,
    borderRadius,
    transitionDuration: transitions.duration,
    transitionTimingFunction: transitions.easing,
    extend: {
      colors: { ...colors, paint: paintColors },
      fontFamily,
      backgroundImage: {
        'grid-lines': 'linear-gradient(rgba(35,199,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(35,199,255,0.07) 1px, transparent 1px)',
        'radial-glow': 'radial-gradient(circle at 50% 0%, rgba(41,155,240,0.3), transparent 60%)'
      },
      backgroundSize: {
        grid: '40px 40px'
      },
      boxShadow: shadows,
      keyframes: {
        pulseLine: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' }
        }
      },
      animation: {
        pulseLine: 'pulseLine 3s linear infinite',
        float: 'float 6s ease-in-out infinite',
        blink: 'blink 2s ease-in-out infinite'
      }
    }
  },
  plugins: [plugin(({ addBase }) => {
    addBase({
      ':root': {
        ...Object.fromEntries(Object.entries(paintColors).map(([name, value]) => ['--paint-' + name, value])),
        ...Object.fromEntries(Object.entries(typography.responsive).map(([name, value]) => ['--text-' + name, value])),
        '--container-width': containers.default, '--container-wide': containers.wide,
        '--section-space': spacing.section, '--container-gutter': spacing.gutter,
      },
      ['@media (max-width: ' + (breakpoints.phone - 1) + 'px)']: { ':root': Object.fromEntries(Object.entries(typography.mobile).map(([name, value]) => ['--text-' + name, value])) },
    })
  })]
} satisfies Config
