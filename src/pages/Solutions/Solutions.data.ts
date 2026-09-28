import {
  HiOutlineBeaker,
  HiOutlineBuildingOffice2, HiOutlineChartBarSquare,
  HiOutlineCloud,
  HiOutlineCog6Tooth,
  HiOutlineCpuChip, HiOutlineCubeTransparent, HiOutlineHeart,
  HiOutlineHomeModern, HiOutlineLightBulb,
  HiOutlineSignal
} from 'react-icons/hi2'
import { images } from '../../constants/images'
import { transitions } from '../../theme/transitions'

export const sectors = [
  {
    id: 'towers', number: '01', name: 'Towers', route: '/industries/commercial-buildings',
    headline: ['Smarter buildings.', 'Complete operational visibility.'],
    description: 'Unified control of building performance, comfort and energy—from one connected operating layer.',
    tags: ['BMS', 'ENERGY', 'IoT', 'AI'], image: images.sectorTowersCn05, dashboard: images.industryTowersDashboard, cardImage: images.sectorTowersCn05, video: images.cn05Buildings, icon: HiOutlineBuildingOffice2,
    status: 'Tower network', value: 'All systems nominal', metric: '18.4%', metricLabel: 'Energy optimized', accent: 'var(--paint-accent)', position: '50% 52%',
  },
  {
    id: 'compounds', number: '02', name: 'Compounds', route: '/industries/residential',
    headline: ['One community.', 'Every asset connected.'],
    description: 'Centralized intelligence across buildings, utilities, lighting, security and shared infrastructure.',
    tags: ['UTILITIES', 'SECURITY', 'LIGHTING', 'BMS'], image: images.sectorCompoundsParkLane, dashboard: images.industryMallsDashboard, cardImage: images.sectorCompoundsParkLane, video: images.parkLaneCompounds, icon: HiOutlineHomeModern,
    status: 'Community infrastructure', value: '176 assets online', metric: '22.6%', metricLabel: 'Footprint reduced', accent: 'var(--paint-blue-50)', position: '50% 48%',
  },
  {
    id: 'hospitals', number: '03', name: 'Hospitals', route: '/industries/hospitals',
    headline: ['Critical environments.', 'Engineered for continuity.'],
    description: 'Coordinated facility intelligence for resilient power, air quality, utilities and critical system awareness.',
    tags: ['HVAC', 'POWER', 'ALARMS', 'BMS'], image: images.sectorHospitalsSuez, dashboard: images.industryHospitalsDashboard, cardImage: images.sectorHospitalsSuez, video: images.smartHospitalMonitoring, icon: HiOutlineHeart,
    status: 'Facility operations', value: 'Critical systems stable', metric: '24/7', metricLabel: 'Live supervision', accent: 'var(--paint-blue-57)', position: '52% 45%',
  },
  {
    id: 'factories', number: '04', name: 'Factories', route: '/industries/industrial',
    headline: ['Production in view.', 'Performance in control.'],
    description: 'PLC, SCADA and energy intelligence working together across equipment, lines and plant utilities.',
    tags: ['SCADA', 'PLC', 'ENERGY', 'ANALYTICS'], image: images.sectorFactoriesAbdellatif, dashboard: images.industrialAbdellatefPoster, cardImage: images.sectorFactoriesAbdellatif, video: images.abdellatefIndustrial, icon: HiOutlineCog6Tooth,
    status: 'Production systems', value: '12 lines connected', metric: '99.9%', metricLabel: 'System uptime', accent: 'var(--paint-blue-43)', position: '50% 54%',
  },
  {
    id: 'water', number: '05', name: 'Water', route: '/industries/water-systems',
    headline: ['Every flow measured.', 'Every process connected.'],
    description: 'Real-time command of pumps, pressure, tanks, energy and treatment infrastructure across the water network.',
    tags: ['SCADA', 'PUMPS', 'FLOW', 'TELEMETRY'], image: images.sectorWaterInvestors, dashboard: images.industryWaterDashboard, cardImage: images.sectorWaterInvestors, video: images.investorsWater, icon: HiOutlineBeaker,
    status: 'Water infrastructure', value: '7 pumps running', metric: '7.75', metricLabel: 'Bar line pressure', accent: 'var(--paint-cyan)', position: '50% 52%',
  },
  {
    id: 'data-centers', number: '06', name: 'Data Center', route: '/industries/data-centers',
    headline: ['Always-on infrastructure.', 'Engineered for resilience.'],
    description: 'Precise visibility across critical power, cooling, security and digital infrastructure built for continuous uptime.',
    tags: ['DCIM', 'POWER', 'COOLING', 'UPTIME'], image: images.dataCenter1, dashboard: images.dataCenter1, cardImage: images.dataCenter1, icon: HiOutlineCloud,
    status: 'Digital infrastructure', value: 'Critical systems online', metric: '24/7', metricLabel: 'Infrastructure uptime', accent: 'var(--paint-blue-51)', position: '50% 50%',
  },
]

export const approach = [
  { number: '01', title: 'Understand the operation', text: 'We map the environment, critical assets, workflows and outcomes before defining technology.' },
  { number: '02', title: 'Engineer one architecture', text: 'Controls, field devices, networks and platforms are designed as one coordinated system.' },
  { number: '03', title: 'Connect physical and digital', text: 'BMS, SCADA, IoT and analytics turn real infrastructure into an intelligible operating model.' },
  { number: '04', title: 'Improve continuously', text: 'Live insight and automation help teams reduce waste, respond earlier and operate with confidence.' },
]

export const capabilities = [
  { name: 'BMS', label: 'Building intelligence', image: images.heroControlRoom02, icon: HiOutlineBuildingOffice2 },
  { name: 'SCADA', label: 'Infrastructure control', image: images.serviceScadaControlRoom, icon: HiOutlineChartBarSquare },
  { name: 'IoT', label: 'Connected field data', image: images.serviceIot, icon: HiOutlineSignal },
  { name: 'AI & Analytics', label: 'Operational insight', image: images.serviceAi, icon: HiOutlineCpuChip },
  { name: 'Energy', label: 'Performance management', image: images.heroData3, icon: HiOutlineLightBulb },
  { name: 'Digital Systems', label: 'Unified environments', image: images.heroControlRoom05, icon: HiOutlineCubeTransparent },
]

export const ease = transitions.reveal

export const dashboardVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 260 : -170, y: 34, scale: .92, rotateY: direction > 0 ? -10 : 9, rotateX: 3 }),
  center: { opacity: 1, x: 0, y: 0, scale: 1, rotateY: -4, rotateX: 2 },
  exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -90 : 110, y: -34, scale: .9, rotateY: direction > 0 ? 8 : -10, rotateX: 4 }),
}
