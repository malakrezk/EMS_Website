import defaults from 'tailwindcss/defaultTheme'
export const fontFamily = {
  "serif": [
    "\"Playfair Display\"",
    "Georgia",
    "serif"
  ],
  "display": [
    "\"Inter\"",
    "sans-serif"
  ],
  "body": [
    "\"Inter\"",
    "sans-serif"
  ],
  "mono": [
    "\"JetBrains Mono\"",
    "monospace"
  ]
}
export const typography = {
  fontFamily, fontSize: defaults.fontSize, fontWeight: defaults.fontWeight, lineHeight: defaults.lineHeight, letterSpacing: defaults.letterSpacing,
  responsive: { hero: 'clamp(48px, 5vw, 76px)', section: 'clamp(38px, 4vw, 60px)', subheading: 'clamp(28px, 3vw, 42px)', 'card-title': 'clamp(22px, 2vw, 32px)', lead: 'clamp(18px, 1.5vw, 22px)', body: 'clamp(15px, 1.1vw, 18px)', label: 'clamp(12px, 1vw, 15px)', caption: '13px' },
  mobile: { hero: 'clamp(38px, 12vw, 46px)', section: 'clamp(30px, 9vw, 38px)', subheading: 'clamp(24px, 7.5vw, 30px)', 'card-title': 'clamp(20px, 6vw, 25px)', lead: 'clamp(16px, 4.8vw, 18px)', body: 'clamp(14px, 4vw, 16px)', label: '12px', caption: '12px' },
} as const
