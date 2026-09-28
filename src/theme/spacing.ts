import defaults from 'tailwindcss/defaultTheme'
export const spacing = { ...defaults.spacing, section: 'clamp(3.5rem, 6vw, 6rem)', gutter: 'clamp(1rem, 3vw, 2.5rem)' }
export const containers = { default: '1500px', wide: '1680px' }
