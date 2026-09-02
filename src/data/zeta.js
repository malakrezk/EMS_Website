import {
  HiOutlineBuildingOffice2, HiOutlineChartBarSquare, HiOutlineCloud,
  HiOutlineCpuChip, HiOutlineCubeTransparent, HiOutlineSignal,
  HiOutlineSparkles, HiOutlineWrenchScrewdriver,
} from 'react-icons/hi2'

export const platformLayers = [
  { id: 'building-management', title: 'Building Management Systems', label: 'BMS', icon: HiOutlineBuildingOffice2, summary: 'One operational view for the electromechanical systems that keep a facility running.', description: 'ZETA supervises power, lighting, elevators, ventilation, air conditioning, water, fire protection, security, waste systems and EV charging from a unified environment.', capabilities: ['HVAC & ventilation', 'Power & lighting', 'Water & fire systems', 'Security & vertical transport'] },
  { id: 'scada', title: 'SCADA & Infrastructure Control', label: 'SCADA', icon: HiOutlineChartBarSquare, summary: 'Live control and visibility for distributed electromechanical infrastructure.', description: 'Monitor electricity rooms, water and sewage networks, irrigation, firefighting and facility services through connected supervisory control.', capabilities: ['Electricity rooms', 'Water & sewage networks', 'Irrigation control', 'Facility services'] },
  { id: 'iot', title: 'Internet of Things', label: 'IoT', icon: HiOutlineSignal, summary: 'Connected devices turn physical operations into visible, usable data.', description: 'ZETA supports device management, data collection, processing and visualization across connected networks with minimal human intervention.', capabilities: ['Device management', 'Data collection', 'Data processing', 'Live visualization'] },
  { id: 'artificial-intelligence', title: 'Artificial Intelligence', label: 'AI', icon: HiOutlineSparkles, summary: 'Operational intelligence derived from connected facility data.', description: 'AI analyzes IoT information to support facility management decisions, reduce energy use, control cost and improve productivity.', capabilities: ['Facility analytics', 'Energy insight', 'Cost optimization', 'Productivity support'] },
  { id: 'digital-twin', title: 'Digital Twin', label: '3D operations', icon: HiOutlineCubeTransparent, summary: 'A navigable 3D environment connected to real equipment and live operations.', description: 'The platform links a digital world to physical devices so teams can understand systems remotely, simulate conditions and improve operations and maintenance.', capabilities: ['Live 3D context', 'Remote understanding', 'Operational simulation', 'Maintenance support'] },
  { id: 'robotics-iot', title: 'Robotics & IoT', label: 'Automation', icon: HiOutlineCpuChip, summary: 'Routine facility tasks automated through connected robotic systems.', description: 'Robotics can support repeatable work including cleaning, building inspection and the movement of items within managed facilities.', capabilities: ['Automated cleaning', 'Building inspection', 'Internal transport', 'Connected workflows'] },
]

export const benefits = [
  ['Energy efficiency', 'Coordinate systems and use operational data to improve how energy is consumed.'],
  ['Energy savings', 'Expose avoidable demand and support better control strategies.'],
  ['Building value', 'Create connected assets that are easier to understand and operate.'],
  ['Facility cost control', 'Centralize information and reduce fragmented operational effort.'],
  ['Sustainability', 'Make resource performance visible and continuously improvable.'],
  ['Maintenance efficiency', 'Give teams clearer system context for faster, better-informed action.'],
]

export const sectors = ['Towers', 'Hospitals', 'Factories', 'Warehouses', 'Schools', 'Malls', 'Oil facilities', 'Water plants', 'Electrical plants']
export const deploymentModels = [
  { icon: HiOutlineCloud, title: 'Public cloud', text: 'Connected access through a scalable cloud environment.' },
  { icon: HiOutlineCpuChip, title: 'Private cloud', text: 'A dedicated deployment aligned with operational requirements.' },
  { icon: HiOutlineWrenchScrewdriver, title: 'Integrated platform', text: 'BMS, SCADA, IoT and AI brought together through ZETA.' },
]
export const regionalMarkets = ['Egypt', 'Kuwait', 'United Arab Emirates', 'Saudi Arabia']
export const technologyPartners = ['Siemens', 'Cisco', 'Python', 'Visual Studio', 'AWS', 'Oracle']
