import type { IconType } from 'react-icons'
import {
  HiOutlineBuildingOffice2, HiOutlineCheckBadge,
  HiOutlineGlobeAlt
} from 'react-icons/hi2'
import { images } from '../../constants/images'
import { partners } from '../../data/partners'
import { projects } from '../../data/projects'
import { getShowcaseService } from '../../data/servicesShowcase'
import { transitions } from '../../theme/transitions'
import type { ShowcaseService } from '../../types/content.types'

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
  ['zia-building-complex', 'Smart Buildings', images.cn05Buildings, images.industryTowersDashboard, 'Intelligent Building Management', 'Unified smart-building visibility supports coordinated and efficient facility operations.', ['Unified Building Visibility', 'Siemens-Integrated Controls']],
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

export const aboutMilestones: [string, string, IconType][] = [
  ['Founded in Egypt', 'Established as a premier MEP contracting company in Egypt.', HiOutlineBuildingOffice2],
  ['Expanded in Saudi Arabia', 'Expanded operations in Saudi Arabia to serve the wider regional market.', HiOutlineGlobeAlt],
  ['Expanded in England', 'Expanded operations in England to connect EMS with international markets.', HiOutlineCheckBadge],
]

export const homeServiceCards: ShowcaseService[] = [
  {
    ...getShowcaseService('building-management-systems'),
    title: 'BMS',
    image: images.homeServiceBms,
    description: 'Unified building management for HVAC, power, lighting, security and life-safety systems.',
    features: ['Unified building dashboards', 'HVAC and lighting control', 'Energy and fault reporting'],
  },
  {
    ...getShowcaseService('scada'),
    title: 'SCADA',
    image: images.serviceScadaControlRoom,
    description: 'Real-time supervisory control, alarms and operational visibility across distributed infrastructure.',
    features: ['Live process visualization', 'Remote telemetry and alarms', 'Historian and reporting'],
  },
  {
    ...getShowcaseService('light-current-systems'),
    title: 'IoT',
    image: images.serviceIot,
    description: 'Connected sensors and devices that transform facility data into clear, actionable insight.',
    features: ['Connected sensors and gateways', 'Real-time device monitoring', 'Secure data integration'],
  },
  {
    ...getShowcaseService('control-systems'),
    title: 'AI',
    image: images.serviceAi,
    description: 'AI-powered analytics for smarter decisions, predictive maintenance and efficient operations.',
    features: ['Predictive maintenance', 'Operational analytics', 'Intelligent recommendations'],
  },
  {
    ...getShowcaseService('industrial-automation'),
    title: 'Robotics',
    image: images.screenshot20260914221026,
    description: 'Connected robotic automation engineered to improve precision, throughput and workplace safety.',
    features: ['Robotic process integration', 'Production automation', 'Performance monitoring'],
  },
  {
    ...getShowcaseService('energy-management'),
    id: 'digital-twin',
    title: 'Digital Twin',
    image: images.serviceDigitalTwinDashboard,
    description: 'A connected digital representation of physical systems for simulation, monitoring and remote insight.',
    features: ['Live operational context', 'Remote system understanding', 'Simulation and maintenance support'],
    to: '/digital-twin',
  },
]

export const featuredPartners = partners.filter(partner => ['siemens', 'cisco', 'aws', 'oracle'].includes(partner.id))

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
