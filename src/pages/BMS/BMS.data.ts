import {
  HiOutlineBuildingOffice2, HiOutlineAdjustmentsHorizontal, HiOutlineBolt,
  HiOutlineLightBulb, HiOutlineCpuChip, HiOutlineCubeTransparent,
  HiOutlineSignal, HiOutlineChartBarSquare, HiOutlineSparkles,
  HiOutlineShieldCheck, HiOutlineBuildingStorefront, HiOutlineHeart,
  HiOutlineHomeModern, HiOutlineServerStack,
} from 'react-icons/hi2'
import { images } from '../../constants/images'

export const bmsSystems = [
  { name: 'HVAC', icon: HiOutlineAdjustmentsHorizontal, label: 'Comfort & climate' },
  { name: 'Energy', icon: HiOutlineBolt, label: 'Power & metering' },
  { name: 'Lighting', icon: HiOutlineLightBulb, label: 'Coordinated control' },
  { name: 'Security', icon: HiOutlineShieldCheck, label: 'Connected oversight' },
]

/**
 * Each capability is shown with the real EMS screen that best illustrates it.
 * layout picks the card composition; focus is the image's object-position, framing the relevant panel.
 */
export const bmsServices = [
  { id: 'integration', layout: 'feature', title: 'BMS System Integration', icon: HiOutlineBuildingOffice2, description: 'Integrate compatible building systems into a centralized platform for monitoring, control, and operational visibility.', scope: 'Integration planning, interface coordination, and a unified operating environment aligned with the building’s requirements.', image: images.bmsExpertiseCn05, alt: 'CN-05 Tower dashboard bringing energy, water, chillers, security, lighting and elevators into one screen', focus: '50% 40%', source: 'CN-05 Tower' },
  { id: 'hvac', layout: 'split', title: 'HVAC Monitoring & Control', icon: HiOutlineAdjustmentsHorizontal, description: 'Monitor and control heating, ventilation, and air-conditioning systems to support occupant comfort and efficient building operation.', scope: 'Control strategies, equipment visibility, operating schedules, and alarm coordination for compatible HVAC infrastructure.', image: images.bmsExpertiseZia, alt: 'Zia building dashboard with the electromechanical panel showing air handling unit status and supply and return readings', focus: '96% 20%', source: 'Zia' },
  { id: 'energy', layout: 'split', title: 'Energy & Power Monitoring', icon: HiOutlineBolt, description: 'Connect available metering and monitoring systems to understand energy consumption and identify opportunities for operational improvement.', scope: 'Meter integration, consumption reporting, and operational trends based on the data and interfaces available on site.', image: images.iotSuezGeneratorsDashboard, alt: 'Suez Medical Complex generator panel showing operating hours, fuel, voltage, current and energy', focus: '16% 45%', source: 'Suez Medical Complex' },
  { id: 'lighting', layout: 'stacked', title: 'Lighting & Building Integration', icon: HiOutlineLightBulb, description: 'Coordinate compatible lighting, electrical monitoring, alarms, and building services through an integrated automation architecture.', scope: 'Coordinated schedules, system interfaces, and building service visibility within the agreed integration scope.', image: images.bmsExpertiseParkLane, alt: 'Park Lane development at night with lit buildings and streets, monitored from the EMS dashboard', focus: '52% 55%', source: 'Park Lane' },
  { id: 'siemens', layout: 'feature', title: 'Siemens Automation Solutions', icon: HiOutlineCpuChip, description: 'Provide engineering and integration services involving Siemens technologies, according to project requirements and verified partner scope.', scope: 'Technology selection and engineering coordination according to the required platform, supported interfaces, and verified service scope.', image: images.iotControlRoom, alt: 'EMS operations room with Siemens-based station dashboards on the wall display and operator workstations', focus: '62% 38%', source: 'EMS operations room' },
  { id: 'modernization', layout: 'band', title: 'BMS Modernization & Digital Transformation', icon: HiOutlineCubeTransparent, description: 'Assess and develop existing building automation systems while exploring opportunities for operational analytics, IoT connectivity, and Digital Twin integration.', scope: 'Existing-system assessment, interface review, and a phased modernization approach tailored to the facility.', image: images.serviceDigitalTwinDashboard, alt: 'Digital twin of Station 5 shown as a 3D model on the EMS operations dashboard', focus: '58% 50%', source: 'Station 5 digital twin' },
] as const

