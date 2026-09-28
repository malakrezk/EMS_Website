// Existing Tailwind breakpoints and the site's narrow-phone/wide-screen overrides.
export const breakpoints = { sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536, wide: 1920, phone: 480 } as const
export const screens = Object.fromEntries(Object.entries(breakpoints).filter(([key]) => key !== 'phone').map(([key, value]) => [key, value + 'px']))

export const responsiveScreens = {
  'tiny-down': { max: '374px' },
  'phone-down': { max: (breakpoints.phone - 1) + 'px' },
  'sm-down': { max: (breakpoints.sm - 1) + 'px' },
  'md-down': { max: (breakpoints.md - 1) + 'px' },
  'lg-down': { max: (breakpoints.lg - 1) + 'px' },
  'short-landscape': { raw: '(max-height: 620px) and (orientation: landscape) and (max-width: ' + (breakpoints.lg - 1) + 'px)' },
  'short-desktop': { raw: '(max-height: 850px) and (min-width: ' + breakpoints.lg + 'px)' },
  'compact-desktop': { raw: '(max-height: 760px) and (min-width: ' + breakpoints.lg + 'px)' },
}
