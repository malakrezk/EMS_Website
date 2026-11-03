import type { IconType } from 'react-icons'
import {
  HiOutlineAdjustmentsHorizontal, HiOutlineBuildingOffice2,
  HiOutlineCubeTransparent, HiOutlineSparkles, HiOutlineWrenchScrewdriver,
} from 'react-icons/hi2'
import { images } from '../../constants/images'

export const hero = {
  title: 'IoT Solutions for Smart Buildings and Infrastructure',
  subtitle: 'Connecting Assets, Systems and Operational Data',
  lead: 'Engineering Management Systems (EMS) develops integrated technology solutions that connect physical assets, sensors, control systems and operational platforms through the Internet of Things (IoT).',
}

/** Points on the hero photograph, in percent of the image, that the connection lines start from. */
export const heroNodes = [
  { id: 'assets', label: 'Physical assets', x: 48.7, y: 50.5 },
  { id: 'sensors', label: 'Sensors', x: 62.5, y: 59.8 },
  { id: 'control', label: 'Control systems', x: 75.3, y: 37.3 },
]
export const heroPlatform = { label: 'Operational platforms', x: 80, y: 24 }

export const intro = {
  statement: 'Our approach helps organizations improve visibility across buildings, infrastructure and industrial operations by making relevant operational data more accessible, structured and useful for decision-making.',
  regions: ['Egypt', 'Saudi Arabia', 'Oman'],
}

export interface IoTService {
  id: string
  title: string
  text: string
  image: string
  alt: string
  source: string
  focus?: string
}

export const services: IoTService[] = [
  { id: 'industrial', title: 'Industrial IoT Integration', text: 'Connect compatible equipment, sensors, controllers and industrial systems to collect and exchange operational data across facilities and infrastructure assets.', image: images.iotFactoryDashboard, alt: 'Abdul Latif Jameel industrial site dashboard with electrical, fire fighting and site overview panels', source: 'Abdul Latif Jameel' },
  { id: 'building', title: 'Smart Building IoT', text: 'Integrate suitable connected devices and building systems to support monitoring of environmental conditions, equipment status, energy consumption and facility operations.', image: images.bmsExpertiseZia, alt: 'Zia building dashboard with energy, chiller, air handling and security panels', source: 'Zia' },
  { id: 'water', title: 'Water and Wastewater IoT', text: 'Connect available instrumentation and monitoring systems at pumping stations and water infrastructure facilities to improve operational visibility and support centralized monitoring.', image: images.iotInvestorsDashboard, alt: 'Investors-Ext sewage lifting station dashboard with pumps, flow, pressure and sump levels', source: 'Investors-Ext station' },
  { id: 'remote', title: 'Remote Asset Monitoring', text: 'Enable authorized operational teams to access relevant asset status, measurements and alerts through suitable connected monitoring architectures.', image: images.parkLaneMobileApp, alt: 'Park Lane mobile app giving residents and operators access to building services', source: 'Park Lane app', focus: '50% 40%' },
  { id: 'platforms', title: 'IoT Data Platforms and Dashboards', text: 'Organize data from compatible devices and systems into dashboards and reporting environments that help users understand operational conditions and trends.', image: images.iotDashboardsWall, alt: 'EMS operations room with the Station 5 dashboard on the wall display', source: 'EMS operations room', focus: '62% 45%' },
  { id: 'bms-scada', title: 'IoT Integration with BMS and SCADA', text: 'Integrate IoT data with Building Management Systems (BMS), Supervisory Control and Data Acquisition (SCADA) and other operational platforms where interfaces and system architecture permit.', image: images.iotSuezGeneratorsDashboard, alt: 'Suez Medical Complex dashboard combining generator, electrical and building system data', source: 'Suez Medical Complex' },
]