export const bmsIndustries = [
  { title: 'Commercial Towers & Office Buildings', label: 'Workplaces', icon: HiOutlineBuildingOffice2, image: images.sectorTowersCn05, to: '/industries/commercial-buildings', alt: 'Modern commercial towers and connected office infrastructure' },
  { title: 'Shopping Malls & Mixed-Use Developments', label: 'Retail & mixed use', icon: HiOutlineBuildingStorefront, image: images.industryMallsDashboard, to: '/industries/commercial-buildings', alt: 'Mixed-use development and integrated facility systems' },
  { title: 'Hospitals & Healthcare Facilities', label: 'Healthcare', icon: HiOutlineHeart, image: images.suezMedicalGenerators, to: '/industries/hospitals', alt: 'Suez Medical Complex generator dashboard showing fuel tanks, voltage, current and energy load' },
  { title: 'Hotels & Hospitality', label: 'Hospitality', icon: HiOutlineBuildingStorefront, image: images.bmsHospitalityDashboard, to: '/industries/hotels', alt: 'Hospitality development with a live operations dashboard showing energy costs and carbon footprint' },
  { title: 'Residential Compounds & Smart Communities', label: 'Residential', icon: HiOutlineHomeModern, image: images.sectorCompoundsParkLane, to: '/industries/residential', alt: 'Residential compound with coordinated building infrastructure' },
  { title: 'Data Centers & Technical Facilities', label: 'Critical infrastructure', icon: HiOutlineServerStack, image: images.dataCenter1, to: '/industries/data-centers', alt: 'Data center infrastructure and engineering monitoring environment' },
]

export const bmsTechnologies = [
  { id: 'bms', title: 'BMS', icon: HiOutlineBuildingOffice2, text: 'Centralized building monitoring and control.', detail: 'A coordinated operational view of compatible building systems.' },
  { id: 'scada', title: 'SCADA', icon: HiOutlineChartBarSquare, text: 'Supervisory monitoring and control of compatible industrial and infrastructure systems.', detail: 'Extend visibility across compatible infrastructure and process environments.' },
  { id: 'iot', title: 'IoT', icon: HiOutlineSignal, text: 'Connected devices, sensors, and operational data acquisition.', detail: 'Connect available field information with the wider operational environment.' },
  { id: 'ai', title: 'AI Analytics', icon: HiOutlineSparkles, text: 'Data analysis to support insights, performance evaluation, and informed decisions.', detail: 'Evaluate operational patterns when suitable, structured data is available.' },
  { id: 'twin', title: 'Digital Twin', icon: HiOutlineCubeTransparent, text: 'Digital representations and simulation capabilities based on available system data and project requirements.', detail: 'Explore contextual digital views and simulation opportunities for the facility.' },
]

export const bmsAdvantages = [
  { title: 'Integrated Engineering Approach', text: 'Coordinated engineering solutions across building technologies.' },
  { title: 'Building Automation Experience', text: 'Experience involving automation and infrastructure control systems.' },
  { title: 'Connected Technology Capabilities', text: 'Engineering solutions involving BMS, SCADA, IoT, AI analytics, and Digital Twin technologies.' },
  { title: 'Project-Oriented Integration', text: 'Solutions developed according to project requirements, system compatibility, and integration objectives.' },
  { title: 'Regional Project Support', text: 'Support for projects across Egypt and selected Middle Eastern markets.' },
]
