export const projectCategories = [
  { id: 'all', label: 'All' },
  { id: 'water', label: 'Water Infrastructure' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'commercial', label: 'Commercial Buildings' },
  { id: 'industrial', label: 'Industrial Automation' },
  { id: 'residential', label: 'Residential Development' },
]

export const projects = [
  {
    id: 'zia-building-complex', name: 'ZIA Building Complex', location: 'New Administrative Capital, Egypt', industry: 'Smart Buildings', categories: ['commercial'], accent: 'cyan',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=84',
    videoSrc: '/zia-smart-building-dashboard.mp4',
    description: 'ZIA smart building dashboard — real-time IoT platform with EMS × Siemens integration for live monitoring and automation across the complex.',
    challenge: 'A large administrative complex required one clear operational view across connected building systems and live facility data.',
    solution: 'EMS connected the ZIA platform with Siemens building technology to deliver real-time dashboards, monitoring and coordinated automation.',
    services: ['ZIA Platform', 'EMS × Siemens', 'BMS', 'IoT'],
    technologies: ['Smart building dashboard', 'Siemens integration', 'Live monitoring', 'Building automation'],
    highlights: ['ZIA Platform', 'EMS × Siemens'],
    results: [
      { value: 'Live', label: 'Building monitoring' }, { value: 'Integrated', label: 'EMS × Siemens controls' },
      { value: 'One', label: 'ZIA operating platform' }, { value: 'Smart', label: 'Complex automation' },
    ], gallery: 4,
  },
  {
    id: 'water-treatment-plant-automation', name: 'Water Treatment Plant Automation', location: 'Cairo, Egypt', industry: 'Water Infrastructure', categories: ['water'], accent: 'cyan',
    image: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=1800&q=84',
    videoSrc: '/smart-water-station-dashboard.mp4',
    description: 'Complete IoT integration with AI-powered predictive maintenance, reducing downtime by 60%.',
    challenge: 'Distributed water-treatment equipment required better visibility, earlier fault detection and more efficient maintenance planning.',
    solution: 'EMS integrated plant sensors, IoT monitoring and predictive analytics into a coordinated automation environment.',
    services: ['IoT Integration', 'Predictive Maintenance', 'SCADA', 'Plant Automation'],
    technologies: ['200+ IoT sensors', 'AI maintenance analytics', 'Process monitoring', 'SCADA supervision'],
    highlights: ['IoT Sensors: 200+', 'Efficiency Gain: 35%'],
    results: [
      { value: '200+', label: 'IoT sensors' }, { value: '35%', label: 'Efficiency gain' },
      { value: '60%', label: 'Downtime reduction' }, { value: 'AI', label: 'Predictive maintenance' },
    ], gallery: 4,
  },
  {
    id: 'smart-hospital', name: 'Smart Hospital', location: 'Dubai, UAE', industry: 'Healthcare', categories: ['healthcare'], accent: 'primary',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1800&q=84',
    videoSrc: '/smart-hospital-monitoring.mp4',
    description: 'Integrated building management for a 500-bed hospital with real-time monitoring dashboards.',
    challenge: 'A major healthcare environment needed coordinated oversight across thousands of critical building and facility systems.',
    solution: 'EMS delivered an integrated building-management layer with real-time dashboards, energy insight and centralized monitoring.',
    services: ['BMS', 'Energy Management', 'Healthcare Automation', 'Facility Dashboards'],
    technologies: ['5,000+ monitored systems', 'Real-time dashboards', 'Energy analytics', 'Integrated BMS'],
    highlights: ['Monitored Systems: 5000+', 'Energy Saved: 40%'],
    results: [
      { value: '5000+', label: 'Monitored systems' }, { value: '40%', label: 'Energy saved' },
      { value: '500', label: 'Hospital beds' }, { value: 'Live', label: 'Monitoring dashboards' },
    ], gallery: 4,
  },
  {
    id: 'industrial-scada-system', name: 'Industrial SCADA System', location: 'Giza, Egypt', industry: 'Industrial Automation', categories: ['industrial'], accent: 'cyan',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1800&q=84',
    videoSrc: '/industrial-scada-monitoring.mp4',
    description: 'Advanced PLC & SCADA implementation for a manufacturing facility with process optimization.',
    challenge: 'Production teams needed reliable supervision and control across multiple manufacturing lines and industrial processes.',
    solution: 'EMS implemented PLC control, SCADA visualization and process optimization for dependable high-availability operations.',
    services: ['SCADA', 'PLC Engineering', 'Process Optimization', 'Industrial Controls'],
    technologies: ['PLC automation', 'SCADA dashboards', 'Production monitoring', 'Process controls'],
    highlights: ['Production Lines: 12', 'Uptime: 99.9%'],
    results: [
      { value: '12', label: 'Production lines' }, { value: '99.9%', label: 'System uptime' },
      { value: 'Live', label: 'Process visibility' }, { value: 'PLC', label: 'Integrated control' },
    ], gallery: 4,
  },
  {
    id: 'al-attal-new-cairo', name: 'Al Attal New Cairo', location: 'New Cairo, Egypt', industry: 'Residential Development', categories: ['residential'], accent: 'primary',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1800&q=84',
    videoSrc: '/al-attal-new-capital.mp4',
    description: 'Full MEP contracting and smart automation solutions for a premium residential development in New Cairo.',
    challenge: 'The development required coordinated MEP delivery and modern automation designed around premium residential performance.',
    solution: 'EMS combined multidisciplinary MEP contracting with integrated smart controls and building automation.',
    services: ['MEP Contracting', 'Smart Automation', 'Electrical Systems', 'Mechanical Systems'],
    technologies: ['MEP coordination', 'Smart controls', 'Building automation', 'Integrated commissioning'],
    highlights: ['MEP Contracting', 'Smart Automation'],
    results: [
      { value: 'Full', label: 'MEP scope' }, { value: 'Smart', label: 'Automation layer' },
      { value: 'One', label: 'Coordinated delivery' }, { value: 'Premium', label: 'Residential systems' },
    ], gallery: 4,
  },
  {
    id: 'wadi-zaha-project', name: 'Wadi Zaha Project', location: 'Egypt', industry: 'Mixed-use Development', categories: ['commercial'], accent: 'cyan',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=84',
    videoSrc: '/wadi-zaha-smart-residential.mp4',
    description: 'Comprehensive MEP and automation systems delivered for the Wadi Zaha development project.',
    challenge: 'The project needed coordinated building services and automation delivered as one dependable engineering scope.',
    solution: 'EMS delivered integrated MEP systems, automation and coordinated commissioning across the development.',
    services: ['MEP Systems', 'EMS Automation', 'Project Coordination', 'Commissioning'],
    technologies: ['Mechanical systems', 'Electrical systems', 'Automation controls', 'Integrated testing'],
    highlights: ['MEP Systems', 'EMS Automation'],
    results: [
      { value: 'MEP', label: 'Integrated systems' }, { value: 'EMS', label: 'Automation delivery' },
      { value: 'One', label: 'Coordinated scope' }, { value: 'Full', label: 'Commissioning support' },
    ], gallery: 4,
  },
]

export const getProjectById = id => projects.find(project => project.id === id)
export const getRelatedProjects = (project, count = 2) => projects.filter(item => item.id !== project.id).slice(0, count)