export const industries = [
  { id: 'buildings', title: 'Smart Buildings and Real Estate', text: 'Connect building systems and sensors to improve operational visibility, facility monitoring and energy management.', to: '/industries/commercial-buildings', image: images.bmsExpertiseCn05, focus: '50% 45%' },
  { id: 'water', title: 'Water and Wastewater Infrastructure', text: 'Collect operational information from distributed stations and compatible field devices to support monitoring and coordinated operations.', to: '/industries/water-systems', image: images.iotHeroWater, focus: '65% 60%' },
  { id: 'industrial', title: 'Industrial Facilities', text: 'Connect relevant production and utility assets to improve data availability and support operational analysis.', to: '/industries/industrial', image: images.iotIndustrial, focus: '50% 50%' },
  { id: 'cities', title: 'Smart Cities and Infrastructure', text: 'Bring data from distributed assets into coordinated monitoring environments that support informed infrastructure management.', to: '/industries/smart-cities', image: images.bmsExpertiseParkLane, focus: '50% 50%' },
  { id: 'data-centers', title: 'Data Centers and Critical Facilities', text: 'Integrate suitable environmental, equipment and operational monitoring data to support facility visibility and operational response.', to: '/industries/data-centers', image: images.dataCenterControlRoom, focus: '55% 50%' },
]

export interface Integration {
  id: string
  name: string
  purpose: string
  icon: IconType
  /** Position of the node around the hub, in percent of the diagram. */
  x: number
  y: number
}

export const integrations = {
  title: 'From IoT Connectivity to Intelligent Operations',
  lead: 'IoT becomes more valuable when connected data is integrated into a wider operational architecture.',
  intro: 'Depending on the project, EMS can evaluate integration with:',
  items: [
    { id: 'bms', name: 'BMS', purpose: 'for building monitoring and control', icon: HiOutlineBuildingOffice2, x: 50, y: 10 },
    { id: 'scada', name: 'SCADA', purpose: 'for infrastructure and industrial supervision', icon: HiOutlineAdjustmentsHorizontal, x: 90, y: 36 },
    { id: 'ai', name: 'AI analytics', purpose: 'for anomaly detection and operational insights', icon: HiOutlineSparkles, x: 76, y: 88 },
    { id: 'twin', name: 'Digital Twin platforms', purpose: 'for visualization of physical assets and systems', icon: HiOutlineCubeTransparent, x: 24, y: 88 },
    { id: 'enterprise', name: 'Maintenance and enterprise applications', purpose: 'for asset and work-order information', icon: HiOutlineWrenchScrewdriver, x: 10, y: 36 },
  ] satisfies Integration[],
  note: 'The availability of these capabilities depends on data quality, device compatibility, communication protocols, cybersecurity requirements and the agreed scope of integration.',
}

export const approach = [
  { title: 'Assessment and Requirements Definition', text: 'Identify the assets, information requirements, existing systems and operational objectives.' },
  { title: 'IoT Architecture Design', text: 'Define an appropriate connectivity and data architecture based on project needs, interfaces and security requirements.' },
  { title: 'System Integration', text: 'Integrate selected devices, sensors, controllers and platforms according to the approved design and scope.' },
  { title: 'Data Visualization and Operational Use', text: 'Configure appropriate dashboards, alerts and reporting functions to make operational information accessible to authorized users.' },
  { title: 'Integration with Digital Transformation Platforms', text: 'Evaluate opportunities to connect IoT data with BMS, SCADA, AI and Digital Twin environments.' },
]

export const why = [
  'EMS combines expertise across building technologies, automation, infrastructure monitoring and digital transformation.',
  'Our integrated engineering approach helps project owners and operators evaluate how connected data can support more informed and coordinated facility operations.',
]

export const contact = {
  title: 'Discuss Your IoT Project with EMS',
  question: 'Planning an IoT integration project for a smart building, water infrastructure facility or industrial operation?',
  text: 'Contact EMS to discuss your requirements, existing systems and opportunities to develop a connected operational environment.',
  cta: 'Request an IoT project consultation',
}
