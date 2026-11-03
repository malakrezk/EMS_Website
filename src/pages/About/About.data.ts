import { images as media } from '../../constants/images'
import { benefits, platformLayers, regionalMarkets, sectors, technologyPartners } from '../../data/zeta'
import { transitions } from '../../theme/transitions'

export const ease = transitions.reveal

export const pageMeta = {
  title: 'About EMS | Engineering Management Systems',
  description: 'EMS brings together engineering expertise, automation and digital technologies to support connected buildings, infrastructure and intelligent operations across Egypt and the GCC.',
  url: 'https://www.ems-me.com/about',
}

export const hero = {
  eyebrow: 'About EMS / Engineering Management Systems',
  titleLines: ['Engineering the Systems', 'Behind a Smarter World.'],
  subtitle: 'Connecting Engineering, Automation, and Intelligent Technologies.',
  description: 'EMS brings together engineering expertise, automation, and digital technologies to support connected buildings, infrastructure, and intelligent operations.',
  image: media.aboutHero,
  imageCompact: media.aboutHeroCompact,
  imageAlt: 'EMS engineering control room with live building and station dashboards',
  since: 'Since 2016',
  markets: regionalMarkets,
}

export const story = {
  label: '01 / Our Story',
  title: 'Built Around Engineering. Driven by Innovation.',
  lead: 'EMS connects MEP engineering, automation, SCADA and digital operations to make modern infrastructure safer, more efficient and easier to understand.',
  body: 'We combine practical engineering delivery with the control and digital capabilities that intelligent operation requires, linking the infrastructure people depend on with the operational intelligence their teams need. The result is places that perform with greater clarity, reliability and purpose.',
  principles: [
    { title: 'Our Mission', text: 'Analyze customer needs without compromising satisfaction, delivering economical, fast and high-quality solutions through full-scope MEP works and modern technologies.' },
    { title: 'Our Vision', text: 'Be a distinctive and independent MEP provider delivering modern, highly professional services across complete MEP requirements and the latest technologies.' },
  ],
  image: media.aboutStory,
  imageAlt: 'Engineering Management Systems control room with server racks and a live station dashboard',
  caption: { label: 'Integrated engineering', text: 'From physical systems to operational clarity.' },
  statistics: [
    { value: 10, suffix: '+', label: 'Years' },
    { value: regionalMarkets.length, label: 'Regional markets' },
    { value: technologyPartners.length, label: 'Technology platforms' },
    { value: platformLayers.length, label: 'Connected layers' },
  ],
  evolutionTitle: 'Experience built through deliberate evolution.',
  milestones: [
    { label: '2016', title: 'EMS founded', text: 'Engineering delivery and accountable management brought together under one clear purpose.' },
    { label: 'Foundation', title: 'MEP contracting', text: 'A multidisciplinary delivery base established across mechanical, electrical and facility systems.' },
    { label: 'Evolution', title: 'Automation & control', text: 'Capabilities expanded into BMS, SCADA and connected infrastructure control.' },
    { label: 'Innovation', title: 'ZETA platform', text: 'IoT, AI, dashboards and digital facility context unified in one operating layer.' },
    { label: 'Regional', title: 'Egypt & GCC growth', text: 'The EMS approach applied across more markets, facilities and infrastructure environments.' },
    { label: 'Future', title: 'Intelligent operations', text: 'Advancing AI-assisted management, energy insight and sustainable connected infrastructure.' },
  ],
  presence: [
    { title: 'Regional presence', items: regionalMarkets },
    { title: 'Where we work', items: sectors },
  ],
}

export const approach = {
  label: '02 / Our Approach',
  title: 'Understand. Engineer. Connect. Evolve.',
  stages: [
    { number: '01', title: 'Understand', text: 'Identify operational requirements and engineering challenges.' },
    { number: '02', title: 'Engineer', text: 'Develop an integrated architecture around the project objectives.' },
    { number: '03', title: 'Connect', text: 'Integrate compatible field devices, systems, networks, and platforms.' },
    { number: '04', title: 'Evolve', text: 'Support operational visibility, modernization, and future integration opportunities.' },
  ],
  valuesIntro: 'Innovation, reliability, excellence and partnership guide the way EMS delivers every system and relationship.',
  values: [
    { title: 'Innovation', text: 'Apply technology where it creates meaningful operational value.' },
    { title: 'Reliability', text: 'Engineer systems and relationships for dependable long-term performance.' },
    { title: 'Excellence', text: 'Bring technical depth and disciplined execution to every stage.' },
    { title: 'Partnership', text: 'Work alongside clients to understand the outcome behind every requirement.' },
  ],
}

