/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#07182E',
          50: '#e8ecf2',
          100: '#c3cedd',
          200: '#9aadc4',
          300: '#708cab',
          400: '#4d6d93',
          500: '#2c4f7c',
          600: '#173a63',
          700: '#0c2947',
          800: '#102A43',
          900: '#07182E',
          950: '#040d1a'
        },
        primary: {
          DEFAULT: '#0066FF',
          50: '#e6f0ff',
          100: '#bcd7ff',
          200: '#8fbcff',
          300: '#5fa0ff',
          400: '#3986ff',
          500: '#0066FF',
          600: '#0052cc',
          700: '#003d99',
          800: '#002d75',
          900: '#001e53'
        },
        cyan: {
          DEFAULT: '#00C8FF',
          50: '#e0f8ff',
          100: '#b3edff',
          200: '#80e1ff',
          300: '#4dd5ff',
          400: '#26caff',
          500: '#00C8FF',
          600: '#00a3cc',
          700: '#007e99',
          800: '#005a66',
          900: '#002533'
        },
        surface: '#07182E',
        card: '#132F4C',
        muted: '#B8C5D1',
        ink: '#FFFFFF'
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Inter"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      backgroundImage: {
        'grid-lines': 'linear-gradient(rgba(0,184,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,255,0.06) 1px, transparent 1px)',
        'radial-glow': 'radial-gradient(circle at 50% 0%, rgba(0,102,255,0.28), transparent 60%)'
      },
      backgroundSize: {
        grid: '40px 40px'
      },
      boxShadow: {
        glow: '0 0 40px rgba(0,200,255,0.25)',
        card: '0 10px 40px -12px rgba(4,13,26,0.45)'
      },
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
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.3 }
        }
      },
      animation: {
        pulseLine: 'pulseLine 3s linear infinite',
        float: 'float 6s ease-in-out infinite',
        blink: 'blink 2s ease-in-out infinite'
      }
    }
  },
  plugins: []
}
