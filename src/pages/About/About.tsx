import { useEffect } from 'react'
import PageBackground from '../../components/common/PageBackground'
import './About.css'
import { organizationSchema, pageMeta } from './About.data'
import ApproachSection from './components/ApproachSection'
import ClosingSection from './components/ClosingSection'
import EcosystemSection from './components/EcosystemSection'
import HeroSection from './components/HeroSection'
import LeadershipSection from './components/LeadershipSection'
import StorySection from './components/StorySection'
import TechnologySection from './components/TechnologySection'

// Sets a head element attribute for this route and returns a function that restores the previous state.
function applyHead(selector: string, create: () => HTMLElement, attribute: string, value: string) {
  const existing = document.head.querySelector<HTMLElement>(selector)
  const element = existing ?? document.head.appendChild(create())
  const previous = element.getAttribute(attribute)
  element.setAttribute(attribute, value)
  return () => {
    if (!existing) element.remove()
    else if (previous === null) element.removeAttribute(attribute)
    else element.setAttribute(attribute, previous)
  }
}

function metaElement(key: 'name' | 'property', name: string) {
  const element = document.createElement('meta')
  element.setAttribute(key, name)
  return element
}

export default function About() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = pageMeta.title
    const restore = [
      applyHead('meta[name="description"]', () => metaElement('name', 'description'), 'content', pageMeta.description),
      applyHead('meta[property="og:title"]', () => metaElement('property', 'og:title'), 'content', pageMeta.title),
      applyHead('meta[property="og:description"]', () => metaElement('property', 'og:description'), 'content', pageMeta.description),
      applyHead('meta[property="og:type"]', () => metaElement('property', 'og:type'), 'content', 'website'),
      applyHead('meta[property="og:url"]', () => metaElement('property', 'og:url'), 'content', pageMeta.url),
      applyHead('link[rel="canonical"]', () => Object.assign(document.createElement('link'), { rel: 'canonical' }), 'href', pageMeta.url),
    ]
    return () => {
      document.title = previousTitle
      restore.forEach(undo => undo())
    }
  }, [])

  return (
    <div className="about-page-shell engineering-page-background relative overflow-x-hidden text-white">
      <PageBackground />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <HeroSection />
      <StorySection />
      <ApproachSection />
      <LeadershipSection />
      <EcosystemSection />
      <TechnologySection />
      <ClosingSection />
    </div>
  )
}