export const leadership = {
  label: '03 / Leadership',
  title: 'The Vision Behind EMS.',
  intro: 'Meet the leadership guiding EMS toward more connected, sustainable infrastructure across the region.',
  name: 'Ahmed Elzayat',
  role: 'Founder & CEO',
  portrait: media.ahmedElzayat,
  biography: 'A mechanical power engineer and business leader with two decades of experience across Egypt and GCC markets, connecting rigorous engineering delivery with intelligent automation and digital transformation.',
  vision: 'His vision is to transform how organizations operate through innovative technology integration.',
  links: [
    { id: 'biography', label: 'Read biography', href: 'https://enterpriseam.com/egypt/2024/10/31/my-morning-routine-ahmed-elzayat-founder-and-ceo-of-engineering-management-systems/' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://eg.linkedin.com/in/ahmed-elzayat-a8325b41' },
    { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/share/1LkNgGndZa/?mibextid=wwXIfr' },
  ],
  interview: {
    youtubeId: '_xLHsVvXjvE',
    eyebrow: 'Featured conversation',
    title: 'Artificial intelligence and the future of daily life',
    text: 'A closer look at the experience, innovation and ambition shaping EMS.',
  },
} as const

export type LeadershipLinkId = typeof leadership.links[number]['id']

const layer = (id: string) => {
  const match = platformLayers.find(item => item.id === id)
  if (!match) throw new Error(`Unknown platform layer: ${id}`)
  return match
}

export interface EcosystemNode {
  id: string
  label: string
  title: string
  summary: string
  capabilities: string[]
  to: string
  /** Position in the desktop diagram, as a percentage of its width and height. */
  x: number
  y: number
}

const node = (id: string, label: string, to: string, x: number, y: number): EcosystemNode => {
  const { title, summary, capabilities } = layer(id)
  return { id, label, title, summary, capabilities, to, x, y }
}

export const ecosystem = {
  label: '04 / What Connects Us',
  title: 'One Connected Engineering Ecosystem.',
  intro: 'EMS combines practical engineering delivery with the control and digital capabilities required for intelligent operation.',
  hub: { label: 'ZETA', text: 'Live systems, data, dashboards and digital context in one clear operating environment.' },
  nodes: [
    node('scada', 'SCADA', '/services/scada', 50, 9),
    node('building-management', 'BMS', '/services/building-management', 88, 30),
    node('iot', 'IoT', '/services/iot', 88, 70),
    node('artificial-intelligence', 'AI Analytics', '/services/artificial-intelligence', 50, 91),
    node('digital-twin', 'Digital Twin', '/services/digital-twin', 12, 70),
    node('robotics-iot', 'Automation', '/services/robotics-iot', 12, 30),
  ],
  disciplinesTitle: 'One disciplined approach across every system layer.',
  disciplines: [
    { title: 'Integrated MEP Engineering', text: 'Mechanical, electrical and life-safety systems coordinated around reliability, efficiency and maintainability.' },
    { title: 'Automation & Control', text: 'BMS, SCADA and intelligent control systems that make complex infrastructure easier to operate.' },
    { title: 'Connected Operations', text: 'ZETA brings live systems, data, dashboards and digital context into one clear operating environment.' },
  ],
  outcomes: benefits.map(([title, text]) => ({ title, text })),
}

export const technology = {
  label: '05 / Technology Ecosystem',
  title: 'Connected Through Technology.',
  intro: 'EMS projects draw on technologies from established global vendors across industrial automation, networking and enterprise data.',
  brands: [
    { id: 'siemens', name: 'Siemens', logo: media.siemens, domain: 'Industrial automation & control' },
    { id: 'cisco', name: 'Cisco', logo: media.cisco, domain: 'Networking & connectivity' },
    { id: 'oracle', name: 'Oracle', logo: media.oracle, domain: 'Databases & enterprise data' },
  ],
  toolkit: { title: 'Also in our development toolkit', items: ['Python', 'Visual Studio'] },
}

export const closing = {
  title: "Let's Engineer What's Next.",
  text: 'Discover how EMS can support your next engineering, automation, or intelligent infrastructure project.',
  image: media.aboutClosing,
  primary: { label: 'Contact EMS', to: '/contact' },
  secondary: { label: 'Explore Our Projects', to: '/projects' },
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Engineering Management Systems (EMS)',
  alternateName: 'EMS',
  url: 'https://www.ems-me.com',
  logo: `https://www.ems-me.com${media.emsLogo}`,
  foundingDate: '2016',
  areaServed: regionalMarkets,
  founder: { '@type': 'Person', name: leadership.name, jobTitle: leadership.role, sameAs: [leadership.links[1].href, leadership.links[2].href] },
}
