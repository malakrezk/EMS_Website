import {
  HiOutlineClipboardDocumentCheck, HiOutlineCog6Tooth, HiOutlineBolt,
  HiOutlineSignal, HiOutlineCpuChip, HiOutlineBuildingOffice2,
  HiOutlineShieldCheck, HiOutlineSun,
} from 'react-icons/hi2'

export const services = [
  {
    id: 'project-management', icon: HiOutlineClipboardDocumentCheck, title: 'Project Management',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=85',
    short: 'One accountable team guiding complex engineering projects from vision to handover.',
    description: 'EMS integrates planning, technical coordination, procurement, quality, cost, and site delivery into one transparent project framework—giving stakeholders confidence at every milestone.',
    capabilities: ['Design Management', 'Planning & Cost Control', 'Site Supervision', 'Quality & Handover']
  },
  {
    id: 'mechanical', icon: HiOutlineCog6Tooth, title: 'Mechanical Systems',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1800&q=85',
    short: 'High-performance HVAC, plumbing, and mechanical infrastructure engineered for efficiency.',
    description: 'We design and deliver coordinated mechanical systems that optimize comfort, energy performance, maintainability, and lifecycle value across demanding facilities.',
    capabilities: ['HVAC Systems', 'Chilled Water Networks', 'Plumbing & Drainage', 'Mechanical Rooms']
  },
  {
    id: 'electrical', icon: HiOutlineBolt, title: 'Electrical Systems',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1800&q=85',
    short: 'Safe, resilient power distribution for buildings, industry, and critical infrastructure.',
    description: 'From medium-voltage networks to final distribution, EMS engineers electrical systems for selectivity, reliability, safety, and intelligent energy use.',
    capabilities: ['MV & LV Distribution', 'Switchgear & Panels', 'Backup Power', 'Power Quality Studies']
  },
  {
    id: 'light-current', icon: HiOutlineSignal, title: 'Light Current Systems',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1800&q=85',
    short: 'Connected security, communication, and life-safety infrastructure for modern facilities.',
    description: 'We unify structured cabling, CCTV, access control, public address, and communication platforms into secure, scalable low-current ecosystems.',
    capabilities: ['CCTV & Analytics', 'Access Control', 'Structured Cabling', 'Public Address Systems']
  },
  {
    id: 'control-systems', icon: HiOutlineCpuChip, title: 'Control Systems',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1800&q=85',
    short: 'Intelligent automation connecting field assets, processes, operators, and enterprise data.',
    description: 'EMS delivers robust PLC, SCADA, RTU, and industrial automation architectures that make complex processes visible, controllable, and continuously optimizable.',
    capabilities: ['PLC Automation', 'SCADA Systems', 'RTU Integration', 'Process Control']
  },
  {
    id: 'building-management', icon: HiOutlineBuildingOffice2, title: 'Building Management Systems',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85',
    short: 'A unified digital layer for smarter, healthier, and more efficient buildings.',
    description: 'Our BMS solutions connect HVAC, power, lighting, metering, and alarms through intuitive operator experiences and actionable performance analytics.',
    capabilities: ['BMS Integration', 'Energy Dashboards', 'Smart Metering', 'IoT & Analytics']
  },
  {
    id: 'fire-fighting', icon: HiOutlineShieldCheck, title: 'Fire Fighting Systems',
    image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1800&q=85',
    short: 'Code-compliant fire protection engineered to safeguard people, assets, and continuity.',
    description: 'We engineer, install, test, and commission complete fire protection networks with rigorous hydraulic performance and dependable emergency operation.',
    capabilities: ['Fire Pump Rooms', 'Sprinkler Networks', 'Hydrant Systems', 'Testing & Commissioning']
  },
  {
    id: 'solar-energy', icon: HiOutlineSun, title: 'Solar Energy Systems',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1800&q=85',
    short: 'Bankable photovoltaic solutions turning clean energy into measurable business value.',
    description: 'EMS delivers grid-connected and hybrid solar systems from feasibility and simulation through installation, monitoring, and long-term performance support.',
    capabilities: ['PV System Design', 'Grid Integration', 'Energy Storage', 'Performance Monitoring']
  }
]
