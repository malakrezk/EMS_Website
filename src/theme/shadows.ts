import defaults from 'tailwindcss/defaultTheme'
export const shadows = {
  ...defaults.boxShadow, ...{
    "glow": "0 0 40px rgba(35,199,255,0.25)",
    "card": "0 10px 40px -12px rgba(4,13,26,0.45)"
  }
}
