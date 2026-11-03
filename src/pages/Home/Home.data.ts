import type { IconType } from 'react-icons'
import { HiOutlineBuildingOffice2, HiOutlineGlobeAlt, HiOutlineMapPin } from 'react-icons/hi2'
import { images } from '../../constants/images'
import { partners } from '../../data/partners'
import { projects } from '../../data/projects'
import { transitions } from '../../theme/transitions'
import type { ServiceShowcaseItem } from '../../types/content.types'

export const solutionCards = [
  { id: 'building-management', title: 'BMS', label: 'Intelligent buildings', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=88', text: 'Centralized building management for intelligent monitoring, control and energy efficiency.', to: '/services/building-management' },
  { id: 'scada', title: 'SCADA', label: 'Infrastructure control', image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1800&q=88', text: 'Real-time supervision and control for industrial systems and critical infrastructure.', to: '/services/scada' },
  { id: 'iot', title: 'IoT', label: 'Connected operations', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1800&q=88', text: 'Connected sensors, devices and infrastructure that turn operational data into intelligent action.', to: '/services/iot' },
  { id: 'artificial-intelligence', title: 'Artificial Intelligence', label: 'Operational intelligence', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=88', text: 'AI-powered automation, prediction and decision support for smarter operations.', to: '/services/artificial-intelligence' },
  { id: 'digital-twin', title: 'Digital Twin', label: 'Virtual operations', image: images.heroControlRoom04, text: 'Virtual representations of physical systems for monitoring, simulation and optimization.', to: '/services/digital-twin' },
  { id: 'robotics-iot', title: 'Robotics & IoT', label: 'Smart automation', image: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=1800&q=88', text: 'Connected robotic automation combining intelligent machines, sensors and real-time control.', to: '/services/robotics-iot' },
]

export const homeCaseStudyOrder: [string, string, string | undefined, string | undefined, string, string, string[]][] = [
  ['data-center-operations', 'Data Center', undefined, images.geminiGeneratedImage1ujzed1ujzed1ujz, 'Connected Digital Infrastructure', 'Centralized monitoring and intelligent control for resilient data-center operations.', ['24/7 Infrastructure Visibility', 'Integrated Critical Systems']],
  ['water-treatment-plant-automation', 'Water Infrastructure', images.investorsWater, images.industryWaterDashboard, 'Smart Water Management', 'Connected monitoring and intelligent control for safer, more efficient water operations.', ['Real-Time Monitoring', 'Predictive Maintenance']],
  ['smart-hospital', 'Hospital', undefined, undefined, 'Integrated Healthcare Infrastructure', 'Connected facility systems provide clear, real-time oversight across healthcare operations.', ['Integrated Building Management', 'Real-Time Monitoring']],
  ['wadi-zaha-project', 'Residential Compounds', images.parkLaneCompounds, images.industryMallsDashboard, 'Connected Residential Infrastructure', 'Integrated MEP and automation systems support connected residential communities.', ['Integrated MEP Systems', 'Smart Residential Automation']],
  ['industrial-scada-system', 'Industrial Facilities', images.abdellatefIndustrial, images.industrialAbdellatefPoster, 'Integrated Industrial Automation', 'Integrated PLC and SCADA control supports reliable manufacturing operations.', ['Live Process Visibility', 'Integrated PLC & SCADA']],
]

export const homeCaseStudies = homeCaseStudyOrder
  .map(([id, name, videoSrc, poster, subtitle, description, highlights]) => {
    const project = projects.find(item => item.id === id)
    return project
      ? {
        ...project,
        name,
        location: subtitle,
        description,
        highlights,
        ...(videoSrc ? { videoSrc } : {}),
        ...(poster ? { poster } : {}),
      }
      : null
  })
  .filter((project): project is NonNullable<typeof project> => project !== null)

export const ease = transitions.reveal

export const homeMobileApplicationService = {
  title: 'Mobile Applications',
  subtitle: 'Connected Operations, Wherever You Are',
  description: 'Custom mobile applications that bring your dashboards, alerts, and operational workflows together in one accessible experience.',
  image: images.parkLaneMobileApp,
  videoSrc: images.mobileAppVideo,
  highlights: ['Mobile Dashboards & Alerts', 'Connected Operational Workflows'],
  cta: 'Discuss your mobile application',
  to: '/mobile-app',
}

export interface AboutMilestone {
  id: string
  title: string
  text: string
  icon: IconType
}

// In the order EMS grew; the About timeline draws from one to the next.
export const aboutMilestones: AboutMilestone[] = [
  { id: 'egypt', title: 'Founded in Egypt', text: 'Established as a premier MEP contracting company in Egypt.', icon: HiOutlineBuildingOffice2 },
  { id: 'saudi-arabia', title: 'Expanded in Saudi Arabia', text: 'Expanded operations in Saudi Arabia to serve the wider regional market.', icon: HiOutlineGlobeAlt },
  { id: 'oman', title: 'Expanded in Oman', text: 'Expanded operations in Oman to support projects across the Sultanate.', icon: HiOutlineMapPin },
]

/** The services showcase heading, and the services it names, in the order the cards follow. */
export const homeShowcaseHeading = {
  title: 'Engineering Solutions',
  services: ['BMS', 'SCADA', 'IoT', 'AI', 'Digital Twin', 'Robotics', 'Mobile Applications'],
}

export const homeServiceShowcase: ServiceShowcaseItem[] = [
  {
    id: 'bms',
    title: 'BMS',
    label: 'Building Management Systems',
    description: 'Unified building management for HVAC, power, lighting, security and life-safety systems.',
    points: [
      { title: 'Centralized Building Management', text: 'Integrating building systems into one intelligent monitoring and control platform.' },
      { title: 'Smart Automation & Energy Efficiency', text: 'Optimizing HVAC, lighting, and power systems for efficient building operations.' },
      { title: 'Intelligent Building Integration', text: 'Connecting BMS with IoT, AI analytics, and Digital Twin technologies.' },
    ],
    to: '/services/building-management',
    card: images.showcaseBmsCard,
    cardAlt: 'Smart office building at dusk with connected ventilation, temperature, lighting, energy, security and elevator systems',
    background: images.showcaseBmsBackground,
    // The large card shows the live EMS station dashboard.
    wide: images.solutionsApproachDashboard,
  },
  {
    id: 'scada',
    title: 'SCADA',
    label: 'SCADA & Infrastructure Control',
    description: 'Real-time supervisory control, alarms and operational visibility across distributed infrastructure.',
    to: '/services/scada',
    card: images.showcaseScadaCard,
    cardAlt: 'Operators monitoring a water treatment plant from a SCADA control room',
    background: images.serviceScadaHero,
  },
  {
    id: 'iot',
    title: 'IoT',
    label: 'Internet of Things',
    description: 'Connected sensors and devices that transform facility data into clear, actionable insight.',
    to: '/services/iot',
    card: images.homeServiceIotCard,
    cardAlt: 'IoT cloud dashboard connecting field devices, sensors and control panels across a facility',
    background: images.showcaseIotBackground,
    // The large card shows the EMS live cameras dashboard, prepared at the card's 1.7:1 shape so it fills without cropping.
    wide: images.iotDashboard,
  },
  {
    id: 'ai',
    title: 'AI',
    label: 'Artificial Intelligence',
    description: 'AI-powered analytics for smarter decisions, predictive maintenance and efficient operations.',
    to: '/services/artificial-intelligence',
    card: images.showcaseAiCard,
    cardAlt: 'AI command center dashboard with live monitoring, event detection, occupancy analytics and predictive maintenance',
    background: images.showcaseAiBackground,
  },
  {
    id: 'digital-twin',
    title: 'Digital Twin',
    label: '3D Operations',
    description: 'A connected digital representation of physical systems for simulation, monitoring and remote insight.',
    to: '/digital-twin',
    card: images.showcaseDigitalTwinCard,
    cardAlt: '3D digital twin of a sewage lifting station above its live operations dashboard',
    background: images.solutionsApproachDashboard,
  },
  {
    id: 'robotics',
    title: 'Robotics',
    label: 'Robotics & IoT',
    description: 'Connected robotic automation engineered to improve precision, throughput and workplace safety.',
    to: '/services/robotics-iot',
    card: images.homeServiceRoboticsCard,
    cardAlt: 'AI assistant robot surrounded by robotic automation and monitoring interfaces',
    background: images.homeServiceRobotics,
  },
  {
    id: 'mobile-applications',
    title: 'Mobile Applications',
    description: homeMobileApplicationService.description,
    to: homeMobileApplicationService.to,
    ctaLabel: homeMobileApplicationService.cta,
    card: images.showcaseMobileApplicationsCard,
    cardAlt: 'EMS mobile application for a connected residential compound shown on a smartphone',
    background: images.parkLaneMobileApp,
  },
]

export const featuredPartners = partners.filter(partner => ['siemens', 'cisco', 'oracle'].includes(partner.id))

export const industryGroups: { id: string; title: string; image: string; description: string; to: string; video?: string }[] = [
  {
    id: 'towers',
    title: 'TOWERS',
    image: images.industryTowersDashboard,
    description: 'Intelligent building systems that coordinate comfort, safety, energy and vertical transportation.',
    to: '/industries/commercial-buildings',
  },
  {
    id: 'hospitals',
    title: 'HOSPITALS',
    image: images.suezMedicalComplex,
    description: 'Resilient, clinically safe infrastructure supporting uninterrupted patient care and critical operations.',
    to: '/industries/hospitals',
  },
  {
    id: 'malls',
    title: 'COMPOUNDS',
    image: images.industryMallsDashboard,
    description: 'Smart retail environments balancing visitor comfort, asset performance and energy efficiency.',
    to: '/industries/commercial-buildings',
  },
  {
    id: 'factories',
    title: 'FACTORIES',
    image: images.abdellatifJameelFactory,
    description: 'Integrated industrial automation, process visibility and energy control for efficient factory operations.',
    to: '/industries/industrial',
  },
  {
    id: 'water',
    title: 'WATER',
    image: images.industryWaterDashboard,
    description: 'Real-time automation, telemetry and energy control across treatment and distribution networks.',
    to: '/industries/water-systems',
  },
]
