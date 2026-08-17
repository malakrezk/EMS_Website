/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#010B1F',
          50: '#e8ecf2',
          100: '#c3cedd',
          200: '#9aadc4',
          300: '#708cab',
          400: 'rgb(1, 116, 154)',
          500: '#2c4c75',
          600: '#173a63',
          700: '#0A2A52',
          800: '#061A3A',
          900: '#010B1F',
          950: '#000817'
        },
        primary: {
          DEFAULT: '#299BF0',
          50: '#EAF6FF',
          100: '#CDEAFF',
          200: '#9CD7FF',
          300: '#6BC3FF',
          400: '#45B2FA',
          500: '#176aaa',
          600: '#147FD1',
          700: '#0D64A8',
          800: '#0A4B7D',
          900: '#073455'
        },
        cyan: {
          DEFAULT: '#23C7FF',
          50: '#E8FAFF',
          100: '#C9F4FF',
          200: '#9BEAFF',
          300: '#72E5FF',
          400: '#42D9FF',
          500: '#23C7FF',
          600: '#0BA5D8',
          700: '#087FA8',
          800: '#075C79',
          900: '#063A4D'
        },
        surface: '#010B1F',
        card: '#0B2548',
        muted: '#AFC3DB',
        ink: '#FFFFFF'
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Inter"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      backgroundImage: {
        'grid-lines': 'linear-gradient(rgba(35,199,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(35,199,255,0.07) 1px, transparent 1px)',
        'radial-glow': 'radial-gradient(circle at 50% 0%, rgba(41,155,240,0.3), transparent 60%)'
      },
      backgroundSize: {
        grid: '40px 40px'
      },
      boxShadow: {
        glow: '0 0 40px rgba(35,199,255,0.25)',
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
