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

/** The services showcase heading. The services it covers are named on the pills under the cards, in the order the cards follow. */
export const homeShowcaseHeading = {
  title: 'Engineering Solutions',
}

export const homeServiceShowcase: ServiceShowcaseItem[] = [
  {
    id: 'bms',
    title: 'BMS',
    heading: 'Building Management Systems',
    description: 'Unified building management for HVAC, power, lighting, security and life-safety systems.',
    points: [
      { title: 'Centralized Building Management', text: 'Integrating building systems into one intelligent monitoring and control platform.' },
      { title: 'Smart Automation & Energy Efficiency', text: 'Optimizing HVAC, lighting, and power systems for efficient building operations.' },
      { title: 'Intelligent Building Integration', text: 'Connecting BMS with IoT, AI analytics, and Digital Twin technologies.' },
      { title: 'BMS Modernization & Digital Transformation', text: 'Modernizing existing BMS through data integration, analytics, and Digital Twin capabilities.' },
    ],
    to: '/services/building-management',
    ctaLabel: 'Explore BMS Solutions',
    cardAlt: 'Al-Najd Twin Towers building management dashboard, with HVAC, indoor environment, alarm, electrical, water and energy panels around a 3D model of the towers',
    // The Al-Najd Twin Towers BMS dashboard, shown on the large card.
    background: images.showcaseBmsDashboard,
  },
  {
    id: 'scada',
    title: 'SCADA',
    description: 'Real-time supervisory control, alarms and operational visibility across distributed infrastructure.',
    points: [
      { title: 'Water & Wastewater Automation', text: 'Monitoring and controlling pumping operations, equipment status, alarms, and field instrumentation.' },
      { title: 'Centralized Monitoring & Control', text: 'Bringing operational data from multiple stations into one coordinated monitoring and control environment.' },
      { title: 'PLC & SCADA Integration', text: 'Integrating controllers, operator interfaces, communication networks, and supervisory software.' },
      { title: 'SCADA Modernization & Digital Operations', text: 'Upgrading existing systems and enabling integration with IoT platforms, AI analytics, and Digital Twin applications.' },
    ],
    to: '/services/scada',
    ctaLabel: 'Explore SCADA Solutions',
    cardAlt: 'SCADA dashboard of the Investors-Ext sewage lifting station, with energy, electrical, pump and flow panels around a 3D model of the station',
    // The Investors-Ext sewage lifting station dashboard, shown on the large card. It is 16:9, so it shows whole.
    background: images.homeServiceDigitalTwin,
  },
  {
    id: 'iot',
    title: 'IoT',
    description: 'Connected sensors and devices that transform facility data into clear, actionable insight.',
    points: [
      { title: 'Connected Assets & Sensors', text: 'Connecting compatible devices, sensors, and equipment to collect and exchange operational data.' },
      { title: 'Remote Asset Monitoring', text: 'Providing authorized teams with remote access to asset status, measurements, and alerts.' },
      { title: 'IoT Dashboards & Operational Insights', text: 'Turning connected data into clear dashboards, trends, and reports for informed decision-making.' },
      { title: 'BMS & SCADA Integration', text: 'Integrating IoT data with compatible building and infrastructure platforms for coordinated operations.' },
    ],
    to: '/services/iot',
    ctaLabel: 'Explore IoT Solutions',
    cardAlt: 'IoT dashboard of the Investors-Ext station, with live camera feeds, people counts, detection alerts and the EMS assistant',
    // The EMS live cameras dashboard, shown on the large card. It is 1.7:1, so the 16:9 card trims a sliver from its top and bottom.
    background: images.iotDashboard,
  },
  {
    id: 'ai',
    title: 'AI',
    heading: 'Artificial Intelligence',
    description: 'AI-powered analytics for smarter decisions, predictive maintenance and efficient operations.',
    points: [
      { title: 'Predictive Maintenance & Fault Detection', text: 'Analyzing equipment data to identify potential failure indicators and support maintenance prioritization.' },
      { title: 'Intelligent Energy Management', text: 'Analyzing consumption patterns and operating schedules to identify potential energy-saving opportunities.' },
      { title: 'Operational Analytics & Anomaly Detection', text: 'Interpreting BMS and SCADA data to recognize unusual conditions and assess system performance.' },
      { title: 'AI & Digital Twin Integration', text: 'Combining AI analytics with digital asset environments to support operational analysis and informed decisions.' },
    ],
    to: '/services/artificial-intelligence',
    ctaLabel: 'Explore AI Solutions',
    cardAlt: 'AI-powered EMS security monitoring dashboard, with office camera feeds, smoke and intrusion alerts, detection trends and an event timeline',
    // 16:9, so it shows whole on the large card.
    background: images.homeServiceAi,
  },
  {
    id: 'digital-twin',
    title: 'Digital Twin',
    description: 'A connected digital representation of physical systems for simulation, monitoring and remote insight.',
    points: [
      { title: 'Connected Digital Asset Representation', text: 'Combining asset information, system relationships, and operational data in one coordinated digital view.' },
      { title: 'Operational Status & Performance Visualization', text: 'Visualizing equipment conditions, measurements, and historical trends within the context of each asset.' },
      { title: 'Maintenance & Energy Analysis', text: 'Using equipment records and operational history to support maintenance planning and identify performance improvements.' },
      { title: 'BMS, SCADA & AI Integration', text: 'Connecting compatible monitoring systems and AI analytics to support anomaly detection and informed operational decisions.' },
    ],
    to: '/services/digital-twin',
    ctaLabel: 'Explore Digital Twin Solutions',
    cardAlt: 'Digital twin of the Investors-Ext sewage lifting station: a 3D model of the station surrounded by its live energy, pump and flow panels',
    background: images.solutionsApproachDashboard,
  },
  {
    id: 'robotics',
    title: 'Robotics',
    description: 'Connected robotic automation engineered to improve precision, throughput and workplace safety.',
    points: [
      { title: 'Interactive Virtual Assistant', text: 'Helping users navigate dashboards and access relevant facility information through a digital assistant.' },
      { title: 'Voice & Text Interaction', text: 'Enabling users to ask questions and request operational information through voice or text.' },
      { title: 'Operational Data Assistance', text: 'Presenting equipment status, alarms, and performance summaries from connected systems.' },
      { title: 'Integrated Platform Support', text: 'Connecting the assistant with compatible BMS, SCADA, and IoT platforms to support daily operational tasks.' },
    ],
    to: '/services/robotics-iot',
    ctaLabel: 'Explore Robotics Solutions',
    cardAlt: 'EMS AI assistant robot surrounded by holographic panels for live feeds, AI detections, incidents and camera health',
    // A square image: it shows whole inside the large card rather than cropped to fill it.
    background: images.homeServiceRobotics,
    cardFit: 'contain',
  },
  {
    id: 'mobile-applications',
    title: 'Mobile Applications',
    description: homeMobileApplicationService.description,
    points: [
      { title: 'Mobile Monitoring & Dashboards', text: 'Giving authorized teams mobile access to equipment status, operational data, and facility dashboards.' },
      { title: 'Alarms & Event Notifications', text: 'Keeping teams informed through configurable notifications for operational events and equipment alerts.' },
      { title: 'Maintenance & Work Order Management', text: 'Enabling teams to receive tasks, update work status, and document inspections and completed maintenance.' },
      { title: 'Connected Multi-Site Operations', text: 'Bringing selected BMS, SCADA, and IoT information from multiple facilities into one mobile interface.' },
    ],
    to: homeMobileApplicationService.to,
    ctaLabel: 'Explore Mobile App Solutions',
    cardAlt: 'EMS mobile application for a connected residential compound shown on a smartphone',
    // A tall phone screen: it shows whole inside the large card rather than cropped to fill it.
    background: images.parkLaneMobileApp,
    cardFit: 'contain',
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
