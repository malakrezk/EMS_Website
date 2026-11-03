import { images } from '../../constants/images'
import { transitions } from '../../theme/transitions'
import { projects } from '../../data/projects'
import type { Project } from '../../types/content.types'
import { sectors } from '../Solutions/Solutions.data'

export const ease = transitions.reveal

export const featuredProjects = projects.filter(project =>
	['data-center-operations', 'zia-building-complex'].includes(project.id),
)

// Hero carousel projects, left to right; the dashboards follow them.
const heroProjects =['zia-building-complex', 'industrial-scada-system', 'data-center-operations']
	.map(id => projects.find(project => project.id === id))
	.filter(project => project !== undefined)

export const projectCardImages: Partial<Record<string, string>> = {
	'data-center-operations': images.dataCenterControlRoom,
	'zia-building-complex': images.ziaSmartBuildingPoster,
	'water-treatment-plant-automation': images.sectorWaterInvestors,
	'industrial-scada-system': images.serviceScadaControlRoom,
}

export interface GalleryItem {
	id: string
	name: string
	category: string
	description: string
	image: string
	imageAlt: string
	to: string
	linkLabel: string
	/** Short name for the hero card caption, which must fit on one line. */
	label?: string
}

const sector = (id: string) => {
	const match = sectors.find(item => item.id === id)
	if (!match) throw new Error(`Unknown sector: ${id}`)
	return match
}

const projectItem = (project: Project): GalleryItem => ({
	id: project.id,
	name: project.name,
	category: project.industry,
	description: project.description,
	image: projectCardImages[project.id] ?? project.image,
	imageAlt: project.name,
	to: `/projects/${project.id}`,
	linkLabel: 'View Project',
})

// Live EMS dashboards. They have no project detail pages, so each links to its industry page.
const dashboardItem = (id: string, name: string, sectorId: string, image: string, imageAlt: string): GalleryItem => {
	const { name: category, description, route } = sector(sectorId)
	return { id, name, category, description, image, imageAlt, to: route, linkLabel: `Explore ${category}` }
}

// "Engineering in focus" scroll gallery: featured projects first, then the dashboards.
export const galleryItems: GalleryItem[] = [
	...featuredProjects.map(projectItem),
	dashboardItem('suez-medical-complex', 'Suez Medical Complex', 'hospitals', images.suezMedicalComplex, 'Suez Medical Complex dashboard showing bed occupancy, live lobby camera, people counts and carbon footprint'),
	dashboardItem('park-lane', 'Park Lane', 'compounds', images.industryMallsDashboard, 'Park Lane dashboard showing occupancy, operating costs, carbon footprint, parking and real-time systems'),
	dashboardItem('cn-05-tower', 'CN-05 Tower', 'towers', images.industryTowersDashboard, 'CN-05 Tower dashboard showing energy, water tanks, chiller system, occupancy and security'),
	{ ...dashboardItem('investors-ext', 'Investors-Ext Sewage Lifting Station', 'water', images.industryWaterDashboard, 'Investors-Ext sewage lifting station dashboard showing pumps, flow, pressure and sump levels'), label: 'Investors-Ext Station' },
]

// Hero card strip: four projects followed by the live dashboards.
export const heroItems: GalleryItem[] = [...heroProjects.map(projectItem), ...galleryItems.slice(featuredProjects.length)]
