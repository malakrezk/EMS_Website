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

export interface NavigationItem { to: string; label: string }

export interface Industry {
  id: string; icon: IconType; title: string; image: string; description: string; services: string[]
}
