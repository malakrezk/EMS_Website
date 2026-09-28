import type { IconType } from 'react-icons'
import {
  HiOutlineCheckBadge, HiOutlineClock,
  HiOutlineShieldCheck, HiOutlineUserGroup
} from 'react-icons/hi2'

export const technologies = ['BMS', 'SCADA', 'IoT', 'Artificial Intelligence', 'Digital Twin', 'Modbus', 'OPC UA', 'BACnet']

export const process = ['Consultation', 'System Design', 'Engineering', 'Installation', 'Commissioning', 'Lifecycle Support']

export const industries = ['Oil & Gas', 'Commercial Buildings', 'Hospitals', 'Factories', 'Airports', 'Utilities', 'Water Treatment', 'Data Centers']

export const gallery = [
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
]

export const proof: [IconType, string, string][] = [
  [HiOutlineUserGroup, 'Specialist Engineers', 'Multidisciplinary teams with deep field and control-room experience.'],
  [HiOutlineCheckBadge, 'Certified Delivery', 'Quality-controlled engineering aligned with international standards.'],
  [HiOutlineClock, 'Lifecycle Support', 'Technical assistance structured around the system lifecycle.'],
  [HiOutlineShieldCheck, 'Built for Reliability', 'Secure, resilient architectures designed for critical operations.'],
]

export const reveal = { hidden: { opacity: 0, y: 28 }, show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: .65, delay: i * .08, ease: [0.22, 1, 0.36, 1] } }) }

export const projectByService: Record<string, string> = {
  'building-management': 'zia-building-complex',
  scada: 'industrial-scada-system',
  iot: 'water-treatment-plant-automation',
  'artificial-intelligence': 'water-treatment-plant-automation',
  'digital-twin': 'data-center-operations',
  'robotics-iot': 'industrial-scada-system',
}

export const overviewStats: [string, string][] = [['Unified', 'Visibility'], ['Live', 'System data'], ['Connected', 'Operations']]
