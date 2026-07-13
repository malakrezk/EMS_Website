// Sample project / case-study data. In production this would come from a CMS or API.
export const projectCategories = [
  { id: 'all', label: 'All' },
  { id: 'scada', label: 'SCADA' },
  { id: 'ems', label: 'EMS' },
  { id: 'substation-automation', label: 'Substation Automation' },
  { id: 'renewable-energy', label: 'Renewable Energy' },
  { id: 'oil-gas', label: 'Oil & Gas' },
  { id: 'utilities', label: 'Utilities' }
]

export const projects = [
  {
    id: 'national-grid-scada-upgrade',
    name: 'National Grid SCADA Modernization',
    country: 'United Arab Emirates',
    industry: 'Utilities',
    categories: ['scada', 'utilities'],
    services: ['SCADA Systems', 'Telecommunication Systems', 'Testing & Commissioning'],
    year: '2023',
    client: 'National Transmission Authority',
    duration: '14 months',
    accent: 'primary',
    description:
      'A full replacement of a legacy SCADA master station serving 180+ substations, delivered without a single unplanned outage during cutover.',
    challenge:
      'The client operated a 20-year-old SCADA system nearing end-of-life, with limited redundancy and no cybersecurity segmentation, putting grid visibility at risk during peak demand periods.',
    solution:
      'EMS delivered a fully redundant, IEC 61850-compliant SCADA master station with hardened network segmentation, phased migration of all 180 substations, and a new operator training simulator to ensure a seamless transition.',
    technologies: ['IEC 61850', 'DNP3', 'Redundant SCADA servers', 'Cybersecurity segmentation', 'Fiber optic backbone'],
    results: [
      { label: 'Substations migrated', value: '180+' },
      { label: 'Unplanned downtime', value: '0 hrs' },
      { label: 'Alarm response time', value: '-42%' },
      { label: 'Operator training completed', value: '100%' }
    ],
    gallery: 4
  },
  {
    id: 'coastal-wind-farm-ems',
    name: 'Coastal Wind Farm Energy Management',
    country: 'Morocco',
    industry: 'Renewable Energy',
    categories: ['ems', 'renewable-energy'],
    services: ['Energy Management Systems', 'Smart Grid Solutions'],
    year: '2022',
    client: 'Atlas Renewable Partners',
    duration: '9 months',
    accent: 'cyan',
    description:
      'An EMS deployment integrating a 240 MW offshore-adjacent wind portfolio into the national dispatch center with second-by-second forecasting.',
    challenge:
      'Intermittent generation from a growing wind portfolio was causing forecasting errors that led to costly balancing penalties and reduced grid stability.',
    solution:
      'We implemented a dedicated renewable EMS module combining short-term wind forecasting, curtailment management, and automated generation control tightly coupled with the national dispatch center.',
    technologies: ['Renewable forecasting engine', 'AGC integration', 'Curtailment management', 'Historian analytics'],
    results: [
      { label: 'Forecast accuracy', value: '+31%' },
      { label: 'Balancing penalties', value: '-58%' },
      { label: 'Portfolio capacity', value: '240 MW' },
      { label: 'Grid curtailment events', value: '-27%' }
    ],
    gallery: 4
  },
  {
    id: 'digital-substation-rollout',
    name: 'Digital Substation Rollout',
    country: 'Saudi Arabia',
    industry: 'Transmission & Distribution',
    categories: ['substation-automation'],
    services: ['Substation Automation', 'Protection & Control'],
    year: '2023',
    client: 'Regional Transmission Company',
    duration: '20 months',
    accent: 'primary',
    description:
      'Design and commissioning of 12 fully digital 132/33kV substations using process bus architecture to cut cabling and commissioning time.',
    challenge:
      'Conventional copper-wired substation designs were driving up construction time, cabling costs, and long-term maintenance complexity across a 12-site rollout.',
    solution:
      'EMS engineered a process-bus based digital substation standard, replacing thousands of meters of copper wiring with fiber and merging units, and delivered a repeatable design for rapid rollout across all 12 sites.',
    technologies: ['IEC 61850-9-2 Process Bus', 'Merging units', 'Non-conventional instrument transformers', 'Station HMI'],
    results: [
      { label: 'Sites commissioned', value: '12' },
      { label: 'Cabling reduction', value: '-65%' },
      { label: 'Commissioning time', value: '-38%' },
      { label: 'Panel footprint', value: '-45%' }
    ],
    gallery: 4
  },
  {
    id: 'refinery-power-management',
    name: 'Refinery Power Management System',
    country: 'Kuwait',
    industry: 'Oil & Gas',
    categories: ['oil-gas', 'ems'],
    services: ['Energy Management Systems', 'Protection & Control', 'Maintenance & Support'],
    year: '2021',
    client: 'Gulf Petrochemical Refinery',
    duration: '7 months',
    accent: 'cyan',
    description:
      'A load-shedding and power management system safeguarding a critical refinery process load against upstream grid disturbances.',
    challenge:
      'Grid disturbances upstream were tripping critical refinery loads, risking multi-day production shutdowns and significant safety exposure.',
    solution:
      'We deployed a fast, deterministic power management system with predictive load-shedding logic tuned specifically to the refinery\u2019s process criticality tiers, isolating non-essential loads within milliseconds of a disturbance.',
    technologies: ['Fast load shedding', 'Synchrophasor monitoring', 'Islanding detection', 'Redundant PLC control'],
    results: [
      { label: 'Load-shed response', value: '<100ms' },
      { label: 'Unplanned shutdowns', value: '-90%' },
      { label: 'Process uptime', value: '99.8%' },
      { label: 'Critical loads protected', value: '46' }
    ],
    gallery: 4
  },
  {
    id: 'municipal-water-scada',
    name: 'Municipal Water Network SCADA',
    country: 'Jordan',
    industry: 'Water & Infrastructure',
    categories: ['scada', 'utilities'],
    services: ['SCADA Systems', 'Telecommunication Systems'],
    year: '2020',
    client: 'City Water Authority',
    duration: '11 months',
    accent: 'primary',
    description:
      'A city-wide telemetry and SCADA network connecting 65 pumping stations and reservoirs to a unified control center.',
    challenge:
      'Pumping stations across the city were monitored manually with daily site visits, resulting in slow leak detection and inefficient energy use during peak tariff hours.',
    solution:
      'EMS built a wireless telemetry network linking every pumping station and reservoir to a central SCADA system, enabling remote control, automated leak alarms, and tariff-optimized pump scheduling.',
    technologies: ['Radio telemetry', 'RTU deployment', 'Leak detection alarms', 'Energy-optimized scheduling'],
    results: [
      { label: 'Sites connected', value: '65' },
      { label: 'Energy cost savings', value: '-19%' },
      { label: 'Leak detection time', value: '-70%' },
      { label: 'Site visits reduced', value: '-80%' }
    ],
    gallery: 4
  },
  {
    id: 'industrial-park-automation',
    name: 'Industrial Park Automation Backbone',
    country: 'Egypt',
    industry: 'Industrial Plants',
    categories: ['substation-automation', 'utilities'],
    services: ['Substation Automation', 'Smart Grid Solutions', 'Testing & Commissioning'],
    year: '2022',
    client: 'New Capital Industrial Zone',
    duration: '16 months',
    accent: 'cyan',
    description:
      'A shared automation backbone powering 8 substations across a new industrial park, built for phased tenant growth.',
    challenge:
      'A newly developed industrial park needed a power backbone that could scale with tenant onboarding over a 10-year horizon without repeated forklift upgrades.',
    solution:
      'We designed a modular substation automation standard with spare capacity and open protocols, allowing new tenant substations to be added to the network with minimal engineering rework.',
    technologies: ['Modular IED platform', 'IEC 61850 GOOSE', 'Scalable SCADA architecture', 'Redundant ring network'],
    results: [
      { label: 'Substations energized', value: '8' },
      { label: 'Tenant onboarding time', value: '-55%' },
      { label: 'Design reuse rate', value: '90%' },
      { label: 'Network availability', value: '99.95%' }
    ],
    gallery: 4
  }
]

export function getProjectById(id) {
  return projects.find((p) => p.id === id)
}

export function getRelatedProjects(project, count = 3) {
  return projects
    .filter((p) => p.id !== project.id && p.categories.some((c) => project.categories.includes(c)))
    .slice(0, count)
    .concat(projects.filter((p) => p.id !== project.id))
    .filter((p, index, arr) => arr.findIndex((x) => x.id === p.id) === index)
    .slice(0, count)
}
