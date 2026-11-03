import type { IconType } from 'react-icons'

export interface Project {
  id: string
  name: string
  location: string
  industry: string
  categories: string[]
  accent: string
  image: string
  videoSrc?: string
  videoId?: string
  poster?: string
  description: string
  challenge: string
  solution: string
  services: string[]
  technologies: string[]
  highlights: string[]
  results: { value: string; label: string }[]
  gallery: number
}

export interface PlatformLayer {
  id: string
  title: string
  label: string
  icon: IconType
  summary: string
  description: string
  capabilities: string[]
}

export interface Service extends PlatformLayer {
  image: string
  short: string
}

export interface ShowcaseService {
  id: string
  title: string
  icon: IconType
  image: string
  description: string
  features: string[]
  to?: string
}

/** One key point of a showcase service: a short title and a line of text. */
export interface ShowcasePoint { title: string; text: string }

/** One service in the homepage showcase: a 3:4 card image plus a landscape section background. */
export interface ServiceShowcaseItem {
  id: string
  title: string
  /** Optional full name of the service, shown under its card while in focus, e.g. Building Management Systems. */
  label?: string
  description: string
  /** Optional key points, shown as a numbered list in place of the description. */
  points?: ShowcasePoint[]
  to: string
  ctaLabel?: string
  card: string
  cardAlt: string
  background: string
  /** Image for the card while it is shown large and wide. Defaults to the background. */
  wide?: string}

/** Video shown in the homepage large player: any project or service clip. */
export interface VideoClip { name: string; location: string; videoSrc?: string; poster?: string }

export interface NavigationItem { to: string; label: string }

export interface Industry {
  id: string; icon: IconType; title: string; image: string; description: string; services: string[]
}
