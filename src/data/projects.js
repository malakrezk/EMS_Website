export const projectCategories = [
  { id: 'all', label: 'All' },
  { id: 'water', label: 'Water Infrastructure' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'commercial', label: 'Commercial Buildings' },
]

export const projects = [
  {
    id: 'water-treatment-plant', name: 'Water Treatment Plant', industry: 'Water Infrastructure', categories: ['water'], accent: 'cyan',
    image: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=1600&q=82',
    description: 'A connected operational environment for visualizing treatment assets, plant processes and infrastructure status.',
    challenge: 'Water infrastructure combines distributed equipment, process stages and electrical systems that must be understood as one operating environment.',
    solution: 'ZETA brings the facility into a visual control layer with plant dashboards, process supervision, equipment context and a navigable digital representation.',
    services: ['SCADA', 'Digital Twin', 'IoT Visualization', 'Electrical Monitoring'],
    technologies: ['SCADA supervision', '3D operational model', 'Equipment dashboards', 'Process visualization'],
    results: [
      { value: 'Unified', label: 'Plant operations view' }, { value: 'Live', label: 'Process visibility' },
      { value: '3D', label: 'Facility context' }, { value: 'Connected', label: 'Equipment information' },
    ], gallery: 4,
  },
  {
    id: 'smart-hospital-healthcare', name: 'Smart Hospital & Healthcare', industry: 'Healthcare', categories: ['healthcare'], accent: 'primary',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1600&q=82',
    description: 'A hospital operations layer connecting building information, performance dashboards and spatial context.',
    challenge: 'Healthcare facilities depend on multiple building systems and spaces that need clear, coordinated operational oversight.',
    solution: 'ZETA combines dashboards, visual models and connected facility data to help teams understand hospital operations from a unified interface.',
    services: ['BMS', 'Digital Twin', 'IoT', 'Facility Analytics'],
    technologies: ['Building management', '3D facility model', 'Operational dashboards', 'Connected data'],
    results: [
      { value: 'Unified', label: 'Building systems view' }, { value: 'Visual', label: 'Facility navigation' },
      { value: 'Live', label: 'Operational dashboards' }, { value: 'Connected', label: 'Data context' },
    ], gallery: 4,
  },
  {
    id: 'commercial-building', name: 'Commercial Building', industry: 'Commercial Real Estate', categories: ['commercial'], accent: 'cyan',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=82',
    description: 'A digital building environment for viewing spaces, systems and control-room information together.',
    challenge: 'Commercial buildings contain many interdependent electromechanical systems that are difficult to manage through fragmented interfaces.',
    solution: 'ZETA organizes building information into connected dashboards and 3D operational views, creating clearer context for facility teams.',
    services: ['BMS', 'Digital Twin', 'AI Analytics', 'IoT'],
    technologies: ['BMS integration', '3D room models', 'Control dashboards', 'Facility data visualization'],
    results: [
      { value: 'One', label: 'Operational environment' }, { value: '3D', label: 'Spatial understanding' },
      { value: 'Clear', label: 'System visibility' }, { value: 'Digital', label: 'Facility workflow' },
    ], gallery: 4,
  },
]

export const getProjectById = id => projects.find(project => project.id === id)
export const getRelatedProjects = (project, count = 2) => projects.filter(item => item.id !== project.id).slice(0, count)
