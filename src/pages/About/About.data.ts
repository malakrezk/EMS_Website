import {
  HiOutlineBuildingOffice2,
  HiOutlineCpuChip,
  HiOutlineLightBulb,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineUserGroup,
  HiOutlineWrenchScrewdriver
} from 'react-icons/hi2'
import { transitions } from '../../theme/transitions'

export const images = {
  hero: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=2400&q=88',
  engineering: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=86',
  operations: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1800&q=86',
}

export const capabilities = [
  {
    icon: HiOutlineWrenchScrewdriver,
    title: 'Integrated MEP Engineering',
    text: 'Mechanical, electrical and life-safety systems coordinated around reliability, efficiency and maintainability.',
  },
  {
    icon: HiOutlineCpuChip,
    title: 'Automation & Control',
    text: 'BMS, SCADA and intelligent control systems that make complex infrastructure easier to operate.',
  },
  {
    icon: HiOutlineBuildingOffice2,
    title: 'Connected Operations',
    text: 'ZETA brings live systems, data, dashboards and digital context into one clear operating environment.',
  },
]

export const values = [
  { icon: HiOutlineLightBulb, title: 'Innovation', text: 'Apply technology where it creates meaningful operational value.' },
  { icon: HiOutlineShieldCheck, title: 'Reliability', text: 'Engineer systems and relationships for dependable long-term performance.' },
  { icon: HiOutlineSparkles, title: 'Excellence', text: 'Bring technical depth and disciplined execution to every stage.' },
  { icon: HiOutlineUserGroup, title: 'Partnership', text: 'Work alongside clients to understand the outcome behind every requirement.' },
]

export const milestones = [
  ['2016', 'EMS founded', 'Engineering delivery and accountable management brought together under one clear purpose.'],
  ['Foundation', 'MEP contracting', 'A multidisciplinary delivery base established across mechanical, electrical and facility systems.'],
  ['Evolution', 'Automation & control', 'Capabilities expanded into BMS, SCADA and connected infrastructure control.'],
  ['Innovation', 'ZETA platform', 'IoT, AI, dashboards and digital facility context unified in one operating layer.'],
  ['Regional', 'Egypt & GCC growth', 'The EMS approach applied across more markets, facilities and infrastructure environments.'],
  ['Future', 'Intelligent operations', 'Advancing AI-assisted management, energy insight and sustainable connected infrastructure.'],
]

export const ease = transitions.reveal

export const statistics = [
  { value: 10, suffix: '+', label: 'Years' },
  { value: 4, label: 'Regional markets' },
  { value: 6, label: 'Technology partners' },
  { value: 6, label: 'Connected layers' },
]
