import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  HiOutlineArrowLeft, HiOutlineArrowRight,
  HiOutlineArrowUpRight, HiOutlineBuildingOffice2, HiOutlineCheckBadge,
  HiOutlineEye, HiOutlineGlobeAlt, HiOutlinePause, HiOutlinePlay,
  HiOutlineSpeakerWave, HiOutlineSpeakerXMark, HiOutlineXMark,
} from 'react-icons/hi2'
import { servicesShowcase } from '../data/servicesShowcase'
import { projects } from '../data/projects'
import { partners } from '../data/partners'
import IndustriesAccordionCarousel from '../components/home/IndustriesAccordionCarousel'

gsap.registerPlugin(ScrollTrigger)

const solutionCards = [
  { id: 'building-management', title: 'BMS', label: 'Intelligent buildings', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=88', text: 'Centralized building management for intelligent monitoring, control and energy efficiency.', to: '/services/building-management' },
  { id: 'scada', title: 'SCADA', label: 'Infrastructure control', image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1800&q=88', text: 'Real-time supervision and control for industrial systems and critical infrastructure.', to: '/services/scada' },
  { id: 'iot', title: 'IoT', label: 'Connected operations', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1800&q=88', text: 'Connected sensors, devices and infrastructure that turn operational data into intelligent action.', to: '/services/iot' },
  { id: 'artificial-intelligence', title: 'Artificial Intelligence', label: 'Operational intelligence', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=88', text: 'AI-powered automation, prediction and decision support for smarter operations.', to: '/services/artificial-intelligence' },
  { id: 'digital-twin', title: 'Digital Twin', label: 'Virtual operations', image: '/hero-control-room-04.jpg', text: 'Virtual representations of physical systems for monitoring, simulation and optimization.', to: '/services/digital-twin' },
  { id: 'robotics-iot', title: 'Robotics & IoT', label: 'Smart automation', image: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=1800&q=88', text: 'Connected robotic automation combining intelligent machines, sensors and real-time control.', to: '/services/robotics-iot' },
]

const homeSolutionSectors = [
  'Towers · Hospitals · Factories',
  'Warehouses · Schools · Malls',
  'Oil · Water · Electrical Plants',
]

const homeSolutionsSpring = { type: 'spring', stiffness: 120, damping: 22, mass: .8 }

const homeCaseStudyOrder = [
  ['data-center-operations', 'Data Center', undefined, '/Gemini_Generated_Image_1ujzed1ujzed1ujz.jpg', 'Connected Digital Infrastructure', 'Centralized monitoring and intelligent control for resilient data-center operations.', ['24/7 Infrastructure Visibility', 'Integrated Critical Systems']],
  ['water-treatment-plant-automation', 'Water Infrastructure', '/investors-water.mp4', '/industry-water-dashboard.png', 'Smart Water Management', 'Connected monitoring and intelligent control for safer, more efficient water operations.', ['Real-Time Monitoring', 'Predictive Maintenance']],
  ['smart-hospital', 'Hospital', undefined, undefined, 'Integrated Healthcare Infrastructure', 'Connected facility systems provide clear, real-time oversight across healthcare operations.', ['Integrated Building Management', 'Real-Time Monitoring']],
  ['wadi-zaha-project', 'Residential Compounds', '/park-lane-compounds.mp4', '/industry-malls-dashboard.png', 'Connected Residential Infrastructure', 'Integrated MEP and automation systems support connected residential communities.', ['Integrated MEP Systems', 'Smart Residential Automation']],
  ['zia-building-complex', 'Smart Buildings', '/cn-05-buildings.mp4', '/industry-towers-dashboard.png', 'Intelligent Building Management', 'Unified smart-building visibility supports coordinated and efficient facility operations.', ['Unified Building Visibility', 'Siemens-Integrated Controls']],
  ['industrial-scada-system', 'Industrial Facilities', '/abdellatef-industrial.mp4', '/industrial-abdellatef-poster.png', 'Integrated Industrial Automation', 'Integrated PLC and SCADA control supports reliable manufacturing operations.', ['Live Process Visibility', 'Integrated PLC & SCADA']],
]

const homeCaseStudies = homeCaseStudyOrder
  .map(([id, name, videoSrc, poster, subtitle, description, highlights]) => {
    const project = projects.find(item => item.id === id)
    return project
      ? {
          ...project,
          name,
          location: subtitle,
          description,
          highlights,
          ...(videoSrc ? { videoSrc } : {}),
          ...(poster ? { poster } : {}),
        }
      : null
  })
  .filter(Boolean)

const homeStyles = `
  .home-page-shell { --home-cyan: #23C7FF; }
  .home-page-shell .section-eyebrow { font-family:"Space Grotesk",sans-serif;font-size:clamp(11px,.85vw,14px);font-weight:500;line-height:1.4;letter-spacing:.22em;color:#35B9F4;text-transform:uppercase; }
  .home-page-shell .section-copy { font-size:clamp(.94rem,1.15vw,1.05rem);line-height:1.75;color:#AFC3DB; }
  .home-page-shell .home-grid { background-image: linear-gradient(rgba(89,220,255,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(89,220,255,.055) 1px,transparent 1px);background-size:72px 72px; }
  .home-page-shell .home-no-scrollbar { scrollbar-width:none; }
  .home-page-shell .home-no-scrollbar::-webkit-scrollbar { display:none; }
  .home-page-shell .home-hero-word { display:block;overflow:visible;padding-bottom:.08em;white-space:nowrap; }
  .home-page-shell .home-hero-word + .home-hero-word { margin-top:clamp(10px,1vw,14px); }
  .home-page-shell .home-hero-word > span { display:block; }
  .home-page-shell .home-hero-title { width:min(540px,52vw);max-width:none;font-family:"Cormorant Garamond",Georgia,serif;font-size:clamp(1.75rem,2.9vw,2.5rem);font-weight:600;line-height:1.05;letter-spacing:-.025em; }
  .home-page-shell .home-hero-line-primary,
  .home-page-shell .home-hero-digitalization { color:#F5F7FA; }
  .home-page-shell .home-hero-highlight,
  .home-page-shell .home-hero-ampersand { background:linear-gradient(100deg,#27B9F3 12%,#2BC7BE 100%);background-clip:text;-webkit-background-clip:text;color:transparent;-webkit-text-fill-color:transparent; }
  .home-page-shell .home-hero-line-secondary { font-size:.82em; }
  .home-page-shell .home-hero-ampersand { display:inline-block;font-size:1.1em;line-height:.8; }
  .home-page-shell #home-hero .home-hero-column { width:min(560px,100%); }
  .home-page-shell #home-hero .home-hero-column > .home-hero-support:first-child p { margin-left:.2rem;color:#32A9F5;font-size:clamp(.62rem,.72vw,.76rem);font-weight:700;letter-spacing:.24em; }
  .home-page-shell #home-hero .home-hero-eyebrow { max-width:100%;font-family:"Space Grotesk",sans-serif;font-size:clamp(11px,.85vw,14px);font-weight:500;line-height:1.4;letter-spacing:.22em;color:#35B9F4;overflow-wrap:anywhere; }
  .home-page-shell #home-hero .home-hero-description { color:#AFC3DB;font-size:clamp(.9rem,1.1vw,1.02rem);line-height:1.75; }
  .home-page-shell #home-hero .home-hero-technologies { color:#AFC3DB;font-size:clamp(.76rem,.9vw,.88rem);font-weight:500;letter-spacing:.015em; }
  .home-page-shell #home-hero .home-hero-action { display:inline-flex;height:48px;align-items:center;justify-content:center;border-radius:.625rem;padding-inline:1.5rem;font-size:.78rem;font-weight:700;transition:transform .3s ease,background-color .3s ease,border-color .3s ease,color .3s ease; }
  .home-page-shell #home-hero .home-hero-action:hover { transform:translateY(-2px); }
  .home-page-shell #home-hero .home-hero-action:focus-visible { outline:2px solid #fff;outline-offset:3px; }
  .home-page-shell #home-hero .home-hero-primary { background-image:linear-gradient(90deg,#22AEEF 0%,#18C7D1 55%,#21D3B8 100%);background-position:0 0;background-size:200% 100%;color:#010B1F;transition:background-position 400ms ease,transform 400ms ease,box-shadow 400ms ease; }
  .home-page-shell #home-hero .home-hero-primary:hover { background-position:100% 0;color:#010B1F;box-shadow:0 10px 26px rgba(34,174,239,.24);transform:translateY(-2px); }
  .home-page-shell #home-hero .home-hero-secondary { border:1px solid rgba(255,255,255,.25);background:transparent;color:#fff; }
  .home-page-shell #home-hero .home-hero-secondary:hover { border-color:#32A9F5;background:rgba(50,169,245,.08);color:#32A9F5; }
  .home-page-shell #home-hero .home-hero-trust { background:transparent; }
  .home-page-shell #home-hero .home-hero-trust-item { transition:transform .25s ease,color .25s ease; }
  .home-page-shell #home-hero .home-hero-trust-item:hover { transform:translateY(-2px);color:#fff; }
  .home-page-shell .home-hero-video-shade { position:absolute;inset:0;z-index:10;pointer-events:none;background:linear-gradient(90deg,rgba(2,12,28,.98) 0%,rgba(2,12,28,.92) 30%,rgba(3,19,38,.70) 52%,rgba(4,28,50,.38) 72%,rgba(4,28,50,.08) 100%); }
  .home-page-shell .home-hero-gallery { position:absolute;inset:0 0 0 35%;z-index:5;overflow:hidden;pointer-events:none;perspective:1200px;transform-style:preserve-3d; }
  .home-page-shell .home-hero-gallery::after { content:'';position:absolute;inset:0 auto 0 0;z-index:90;width:clamp(2rem,5vw,6rem);background:linear-gradient(90deg,#000816 0%,rgba(0,8,22,.72) 28%,transparent 100%);pointer-events:none; }
  .home-page-shell .home-hero-collage { position:absolute;inset:clamp(5rem,9vh,7rem) 0 3% 0;overflow:visible;transform-style:preserve-3d; }
  .home-page-shell .home-hero-gallery-slot { position:absolute;z-index:var(--card-layer,1);aspect-ratio:16/10;overflow:visible;opacity:.66;filter:brightness(.78) saturate(.92);transform:translate3d(0,0,0) scale(1);transform-origin:center center;transform-style:preserve-3d;transition:transform 900ms cubic-bezier(.22,1,.36,1),opacity 700ms ease,filter 700ms ease,z-index 0s linear 900ms;will-change:transform,opacity,filter;backface-visibility:hidden;-webkit-backface-visibility:hidden; }
  .home-page-shell .home-hero-gallery.has-focus .home-hero-gallery-slot:not(.is-active) { opacity:.32;filter:brightness(.58) saturate(.78);transform:translate3d(0,0,-50px) scale(.93); }
  .home-page-shell .home-hero-gallery .home-hero-gallery-slot.is-active { z-index:80;opacity:1;filter:brightness(1.12) contrast(1.04) saturate(1.1);transform:translate3d(var(--focus-x,0),var(--focus-y,0),170px) scale(var(--focus-scale,1.6));transition:transform 900ms cubic-bezier(.22,1,.36,1),opacity 700ms ease,filter 700ms ease,z-index 0s linear 0s; }
  .home-page-shell .home-hero-gallery-slot:nth-child(1) { left:27%;top:26%;width:47%;--card-layer:8;--focus-x:-.325vw;--focus-y:5vh;--focus-scale:1.87; }
  .home-page-shell .home-hero-gallery-slot:nth-child(2) { left:62%;top:3%;width:36%;--card-layer:4;--focus-x:-19.5vw;--focus-y:29vh;--focus-scale:2.44; }
  .home-page-shell .home-hero-gallery-slot:nth-child(3) { left:2%;top:7%;width:34%;--card-layer:3;--focus-x:20.15vw;--focus-y:25vh;--focus-scale:2.59; }
  .home-page-shell .home-hero-gallery-slot:nth-child(4) { left:73%;top:38%;width:31%;--card-layer:5;--focus-x:-25.025vw;--focus-y:-1vh;--focus-scale:2.84; }
  .home-page-shell .home-hero-gallery-slot:nth-child(5) { left:47%;top:68%;width:40%;--card-layer:6;--focus-x:-11.05vw;--focus-y:-26vh;--focus-scale:2.2; }
  .home-page-shell .home-hero-gallery-slot:nth-child(6) { left:0;top:37%;width:30%;--card-layer:4;--focus-x:22.75vw;--focus-y:-1vh;--focus-scale:2.93; }
  .home-page-shell .home-hero-gallery-slot:nth-child(7) { left:76%;top:72%;width:31%;--card-layer:2;--focus-x:-26.975vw;--focus-y:-29vh;--focus-scale:2.84; }
  .home-page-shell .home-hero-gallery-slot:nth-child(8) { left:8%;top:65%;width:35%;--card-layer:3;--focus-x:15.925vw;--focus-y:-24vh;--focus-scale:2.51; }
  .home-page-shell .home-hero-gallery-slot:nth-child(9) { left:38%;top:2%;width:32%;--card-layer:3;--focus-x:-2.6vw;--focus-y:27vh;--focus-scale:2.75; }
  .home-page-shell .home-hero-gallery-slot:nth-child(10) { left:62%;top:4%;width:36%;--card-layer:4;--focus-x:-19.5vw;--focus-y:28vh;--focus-scale:2.44; }
  .home-page-shell .home-hero-gallery-card { position:absolute;inset:0;overflow:hidden;border:0;border-radius:clamp(.7rem,.8vw,.95rem);background:transparent;box-shadow:0 18px 48px rgba(0,0,0,.42);backface-visibility:hidden;-webkit-backface-visibility:hidden; }
  .home-page-shell .home-hero-gallery-slot.is-active .home-hero-gallery-card { box-shadow:0 28px 70px rgba(0,0,0,.66); }
  .home-page-shell .home-hero-gallery-media { display:block;height:100%;width:100%;object-fit:contain;transform:scale(1);transition:transform 1.4s cubic-bezier(.22,1,.36,1); }
  .home-page-shell .home-hero-gallery-slot.is-active .home-hero-gallery-media { object-fit:contain;transform:scale(1); }
  .home-page-shell .home-hero-gallery-shade { position:absolute;inset:0;z-index:2;pointer-events:none;background:linear-gradient(90deg,#000816 0%,rgba(0,8,22,.99) 33%,rgba(0,8,22,.8) 44%,rgba(0,8,22,.2) 57%,rgba(0,8,22,.025) 100%),linear-gradient(180deg,rgba(0,8,22,.46),transparent 19%,transparent 80%,rgba(0,8,22,.32)); }
  .home-page-shell .home-section-title { font-size:clamp(2.35rem,5vw,5rem); }
  .home-page-shell #home-services .home-section-title { font-size:clamp(1.75rem,3vw,3rem); }
  .home-page-shell #home-solutions .home-section-title { font-size:clamp(1.9rem,3.5vw,3.7rem); }
  .home-page-shell #home-solutions { padding-top:clamp(4.5rem,8vh,6.5rem);padding-bottom:clamp(2.75rem,5vh,4rem); }
  .home-page-shell #home-solutions .home-section-title { margin-top:1rem;font-size:clamp(1.9rem,3vw,3.2rem); }
  .home-page-shell #home-solutions .home-section-copy { margin-top:1rem;line-height:1.65; }
  .home-page-shell #home-case-studies .home-section-title { font-size:clamp(1.85rem,3vw,3.25rem); }
  .home-page-shell #home-case-studies { padding-block:clamp(3.5rem,6vw,5.5rem); }
  .home-page-shell .home-section-copy { font-size:clamp(.86rem,1.2vw,1rem); }
  .home-page-shell #home-services .home-section-copy { color:rgb(86,170,198); }
  .home-page-shell #home-solutions .home-section-copy { color:rgb(86,170,198); }
  .home-page-shell #home-case-studies .home-section-copy { color:rgb(86,170,198); }
  .home-page-shell #home-services .home-section-heading > p:first-child { font-size:clamp(1rem,1.5vw,1.3rem); }
  .home-page-shell #home-services .home-section-copy { font-size:clamp(.78rem,1vw,.9rem);line-height:1.6; }
  .home-page-shell .home-services-section { min-height:100svh;padding-block:clamp(2.5rem,4vw,4rem); }
  .home-page-shell .home-carousel-stage { height:clamp(285px,32vw,350px);margin-top:5rem; }
  .home-page-shell .home-service-card { height:clamp(270px,29vw,320px);width:min(56vw,440px);border-radius:1.4rem;overflow:hidden;clip-path:inset(0 round 1.4rem);-webkit-clip-path:inset(0 round 1.4rem);isolation:isolate;contain:paint;-webkit-backface-visibility:hidden;backface-visibility:hidden; }
  .home-page-shell .home-service-content { padding:clamp(.9rem,2vw,1.35rem); }
  .home-page-shell .home-service-title { font-size:clamp(1.55rem,3.2vw,2.65rem); }
  .home-page-shell .home-service-overlay { background:linear-gradient(90deg,rgba(1,11,31,.5) 0%,rgba(1,11,31,.18) 48%,rgba(1,11,31,.04) 78%),linear-gradient(to top,rgba(1,11,31,.97) 0%,rgba(1,11,31,.72) 30%,rgba(1,11,31,.2) 64%,rgba(1,11,31,.08) 100%); }
  .home-page-shell .home-hero-content { padding-bottom:clamp(4rem,8vw,7rem); }
  .home-page-shell .home-major-section { padding-block:clamp(4.5rem,8vw,7.5rem); }
  .home-page-shell .home-solution-content { padding:clamp(1.4rem,3vw,2.25rem); }
  .home-page-shell .home-solution-title { font-size:clamp(1.75rem,2.7vw,2.65rem); }
  .home-page-shell .home-case-content { padding:clamp(1.6rem,5vw,4.5rem); }
  .home-page-shell .home-case-title { font-size:clamp(2rem,4vw,4rem); }
  .home-page-shell .home-about-image { min-height:clamp(520px,62vw,760px); }
  .home-page-shell .home-about-content { padding:clamp(1.7rem,5vw,4rem); }
  .home-page-shell .home-about-title { font-size:clamp(2.5rem,5.5vw,5.5rem); }
  .home-page-shell .home-about-panel { padding:clamp(1.6rem,4vw,2.6rem); }
  .home-page-shell #home-about { padding-block:clamp(4rem,6.5vw,6.5rem); }
  .home-page-shell #home-about .home-about-intro > p:first-child,
  .home-page-shell :is(#home-services,#home-solutions,#home-case-studies) .home-section-heading > p:first-child { font-size:var(--text-label);font-weight:800;line-height:1.35;letter-spacing:.18em; }
  .home-page-shell .home-scroll-line::after { content:'';position:absolute;inset:0;background:#23C7FF;transform:translateY(-100%);animation:homeScrollLine 2.2s cubic-bezier(.77,0,.18,1) infinite; }
  .home-page-shell .home-network-path { stroke-dasharray:7 14;animation:homeNetworkFlow 9s linear infinite; }
  .home-page-shell .home-data-particle { animation:homeDataFloat 5s ease-in-out infinite; }
  .home-page-shell .home-scan { animation:homeScan 8s ease-in-out infinite; }
  .home-page-shell .home-float { animation:homeFloat 5.5s ease-in-out infinite; }
  .home-page-shell .home-service-card::before { content:'';position:absolute;inset:0;z-index:30;border-radius:inherit;box-shadow:inset 0 0 0 1px transparent;pointer-events:none;transition:box-shadow .45s ease; }
  .home-page-shell .home-service-card.is-active::before { box-shadow:inset 0 0 0 1px rgba(50,169,245,.72); }
  .home-page-shell .home-service-card::after { content:'';position:absolute;inset:-45% -80%;z-index:20;background:linear-gradient(105deg,transparent 42%,rgba(255,255,255,.12) 50%,transparent 58%);transform:translateX(-38%) rotate(8deg);transition:transform 1s cubic-bezier(.22,1,.36,1);pointer-events:none; }
  .home-page-shell .home-service-card:hover::after { transform:translateX(42%) rotate(8deg); }
  .home-page-shell .home-solution-card::before { content:'';position:absolute;inset:0;border-radius:inherit;border:1px solid transparent;background:linear-gradient(135deg,rgba(89,220,255,.55),transparent 35%,rgba(255,255,255,.12)) border-box;mask:linear-gradient(#fff 0 0) padding-box,linear-gradient(#fff 0 0);mask-composite:exclude;opacity:0;transition:opacity .5s ease;pointer-events:none; }
  .home-page-shell .home-solution-card:hover::before { opacity:1; }
  .home-page-shell .home-case-orb { animation:homeCaseOrb 9s ease-in-out infinite; }
  .home-page-shell .home-case-orb.is-delayed { animation-delay:-4.5s; }
  .home-page-shell .home-case-card .home-case-glow { opacity:0;transform:translate3d(24px,-18px,0) scale(.82);transition:opacity .65s ease,transform .8s cubic-bezier(.22,1,.36,1); }
  .home-page-shell .home-case-card:hover .home-case-glow,
  .home-page-shell .home-case-card:focus-within .home-case-glow { opacity:1;transform:translate3d(0,0,0) scale(1); }
  .home-page-shell .home-case-accent { transform:scaleX(0);transform-origin:left;transition:transform .75s cubic-bezier(.22,1,.36,1); }
  .home-page-shell .home-case-card:hover .home-case-accent,
  .home-page-shell .home-case-card:focus-within .home-case-accent { transform:scaleX(1); }
  .home-page-shell .home-case-copy { transition:transform .55s cubic-bezier(.22,1,.36,1); }
  .home-page-shell .home-case-card:hover .home-case-copy,
  .home-page-shell .home-case-card:focus-within .home-case-copy { transform:translateY(-3px); }
  .home-page-shell .home-solutions-progress { animation:homeSolutionsProgress 6.2s linear forwards;transform-origin:left; }
  .home-page-shell .home-solutions-progress.is-paused { animation-play-state:paused; }
  .home-page-shell .home-partners-title { background:linear-gradient(90deg,#299BF0 0%,#23C7FF 28%,#21D3B8 52%,#6CA7F8 76%,#299BF0 100%);background-size:240% 100%;background-clip:text;-webkit-background-clip:text;color:transparent;-webkit-text-fill-color:transparent;animation:homePartnerGradient 7s ease-in-out infinite; }
  .home-page-shell .home-partners-aura { animation:homePartnerAura 8s ease-in-out infinite; }
  .home-page-shell .home-partner-logo-card { position:relative;isolation:isolate;overflow:hidden;border:1px solid rgba(50,169,245,.16);background:linear-gradient(145deg,rgba(11,37,72,.7),rgba(7,24,46,.42));box-shadow:0 16px 36px rgba(0,0,0,.16); }
  .home-page-shell .home-partner-logo-card::after { content:'';position:absolute;inset:-60% -90%;z-index:0;background:linear-gradient(110deg,transparent 42%,rgba(35,199,255,.12) 50%,transparent 58%);transform:translateX(-42%);animation:homePartnerSweep 7s ease-in-out infinite;pointer-events:none; }
  @keyframes homeScrollLine { 0%{transform:translateY(-100%)} 45%,55%{transform:translateY(0)} 100%{transform:translateY(100%)} }
  @keyframes homeNetworkFlow { to{stroke-dashoffset:-84} }
  @keyframes homeDataFloat { 0%,100%{opacity:.18;transform:translate3d(0,0,0)} 50%{opacity:.75;transform:translate3d(0,-10px,0)} }
  @keyframes homeScan { 0%,18%{transform:translateY(-120%);opacity:0} 28%{opacity:.28} 72%{opacity:.12} 82%,100%{transform:translateY(120%);opacity:0} }
  @keyframes homeFloat { 0%,100%{transform:translate3d(0,0,0)} 50%{transform:translate3d(0,-9px,0)} }
  @keyframes homeCaseOrb { 0%,100%{transform:translate3d(0,0,0) scale(1);opacity:.2} 50%{transform:translate3d(18px,-16px,0) scale(1.08);opacity:.38} }
  @keyframes homeSolutionsProgress { from{transform:scaleX(0)} to{transform:scaleX(1)} }
  @keyframes homePartnerGradient { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
  @keyframes homePartnerAura { 0%,100%{transform:translate3d(-4%,0,0) scale(.96);opacity:.3} 50%{transform:translate3d(4%,-8px,0) scale(1.06);opacity:.55} }
  @keyframes homePartnerSweep { 0%,20%{transform:translateX(-48%)} 65%,100%{transform:translateX(48%)} }
  @media (hover:none) { .home-page-shell .home-solution-description { opacity:1;transform:none; }.home-page-shell .home-service-card::after { display:none; } }
  @media (max-width:1023px) { .home-page-shell .home-hero-gallery-slot:nth-child(n+7):not(.is-active){opacity:.14}.home-page-shell .home-service-content ul{display:none}.home-page-shell .home-carousel-stage{margin-top:3.5rem} }
  @media (max-width:767px) { .home-page-shell #home-hero{min-height:max(100svh,680px)}.home-page-shell .home-hero-gallery{inset:0 0 0 35%}.home-page-shell .home-hero-collage{inset:6rem 0 4% 0}.home-page-shell .home-hero-gallery-slot,.home-page-shell .home-hero-gallery-slot:nth-child(n){left:6%;right:auto;top:34%;width:88%;opacity:0;filter:brightness(.65);transform:translate3d(0,0,0) scale(.93);--focus-x:0;--focus-y:0;--focus-scale:1}.home-page-shell .home-hero-gallery.has-focus .home-hero-gallery-slot:not(.is-active){opacity:0;transform:translate3d(0,0,-30px) scale(.93)}.home-page-shell .home-hero-gallery-slot.is-active,.home-page-shell .home-hero-gallery-slot:nth-child(n).is-active{opacity:.88;filter:brightness(1) saturate(1.02);transform:translate3d(0,0,70px) scale(1)}.home-page-shell .home-hero-gallery-shade{background:linear-gradient(90deg,rgba(0,8,22,.995) 0%,rgba(0,8,22,.92) 52%,rgba(0,8,22,.52) 100%),linear-gradient(180deg,rgba(0,8,22,.62),transparent 24%,transparent 72%,rgba(0,8,22,.72))}.home-page-shell .home-hero-title{font-size:clamp(1.55rem,7.3vw,2.1rem)}.home-page-shell .home-hero-word + .home-hero-word{margin-top:.9em}.home-page-shell .home-hero-content{min-height:max(100svh,680px);padding-top:6rem;padding-bottom:3rem}.home-page-shell #home-hero .home-hero-trust-item:hover{transform:none}.home-page-shell .home-services-section{padding-block:2.4rem}.home-page-shell .home-service-card{height:300px;width:min(86vw,360px)}.home-page-shell .home-carousel-stage{height:320px;margin-top:2.5rem}.home-page-shell .home-service-title{font-size:clamp(1.45rem,7.5vw,2.15rem)}.home-page-shell #home-services .home-section-copy{max-width:34rem;padding-inline:.75rem}.home-page-shell #home-services .home-section-title{font-size:clamp(1.7rem,8vw,2.35rem)}.home-page-shell #home-case-studies article{min-height:440px}.home-page-shell #home-case-studies article>header{min-height:auto} }
  @media (max-width:767px) { .home-page-shell #home-services .home-carousel-stage{overflow:hidden;border-radius:1.4rem}.home-page-shell #home-services .home-service-card{border-radius:1.1rem;clip-path:inset(0 round 1.1rem);-webkit-clip-path:inset(0 round 1.1rem)} }
  @media (max-width:479px) { .home-page-shell #home-services .home-section-heading > p:first-child{font-size:.9rem}.home-page-shell .home-service-card{height:280px;width:min(88vw,330px)}.home-page-shell .home-carousel-stage{height:300px}.home-page-shell .home-service-content{padding:.85rem}.home-page-shell #home-services .home-section-copy{font-size:.76rem;line-height:1.55} }
  @media (max-width:767px) { .home-page-shell .home-hero-video-shade{background:linear-gradient(90deg,rgba(2,12,28,.98) 0%,rgba(2,12,28,.94) 38%,rgba(3,19,38,.84) 70%,rgba(4,28,50,.64) 100%)} }
  @media (max-width:639px) { .home-page-shell #home-hero .home-hero-trust-items{align-items:flex-start;flex-direction:column}.home-page-shell #home-hero .home-hero-trust-separator{display:none} }
  @media (max-width:479px) { .home-page-shell #home-hero .home-hero-actions{align-items:stretch;flex-direction:column}.home-page-shell #home-hero .home-hero-action{width:100%} }
  @media (max-height:850px) and (min-width:1024px) { .home-page-shell .home-services-section{padding-block:2.25rem}.home-page-shell .home-carousel-stage{height:290px;margin-top:5rem}.home-page-shell .home-service-card{height:275px;width:min(50vw,410px)}.home-page-shell .home-service-content{padding:.95rem}.home-page-shell .home-service-content ul{display:none}.home-page-shell .home-service-title{font-size:clamp(1.5rem,2.7vw,2.3rem)}.home-page-shell .home-section-copy{margin-top:.75rem}.home-page-shell .home-major-section{padding-block:4.5rem} }
  @media (max-height:700px) and (min-width:1024px) { .home-page-shell .home-hero-title{font-size:clamp(1.7rem,2.4vw,2.35rem)}.home-page-shell .home-hero-word + .home-hero-word{margin-top:.8em}.home-page-shell .home-hero-content{padding-top:5.5rem;padding-bottom:2.5rem}.home-page-shell #home-hero .home-hero-support.mt-8{margin-top:1.25rem}.home-page-shell #home-hero .home-hero-actions{margin-top:1.25rem}.home-page-shell #home-hero .home-hero-trust{margin-top:1rem} }
  .home-page-shell .home-hero-word + .home-hero-word { margin-top:clamp(14px,1.3vw,19px); }
  @media (max-width:767px) { .home-page-shell .home-hero-title{width:100%;max-width:100%;font-size:clamp(1.45rem,5.8vw,2.25rem);line-height:1.05}.home-page-shell .home-hero-line-secondary{font-size:.82em}.home-page-shell .home-hero-word + .home-hero-word{margin-top:1em} }
  @media (min-width:768px) and (max-width:1023px) { .home-page-shell .home-hero-title{width:min(540px,56vw);font-size:clamp(1.8rem,3.5vw,2.3rem)} }
  .home-page-shell :is(#home-services,#home-solutions,#home-case-studies,#home-about) .home-section-title { font-size:var(--text-section);line-height:1.06; }
  .home-page-shell :is(#home-services,#home-solutions,#home-case-studies,#home-about) .home-section-copy { font-size:var(--text-body);line-height:1.7; }
  .home-page-shell :is(#home-services,#home-solutions,#home-case-studies,#home-about) .home-section-heading > p:first-child { font-size:var(--text-label);line-height:1.35; }
  .home-page-shell #home-services .home-service-title,
  .home-page-shell #home-case-studies .home-case-title { font-size:var(--text-card-title);line-height:1.16; }
  @media (min-width:1024px) {
    .home-page-shell :is(#home-services,#home-solutions,#home-case-studies) .home-section-heading { width:100%;max-width:none; }
    .home-page-shell :is(#home-services,#home-solutions,#home-case-studies) .home-section-title { font-size:clamp(2rem,3vw,3.15rem);white-space:nowrap; }
    .home-page-shell #home-solutions .home-section-heading { max-width:68rem; }
  }
  @media (prefers-reduced-motion: reduce) { .home-page-shell .home-network-path,.home-page-shell .home-data-particle,.home-page-shell .home-scan,.home-page-shell .home-float,.home-page-shell .home-scroll-line::after,.home-page-shell .home-solutions-progress,.home-page-shell .home-case-orb,.home-page-shell .home-partners-title,.home-page-shell .home-partners-aura,.home-page-shell .home-partner-logo-card::after{animation:none!important}.home-page-shell .home-hero-gallery-slot,.home-page-shell .home-hero-gallery-card,.home-page-shell .home-hero-gallery-media{transition:none!important}.home-page-shell #home-hero .home-hero-trust-item{transition:none!important}.home-page-shell .home-case-card,.home-page-shell .home-case-media,.home-page-shell .home-case-sweep,.home-page-shell .home-case-play,.home-page-shell .home-case-glow,.home-page-shell .home-case-accent,.home-page-shell .home-case-copy{transition:none!important;transform:none!important} }
`

const ease = [0.22, 1, 0.36, 1]
const aboutMilestones = [
  ['Founded in Egypt', 'Established as a premier MEP contracting company in Egypt.', HiOutlineBuildingOffice2],
  ['Expanded in Saudi Arabia', 'Expanded operations in Saudi Arabia to serve the wider regional market.', HiOutlineGlobeAlt],
  ['Expanded in England', 'Expanded operations in England to connect EMS with international markets.', HiOutlineCheckBadge],
]



const homeServiceCards = [
  {
    ...servicesShowcase.find(service => service.id === 'building-management-systems'),
    title: 'BMS',
    image: '/sector-towers-cn05.png',
    description: 'Unified building management for HVAC, power, lighting, security and life-safety systems.',
    features: ['Unified building dashboards', 'HVAC and lighting control', 'Energy and fault reporting'],
  },
  {
    ...servicesShowcase.find(service => service.id === 'scada'),
    title: 'SCADA',
    image: '/service-scada-control-room.png',
    description: 'Real-time supervisory control, alarms and operational visibility across distributed infrastructure.',
    features: ['Live process visualization', 'Remote telemetry and alarms', 'Historian and reporting'],
  },
  {
    ...servicesShowcase.find(service => service.id === 'light-current-systems'),
    title: 'IoT',
    image: '/service-iot.png',
    description: 'Connected sensors and devices that transform facility data into clear, actionable insight.',
    features: ['Connected sensors and gateways', 'Real-time device monitoring', 'Secure data integration'],
  },
  {
    ...servicesShowcase.find(service => service.id === 'control-systems'),
    title: 'AI',
    image: '/service-ai.png',
    description: 'AI-powered analytics for smarter decisions, predictive maintenance and efficient operations.',
    features: ['Predictive maintenance', 'Operational analytics', 'Intelligent recommendations'],
  },
  {
    ...servicesShowcase.find(service => service.id === 'industrial-automation'),
    title: 'Robotics',
    image: '/Screenshot 2026-09-14 221026.png',
    description: 'Connected robotic automation engineered to improve precision, throughput and workplace safety.',
    features: ['Robotic process integration', 'Production automation', 'Performance monitoring'],
  },
  {
    ...servicesShowcase.find(service => service.id === 'energy-management'),
    id: 'digital-twin',
    title: 'Digital Twin',
    image: '/service-digital-twin-dashboard.jpg',
    description: 'A connected digital representation of physical systems for simulation, monitoring and remote insight.',
    features: ['Live operational context', 'Remote system understanding', 'Simulation and maintenance support'],
    to: '/digital-twin',
  },
]
const featuredPartners = partners.filter(partner => ['siemens', 'cisco', 'aws', 'oracle'].includes(partner.id))

function Eyebrow({ children, className = '' }) {
  return <p className={`section-eyebrow font-mono text-[clamp(.72rem,1vw,.9rem)] font-semibold uppercase tracking-[.3em] text-[#299BF0] ${className}`}>{children}</p>
}

function SectionTitle({ eyebrow, title, text, align = 'left' }) {
  return <div className={`home-reveal home-section-heading max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 className="home-section-title mt-5 font-serif leading-[.98] tracking-[-.025em] text-white">{title}</h2>
    {text && <p className={`home-section-copy section-copy mt-6 max-w-2xl leading-7 text-slate-400 ${align === 'center' ? 'mx-auto' : ''}`}>{text}</p>}
  </div>
}

function ServiceCarousel() {
  const [active, setActive] = useState(0)
  const [viewportWidth, setViewportWidth] = useState(() => typeof window === 'undefined' ? 1440 : window.innerWidth)
  const wheelLocked = useRef(false)
  const hoverTimer = useRef(null)
  const switchTimer = useRef(null)
  const switchLocked = useRef(false)
  const activeService = homeServiceCards[active]
  const total = homeServiceCards.length
  const isMobile = viewportWidth < 768

  useEffect(() => {
    const resize = () => setViewportWidth(window.innerWidth)
    window.addEventListener('resize', resize, { passive: true })
    return () => {
      window.removeEventListener('resize', resize)
      window.clearTimeout(hoverTimer.current)
      window.clearTimeout(switchTimer.current)
    }
  }, [])

  const lockSwitch = useCallback(() => {
    switchLocked.current = true
    window.clearTimeout(switchTimer.current)
    switchTimer.current = window.setTimeout(() => { switchLocked.current = false }, 720)
  }, [])
  const move = useCallback((direction) => {
    lockSwitch()
    setActive(index => (index + direction + total) % total)
  }, [lockSwitch, total])
  const relativePosition = index => {
    let difference = index - active
    if (difference > total / 2) difference -= total
    if (difference < -total / 2) difference += total
    return difference
  }
  const baseCardWidth = isMobile
    ? Math.min(viewportWidth - 42, 348)
    : viewportWidth < 768
      ? Math.min(viewportWidth * .86, 360)
      : viewportWidth >= 1024 && typeof window !== 'undefined' && window.innerHeight <= 850
        ? Math.min(viewportWidth * .5, 410)
        : Math.min(viewportWidth * .56, 440)
  const activeCardWidth = isMobile
    ? baseCardWidth
    : Math.min(baseCardWidth * 1.16, viewportWidth - 64, 510)
  const gap = isMobile
    ? 0
    : Math.min(viewportWidth * .28, 410) + (activeCardWidth - baseCardWidth) * .58

  const onWheel = event => {
    const horizontalIntent = event.shiftKey || (Math.abs(event.deltaX) > 12 && Math.abs(event.deltaX) > Math.abs(event.deltaY) * 1.5)
    if (!horizontalIntent || wheelLocked.current) return
    event.preventDefault()
    const amount = event.deltaX || event.deltaY
    move(amount > 0 ? 1 : -1)
    wheelLocked.current = true
    window.setTimeout(() => { wheelLocked.current = false }, 430)
  }

  return <section id="home-services" className="home-services-section relative scroll-mt-20 overflow-hidden border-y border-white/10 bg-[#010B1F]">
    <AnimatePresence mode="popLayout">
      <motion.img key={activeService.id} src={activeService.image} alt="" initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: .28, scale: 1.02 }} exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: .75, ease }} className="absolute inset-0 h-full w-full object-cover" />
    </AnimatePresence>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(11,50,81,.2),transparent_45%),linear-gradient(90deg,rgba(2,8,18,.96),rgba(2,8,18,.58)_50%,rgba(2,8,18,.96))]" />
    <div className="home-grid absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]" />

    <div className="container-ems relative">
      <SectionTitle eyebrow="Engineering services" title="Integrated Engineering. Intelligent Operations." text="Explore intelligent engineering services designed for safer, smarter, and more efficient operations." align="center" />

      <div onWheel={onWheel} onKeyDown={event => { if (event.key === 'ArrowRight') move(1); if (event.key === 'ArrowLeft') move(-1) }} tabIndex="0" aria-label="EMS engineering services carousel" className="home-carousel-stage relative outline-none [perspective:1400px]">
        {homeServiceCards.map((service, index) => {
          const position = relativePosition(index)
          if (isMobile ? position !== 0 : Math.abs(position) > 2) return null
          const isActive = position === 0
          const Icon = service.icon
          return <motion.article
            key={service.id}
            drag={isActive ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={.12}
            onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 65 || Math.abs(info.velocity.x) > 450) move(info.offset.x < 0 ? 1 : -1) }}
            onMouseEnter={() => {
              if (isActive || switchLocked.current) return
              window.clearTimeout(hoverTimer.current)
              hoverTimer.current = window.setTimeout(() => {
                if (switchLocked.current) return
                lockSwitch()
                setActive(index)
              }, 320)
            }}
            onMouseLeave={() => window.clearTimeout(hoverTimer.current)}
            onClick={() => {
              window.clearTimeout(hoverTimer.current)
              if (!isActive) {
                lockSwitch()
                setActive(index)
              }
            }}
            initial={false}
            animate={{
              x: position * gap - (isActive ? activeCardWidth : baseCardWidth) / 2,
              width: isActive ? activeCardWidth : baseCardWidth,
              scale: isMobile || isActive ? 1 : Math.abs(position) === 1 ? .84 : .7,
              rotateY: isMobile ? 0 : position * -9,
              opacity: isMobile || isActive ? 1 : Math.abs(position) === 2 ? .22 : .52,
              z: isMobile ? 0 : isActive ? 80 : -Math.abs(position) * 90,
            }}
            transition={{ type: 'spring', stiffness: isMobile ? 120 : 68, damping: isMobile ? 24 : 21, mass: isMobile ? .8 : 1.15 }}
            style={{ zIndex: 10 - Math.abs(position), pointerEvents: isActive ? 'auto' : 'none', cursor: isActive ? 'grab' : 'default' }}
            className={`home-service-card group absolute left-1/2 top-0 bg-[#061326] shadow-[0_40px_120px_rgba(0,0,0,.65)] will-change-transform ${isActive ? 'is-active' : 'blur-[1px]'}`}
          >
            <img src={service.image} alt={service.title} loading={isActive ? 'eager' : 'lazy'} className="absolute inset-0 h-full w-full object-cover transition duration-[1400ms] ease-out group-hover:scale-[1.055]" />
            <div className="home-service-overlay absolute inset-0" />
            <div className="home-service-content absolute inset-0 z-[21] flex flex-col">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#32A9F5]/35 bg-[#07182e]/65 text-[#32A9F5] backdrop-blur-md"><Icon className="h-4 w-4" /></div>
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[.24em] text-[#32A9F5]">Service {String(index + 1).padStart(2, '0')} / EMS Engineering</p>
                  <h3 className="home-service-title mt-2 max-w-2xl font-serif leading-none tracking-[-.025em] text-[#C7E5F7] [text-shadow:0_2px_18px_rgba(1,11,31,.65)]">{service.title}</h3>
                </div>
              </div>
              <motion.div
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                transition={{ duration: .45, ease }}
                className="mt-auto max-w-xl"
                aria-hidden={!isActive}
              >
                <p className="text-[12px] leading-5 text-[#AFC3DB] [text-shadow:0_1px_12px_rgba(1,11,31,.8)]">{service.description}</p>
                <Link
                  to={service.to ?? `/services/${service.id}`}
                  tabIndex={isActive ? 0 : -1}
                  className="mt-3 inline-flex items-center gap-2 text-[11px] font-semibold text-[#32A9F5] transition-all duration-300 hover:gap-3 hover:text-[#C7E5F7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#32A9F5]"
                >
                  Explore <HiOutlineArrowRight aria-hidden="true" />
                </Link>
              </motion.div>
            </div>
          </motion.article>
        })}
      </div>

      <div className="relative z-20 mx-auto -mt-1 flex max-w-3xl items-center justify-between gap-4">
        <button type="button" onClick={() => move(-1)} aria-label="Previous service" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur transition hover:border-cyan-300/50 hover:bg-cyan-300/10"><HiOutlineArrowLeft /></button>
        <div className="flex min-w-0 flex-1 items-center gap-3"><span className="font-mono text-[10px] text-[#299BF0]">{String(active + 1).padStart(2, '0')}</span><div className="h-px flex-1 bg-white/15"><motion.div animate={{ width: `${((active + 1) / total) * 100}%` }} className="h-full bg-cyan-300" /></div><span className="font-mono text-[10px] text-slate-500">{String(total).padStart(2, '0')}</span></div>
        <button type="button" onClick={() => move(1)} aria-label="Next service" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur transition hover:border-cyan-300/50 hover:bg-cyan-300/10"><HiOutlineArrowRight /></button>
      </div>
      <p className="mt-5 text-center font-mono text-[9px] uppercase tracking-[.2em] text-slate-600">Drag to explore · vertical scrolling remains available</p>
    </div>
  </section>
}

function SolutionsShowcase() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [interacting, setInteracting] = useState(false)
  const [tabVisible, setTabVisible] = useState(() => typeof document === 'undefined' || !document.hidden)
  const [viewportWidth, setViewportWidth] = useState(() => typeof window === 'undefined' ? 1440 : window.innerWidth)
  const [reducedMotion, setReducedMotion] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const interactionTimer = useRef(null)
  const wheelLocked = useRef(false)
  const total = solutionCards.length
  const activeSolution = solutionCards[active]

  const move = useCallback(direction => setActive(index => (index + direction + total) % total), [total])
  const registerInteraction = useCallback(() => {
    window.clearTimeout(interactionTimer.current)
    setInteracting(true)
    interactionTimer.current = window.setTimeout(() => setInteracting(false), 4200)
  }, [])
  const moveManually = useCallback(direction => {
    move(direction)
    registerInteraction()
  }, [move, registerInteraction])
  const selectManually = useCallback(index => {
    setActive(index)
    registerInteraction()
  }, [registerInteraction])
  const relativePosition = index => {
    let difference = index - active
    if (difference > total / 2) difference -= total
    if (difference < -total / 2) difference += total
    return difference
  }

  useEffect(() => {
    const resize = () => setViewportWidth(window.innerWidth)
    const visibility = () => setTabVisible(!document.hidden)
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMotion = () => setReducedMotion(motionQuery.matches)
    window.addEventListener('resize', resize, { passive: true })
    document.addEventListener('visibilitychange', visibility)
    motionQuery.addEventListener('change', syncMotion)
    return () => {
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', visibility)
      motionQuery.removeEventListener('change', syncMotion)
      window.clearTimeout(interactionTimer.current)
    }
  }, [])

  useEffect(() => {
    if (paused || hovered || interacting || reducedMotion || !tabVisible) return undefined
    const timer = window.setTimeout(() => move(1), 6200)
    return () => window.clearTimeout(timer)
  }, [active, hovered, interacting, move, paused, reducedMotion, tabVisible])

  const isMobile = viewportWidth < 640
  const isTablet = viewportWidth < 1024
  const cardWidth = isMobile ? Math.min(viewportWidth * .82, 310) : isTablet ? 320 : 360
  const activeCardWidth = Math.min(
    cardWidth * (isMobile ? 1.14 : isTablet ? 1.16 : 1.18),
    viewportWidth - (isMobile ? 24 : 48),
  )
  const cardHeight = isMobile ? 370 : isTablet ? 390 : 420
  const spacing = (isMobile ? cardWidth * .74 : isTablet ? cardWidth * .78 : cardWidth * .86)
    + (activeCardWidth - cardWidth) * .5
  const visibleRange = isMobile ? 1 : 2

  const handleWheel = event => {
    const horizontalAmount = event.deltaX || (event.shiftKey ? event.deltaY : 0)
    const horizontalIntent = Math.abs(event.deltaX) > Math.abs(event.deltaY) * 1.2 || event.shiftKey
    if (!horizontalIntent || Math.abs(horizontalAmount) < 10 || wheelLocked.current) return
    event.preventDefault()
    moveManually(horizontalAmount > 0 ? 1 : -1)
    wheelLocked.current = true
    window.setTimeout(() => { wheelLocked.current = false }, 520)
  }

  return <div
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    onWheel={handleWheel}
    onKeyDown={event => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); moveManually(-1) }
      if (event.key === 'ArrowRight') { event.preventDefault(); moveManually(1) }
    }}
    tabIndex="0"
    aria-label="EMS solutions carousel"
    className="home-reveal mx-auto mt-6 w-full max-w-[1450px] overflow-hidden rounded-[1.75rem] bg-[#07182e] shadow-[0_35px_100px_rgba(0,0,0,.38)] outline-none focus-visible:ring-2 focus-visible:ring-[#299BF0]"
  >
    <div className="flex items-center justify-between gap-5 bg-[#041126]/85 px-5 py-4 sm:px-7">
      <div className="flex items-center gap-4">
        <span className="font-serif text-lg font-semibold tracking-[.14em] text-white">EMS</span>
        <span className="hidden h-4 w-px bg-white/15 sm:block" />
        <span className="hidden font-mono text-[8px] uppercase tracking-[.22em] text-[#56AAC6] sm:block">Solutions portfolio</span>
      </div>
      <div className="hidden items-center gap-5 font-mono text-[7px] uppercase tracking-[.16em] text-white/50 xl:flex" aria-label="Industries served">
        {homeSolutionSectors.map(sector => <span key={sector}>{sector}</span>)}
      </div>
      <Link to="/solutions" className="rounded-full border border-[#299BF0]/40 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[.12em] text-white transition hover:bg-[#299BF0]">View all</Link>
    </div>
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 bg-[#041126]/78 px-4 py-2.5 font-mono text-[7px] uppercase tracking-[.13em] text-white/50 xl:hidden" aria-label="Industries served">
      {homeSolutionSectors.map(sector => <span key={sector}>{sector}</span>)}
    </div>

    <div className="relative isolate overflow-hidden bg-[#020a16]">
      <AnimatePresence mode="popLayout">
        <motion.img key={activeSolution.image} src={activeSolution.image} alt="" initial={{ opacity: 0 }} animate={{ opacity: .18 }} exit={{ opacity: 0 }} transition={{ duration: .7 }} className="absolute inset-0 -z-10 h-full w-full scale-110 object-cover blur-xl" />
      </AnimatePresence>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(1,11,31,.92),rgba(1,11,31,.38)_50%,rgba(1,11,31,.92))]" />

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={.16}
        dragMomentum={false}
        dragSnapToOrigin
        onDragStart={() => {
          window.clearTimeout(interactionTimer.current)
          setInteracting(true)
        }}
        onDragEnd={(_, info) => {
          if (Math.abs(info.offset.x) > 55 || Math.abs(info.velocity.x) > 450) moveManually(info.offset.x < 0 ? 1 : -1)
          else registerInteraction()
        }}
        className="relative h-[clamp(400px,43vw,470px)] cursor-grab overflow-hidden active:cursor-grabbing [perspective:1700px] [transform-style:preserve-3d]"
      >
        {solutionCards.map((solution, index) => {
          const position = relativePosition(index)
          if (Math.abs(position) > visibleRange) return null
          const isActive = position === 0
          const distance = Math.abs(position)
          const renderedCardWidth = isActive ? activeCardWidth : cardWidth
          const scale = isActive ? 1 : distance === 1 ? .82 : .66
          const titleSize = isActive
            ? (isMobile ? '1.85rem' : '2.45rem')
            : distance === 1
              ? (isMobile ? '1.4rem' : '1.85rem')
              : '1.55rem'
          return <motion.article
            key={solution.id}
            role={isActive ? 'group' : 'button'}
            tabIndex={isActive ? -1 : 0}
            aria-current={isActive ? 'true' : undefined}
            aria-label={`${solution.title}${isActive ? ', selected' : ', select solution'}`}
            onClick={() => !isActive && selectManually(index)}
            onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectManually(index) } }}
            initial={false}
            animate={{
              x: position * spacing - renderedCardWidth / 2,
              width: renderedCardWidth,
              y: isActive ? 12 : 27 + distance * 8,
              z: isActive ? 80 : distance === 1 ? 0 : -80,
              rotateY: position * (isMobile ? -6 : distance === 1 ? -10 : -9),
              scale,
              opacity: isActive ? 1 : distance === 1 ? .74 : .4,
              filter: isActive ? 'blur(0px) brightness(1)' : distance === 1 ? 'blur(1px) brightness(.78)' : 'blur(3px) brightness(.62)',
            }}
            whileHover={!isActive ? { scale: scale + .035, opacity: Math.min(1, distance === 1 ? .88 : .55) } : { scale: 1.01 }}
            transition={reducedMotion ? { duration: 0 } : homeSolutionsSpring}
            style={{ left: '50%', top: 0, height: cardHeight, zIndex: 10 - distance, transformStyle: 'preserve-3d' }}
            className={`group absolute cursor-pointer overflow-hidden rounded-2xl border bg-[#061326] shadow-[0_22px_65px_rgba(0,0,0,.55)] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#56AAC6] ${isActive ? 'border-[#56AAC6]/70 shadow-[0_28px_80px_rgba(0,0,0,.6),0_0_30px_rgba(41,155,240,.12)]' : 'border-white/15'}`}
          >
            <img src={solution.image} alt={`${solution.title} solution`} loading={isActive ? 'eager' : 'lazy'} className="absolute inset-0 h-full w-full object-cover transition duration-[1200ms] group-hover:scale-105" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,11,31,.08),rgba(1,11,31,.25)_45%,rgba(1,11,31,.94))]" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-center">
              <p className="font-mono text-[7px] uppercase tracking-[.22em] text-[#56AAC6]">{solution.label}</p>
              <motion.h3 animate={{ fontSize: titleSize }} transition={reducedMotion ? { duration: 0 } : homeSolutionsSpring} className="mt-2 font-serif leading-[.95] text-white">{solution.title}</motion.h3>
              <motion.div animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }} className="overflow-hidden">
                <p className="mx-auto mt-3 max-w-[280px] text-[10px] leading-4 text-[#AFC3DB]">{solution.text}</p>
                <Link to={solution.to} onClick={event => event.stopPropagation()} className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#299BF0]/55 bg-[#010B1F]/70 px-4 py-2 text-[9px] font-bold uppercase tracking-[.08em] text-white backdrop-blur transition hover:border-[#299BF0] hover:bg-[#299BF0] hover:text-[#010B1F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#299BF0]">Explore Solution <HiOutlineArrowRight aria-hidden="true" /></Link>
              </motion.div>
            </div>
          </motion.article>
        })}
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-30 w-[clamp(2rem,9vw,9rem)] bg-gradient-to-r from-[#000816]/85 via-[#000816]/30 to-transparent backdrop-blur-[2px] [mask-image:linear-gradient(to_right,black,rgba(0,0,0,.7)_45%,transparent)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-30 w-[clamp(2rem,9vw,9rem)] bg-gradient-to-l from-[#000816]/85 via-[#000816]/30 to-transparent backdrop-blur-[2px] [mask-image:linear-gradient(to_left,black,rgba(0,0,0,.7)_45%,transparent)]" />
      </motion.div>

      <div className="flex items-center gap-4 bg-[#041126]/88 px-5 py-4 sm:px-7">
        <button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Resume automatic carousel' : 'Pause automatic carousel'} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-[#56AAC6] hover:text-[#56AAC6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#299BF0]">{paused ? <HiOutlinePlay className="h-4 w-4" /> : <HiOutlinePause className="h-4 w-4" />}</button>
        <span className="w-12 shrink-0 font-mono text-[10px] font-semibold text-white">{String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
        <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/15">
          <span key={`${active}-${paused}-${hovered}-${interacting}`} className={`home-solutions-progress absolute inset-y-0 left-0 w-full rounded-full bg-[#56AAC6] ${paused || hovered || interacting ? 'is-paused' : ''}`} />
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => moveManually(-1)} aria-label="Previous solution" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-[#56AAC6] hover:text-[#56AAC6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#299BF0]"><HiOutlineArrowLeft /></button>
          <button type="button" onClick={() => moveManually(1)} aria-label="Next solution" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-[#56AAC6] hover:text-[#56AAC6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#299BF0]"><HiOutlineArrowRight /></button>
        </div>
      </div>
    </div>
  </div>
}

export default function Home() {
  const rootRef = useRef(null)
  const heroVideoRef = useRef(null)
  const [heroMuted, setHeroMuted] = useState(true)
  const [activeVideo, setActiveVideo] = useState(null)
  const [partnersUnderlineVisible, setPartnersUnderlineVisible] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!activeVideo) return undefined
    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow
    const closeOnEscape = event => {
      if (event.key === 'Escape') setActiveVideo(null)
    }
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [activeVideo])

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const context = gsap.context(() => {
      if (!reducedMotion) {
        gsap.fromTo('.home-hero-word > span', { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: .85, stagger: .1, delay: .2, ease: 'power3.out' })
        gsap.fromTo('.home-hero-support', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: .85, stagger: .1, delay: .72, ease: 'power3.out' })
        gsap.utils.toArray('.home-reveal').forEach(element => gsap.fromTo(element, { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 88%', once: true } }))
        gsap.utils.toArray('.home-parallax-image').forEach(image => gsap.fromTo(image, { yPercent: -7, scale: 1.08 }, { yPercent: 7, scale: 1, ease: 'none', scrollTrigger: { trigger: image.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1.2 } }))
      }
    }, rootRef)

    ScrollTrigger.refresh()
    return () => {
      context.revert()
    }
  }, [])

  return <main ref={rootRef} className="home-page-shell overflow-hidden bg-[#000816] text-white">
    <style>{homeStyles}</style>

    <section id="home-hero" className="relative min-h-[100svh] scroll-mt-20 overflow-hidden">
      {/* Full-width hero video with smooth left-panel shade */}
      <div aria-hidden="true" className="absolute inset-0 z-[1] overflow-hidden">
        <video
          ref={heroVideoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{ willChange: 'transform' }}
          className="pointer-events-none absolute inset-0 h-full w-full object-contain object-right"
        >
          <source src="/al-nama-hero.mp4" type="video/mp4" />
        </video>
        {/* Smooth left-panel shade — wide gradient for cinematic fade */}
        <div className="home-hero-video-shade" />
        {/* Top fade behind navbar */}
        <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,#000816_0%,rgba(0,8,22,.7)_5%,rgba(0,8,22,.25)_12%,transparent_20%)]" />
        {/* Bottom vignette */}
        <div className="absolute inset-0 z-10 bg-[linear-gradient(0deg,rgba(1,11,31,.6)_0%,rgba(1,11,31,.2)_8%,transparent_18%)]" />
      </div>

      <div className="home-hero-content container-ems relative z-10 flex min-h-[100svh] items-center pt-28">
        <div className="home-hero-column relative">
          <div className="home-hero-support"><Eyebrow className="home-hero-eyebrow">Engineering Management Systems · Since 2016</Eyebrow></div>
          <div className="relative">
            <div aria-hidden="true" className="pointer-events-none absolute -inset-x-8 -inset-y-6 -z-10 rounded-[2rem] bg-[linear-gradient(90deg,rgba(2,11,24,.18)_0%,rgba(16,42,67,.15)_100%)] blur-2xl" />
            <h1 className="home-hero-title mt-16">
              <span className="home-hero-word"><span className="home-hero-line-primary">Artificial Intelligence</span></span>
              <span className="home-hero-word">
                <span className="home-hero-line-secondary">
                  <span className="home-hero-highlight">Automation</span>{' '}
                  <span className="home-hero-ampersand">&amp;</span>{' '}
                  <span className="home-hero-digitalization">Digitalization</span>
                </span>
              </span>
            </h1>
          </div>
          <p className="home-hero-technologies home-hero-support mt-20">BMS · SCADA · IoT · AI · Digital Twin · Robotics</p>
          <div className="home-hero-actions home-hero-support mt-12 flex flex-wrap gap-3">
            <Link to="/solutions" className="home-hero-action home-hero-primary gap-2">Explore Solutions <HiOutlineArrowRight aria-hidden="true" /></Link>
            <Link to="/projects" className="home-hero-action home-hero-secondary">View Case Studies</Link>
          </div>
          <div className="home-hero-trust home-hero-support mt-10">
            <div className="home-hero-trust-item flex w-fit items-center gap-2 text-[11px] font-semibold text-[#AFC3DB] sm:text-xs">
              <HiOutlineCheckBadge aria-hidden="true" className="h-[17px] w-[17px] shrink-0 text-[#32A9F5]" />
              <span>Siemens Certified Partner</span>
              <img src="/siemens.png" alt="Siemens" className="ml-1 h-3.5 w-auto object-contain" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex"><span className="font-mono text-[8px] uppercase tracking-[.28em] text-white/50">Scroll to explore</span><span className="home-scroll-line relative h-10 w-px overflow-hidden bg-white/15" /></div>
      <div className="absolute bottom-8 right-[max(1.5rem,4vw)] z-10 flex items-center gap-4">
        <button
          type="button"
          onClick={() => {
            const video = heroVideoRef.current
            if (!video) return
            video.muted = !video.muted
            setHeroMuted(video.muted)
          }}
          aria-label={heroMuted ? 'Unmute video' : 'Mute video'}
          className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#010B1F]/60 text-white/70 backdrop-blur-md transition-all duration-300 hover:border-[#32A9F5]/60 hover:bg-[#010B1F]/80 hover:text-white hover:shadow-[0_0_20px_rgba(50,169,245,.15)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#32A9F5]"
        >
          {heroMuted
            ? <HiOutlineSpeakerXMark className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            : <HiOutlineSpeakerWave className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
          }
        </button>
        <span className="hidden font-mono text-[9px] uppercase tracking-[.2em] text-white/45 lg:flex lg:items-center lg:gap-3"><HiOutlinePlay className="text-[#299BF0]" /> Cinematic infrastructure</span>
      </div>
    </section>

    <ServiceCarousel />

    <section id="home-solutions" className="home-major-section relative scroll-mt-20 overflow-hidden bg-[radial-gradient(circle_at_50%_-10%,rgba(35,199,255,.13),transparent_38%),radial-gradient(circle_at_8%_58%,rgba(41,155,240,.12),transparent_32%),radial-gradient(circle_at_92%_72%,rgba(20,88,145,.16),transparent_34%),linear-gradient(145deg,#020b19_0%,#06172b_48%,#03101f_100%)]">
      <div className="home-grid absolute inset-0 opacity-[.14] [mask-image:radial-gradient(ellipse_at_center,black,transparent_76%)]" />
      <div className="pointer-events-none absolute inset-x-[12%] top-0 h-px bg-gradient-to-r from-transparent via-[#23C7FF]/45 to-transparent" />
      <div className="pointer-events-none absolute -left-48 top-1/3 h-96 w-96 rounded-full bg-cyan-500/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-[#299BF0]/10 blur-[120px]" />
      <div className="container-ems relative">
        <div className="flex flex-col items-center text-center"><SectionTitle eyebrow="Solutions" title="Where Engineering Meets Intelligence." text="EMS connects control, data and engineering context so teams can see more clearly and operate with confidence." align="center" /><Link to="/solutions" className="home-reveal mt-6 inline-flex w-fit items-center gap-2 text-xs font-semibold text-[#299BF0] transition hover:gap-3">Explore all solutions <HiOutlineArrowRight /></Link></div>
        <IndustriesAccordionCarousel />
        <div className="hidden">
          {solutionCards.map((solution, index) => <motion.article key={solution.title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .75, delay: (index % 3) * .08, ease }} className="home-solution-card group relative isolate min-h-[280px] overflow-hidden rounded-2xl border border-white/10 bg-[#07182e]">
            <img src={solution.image} alt={solution.title} loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover object-center opacity-80 transition duration-[1200ms] group-hover:scale-105 group-hover:opacity-95" />
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(1,11,31,.18)_0%,rgba(1,11,31,.52)_55%,rgba(1,11,31,.94)_100%)]" />
            <div className="home-solution-content flex h-full min-h-[250px] flex-col justify-end">
              <p className="font-mono text-[9px] uppercase tracking-[.25em] text-[#299BF0]">{String(index + 1).padStart(2, '0')} · {solution.label}</p>
              <h3 className="home-solution-title mt-3 font-serif leading-none">{solution.title}</h3>
              <p className="home-solution-description mt-4 max-w-md translate-y-3 text-[13px] leading-6 text-slate-300 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">{solution.text}</p>
              <Link to="/solutions" className="mt-5 inline-flex w-fit items-center gap-2 text-[11px] font-semibold text-white/80 transition hover:text-[#299BF0]">Discover solution <HiOutlineArrowUpRight /></Link>
            </div>
          </motion.article>)}
        </div>
      </div>
    </section>

    <section id="home-case-studies" className="home-major-section relative scroll-mt-20 overflow-hidden bg-[radial-gradient(circle_at_50%_-10%,rgba(35,199,255,.13),transparent_38%),radial-gradient(circle_at_8%_58%,rgba(41,155,240,.12),transparent_32%),radial-gradient(circle_at_92%_72%,rgba(20,88,145,.16),transparent_34%),linear-gradient(145deg,#020b19_0%,#06172b_48%,#03101f_100%)]">
      <div className="home-grid pointer-events-none absolute inset-0 opacity-[.14] [mask-image:radial-gradient(ellipse_at_center,black,transparent_76%)]" />
      <div className="pointer-events-none absolute inset-x-[12%] top-0 h-px bg-gradient-to-r from-transparent via-[#23C7FF]/45 to-transparent" />
      <div className="home-case-orb pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-[#299BF0]/15 blur-[110px]" />
      <div className="home-case-orb is-delayed pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-[#23C7FF]/10 blur-[125px]" />
      <div className="home-case-orb pointer-events-none absolute left-1/2 top-[42%] h-64 w-[34rem] -translate-x-1/2 rounded-full bg-[#2463a2]/10 blur-[115px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-[36%] h-72 w-72 rotate-12 rounded-[3rem] border border-[#299BF0]/10" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 top-[14%] h-64 w-64 -rotate-12 rounded-full border border-[#23C7FF]/10" />
      <div aria-hidden="true" className="home-data-particle pointer-events-none absolute left-[12%] top-[22%] h-1.5 w-1.5 rounded-full bg-[#23C7FF]/60 shadow-[0_0_16px_rgba(35,199,255,.65)]" />
      <div aria-hidden="true" className="home-data-particle pointer-events-none absolute right-[17%] top-[42%] h-1 w-1 rounded-full bg-[#299BF0]/70 shadow-[0_0_14px_rgba(41,155,240,.7)] [animation-delay:-1.8s]" />
      <div aria-hidden="true" className="home-data-particle pointer-events-none absolute bottom-[18%] left-[46%] h-1 w-1 rounded-full bg-[#23C7FF]/55 shadow-[0_0_12px_rgba(35,199,255,.6)] [animation-delay:-3.2s]" />
      <div className="container-ems relative">
        <div className="flex flex-col items-center text-center"><SectionTitle eyebrow="Case studies" title="Complex Systems. Clear Results." text="Selected EMS applications show how complex infrastructure becomes a clearer, connected operating environment." align="center" /><Link to="/projects" className="home-reveal mt-6 inline-flex w-fit items-center gap-2 text-xs font-semibold text-[#299BF0] transition hover:gap-3">View all case studies <HiOutlineArrowRight /></Link></div>
        <div className="mx-auto mt-8 grid w-full max-w-[1400px] gap-4 md:grid-cols-2 xl:grid-cols-3">
          {homeCaseStudies.map((project, index) => <motion.article key={project.id} initial={reducedMotion ? false : { opacity: 0, y: 34, scale: .96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .75, delay: (index % 3) * .12, ease }} className="home-case-card group relative flex min-h-[500px] flex-col overflow-hidden rounded-2xl border border-[rgba(74,169,220,0.28)] bg-[radial-gradient(circle_at_0%_0%,rgba(74,169,220,.16),transparent_40%),linear-gradient(135deg,#183E5D_0%,#12324B_50%,#081B30_100%)] shadow-[0_20px_40px_rgba(0,0,0,.35)] transition-all duration-500 ease-out md:hover:-translate-y-2 md:hover:border-[rgba(74,169,220,0.5)] md:hover:bg-[radial-gradient(circle_at_0%_0%,rgba(74,169,220,.24),transparent_42%),linear-gradient(135deg,#183E5D_0%,#12324B_50%,#081B30_100%)] md:hover:shadow-[0_26px_54px_rgba(0,0,0,.4),0_0_30px_rgba(74,169,220,.22)]">
            <span aria-hidden="true" className="home-case-glow pointer-events-none absolute -right-24 -top-24 z-10 h-64 w-64 rounded-full bg-[#23C7FF]/20 blur-[80px]" />
            <span aria-hidden="true" className="home-case-accent pointer-events-none absolute inset-x-0 top-0 z-30 h-[2px] bg-gradient-to-r from-transparent via-[#23C7FF] to-transparent" />
            <span aria-hidden="true" className="home-case-sweep pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(115deg,transparent_40%,rgba(148,224,255,.14)_50%,transparent_60%)] transition-transform duration-[1400ms] ease-out mix-blend-screen md:group-hover:translate-x-full" />
            <header className="home-case-copy relative z-20 min-h-[122px] px-4 py-5 sm:px-5">
              <h3 className="font-serif text-[clamp(1.25rem,1.55vw,1.65rem)] leading-[1.12] text-white">{project.name}</h3>
              <p className="mt-2 text-[11px] font-semibold text-[#23C7FF] sm:text-xs">{project.location}</p>
            </header>
            <div className="relative aspect-video shrink-0 overflow-hidden bg-[#071326]">
              {project.videoSrc
                ? <button
                    type="button"
                    onClick={() => setActiveVideo(project)}
                    onMouseEnter={event => {
                      const video = event.currentTarget.querySelector('video')
                      video?.play().catch(() => undefined)
                    }}
                    onMouseLeave={event => {
                      const video = event.currentTarget.querySelector('video')
                      if (!video) return
                      video.pause()
                      if (project.poster) {
                        video.load()
                        return
                      }
                      if (Number.isFinite(video.duration)) video.currentTime = Math.min(1, Math.max(.2, video.duration * .02))
                    }}
                    onFocus={event => event.currentTarget.querySelector('video')?.play().catch(() => undefined)}
                    onBlur={event => {
                      const video = event.currentTarget.querySelector('video')
                      if (!video) return
                      video.pause()
                      if (project.poster) video.load()
                    }}
                    aria-label={`Preview ${project.name} video; click to open the large video player`}
                    className="group/video relative block h-full w-full cursor-pointer overflow-hidden bg-[#071326] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#23C7FF]"
                  >
                    <video
                      key={`${project.videoSrc}-dashboard-preview`}
                      src={project.videoSrc}
                      poster={project.poster}
                      preload="metadata"
                      muted
                      loop
                      playsInline
                      aria-hidden="true"
                      onLoadedMetadata={event => {
                        const video = event.currentTarget
                        if (project.poster) return
                        if (video.dataset.previewReady) return
                        video.dataset.previewReady = 'true'
                        video.currentTime = Number.isFinite(video.duration) ? Math.min(1, Math.max(.2, video.duration * .02)) : 1
                      }}
                      className={`home-case-media pointer-events-none absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[1200ms] ease-out md:group-hover:scale-[1.06] ${project.id === 'smart-hospital' ? 'scale-[1.025]' : ''} ${project.id === 'industrial-scada-system' ? 'scale-[1.02]' : ''}`}
                    >
                      Your browser does not support the video element.
                    </video>
                    <span className="absolute inset-0 bg-[#010B1F]/[.04] transition duration-300 group-hover/video:bg-transparent" />
                    <span className="home-case-play pointer-events-none absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-[#010B1F]/80 text-white shadow-[0_12px_35px_rgba(0,0,0,.4)] backdrop-blur transition-all duration-300 md:group-hover/video:scale-110 md:group-hover/video:shadow-[0_0_22px_rgba(34,211,238,.6)] group-hover/video:scale-90 group-hover/video:opacity-0 group-focus-visible/video:scale-90 group-focus-visible/video:opacity-0"><HiOutlinePlay className="ml-0.5 h-6 w-6" /></span>
                  </button>
                : project.videoId
                  ? <iframe src={`https://www.youtube-nocookie.com/embed/${project.videoId}?rel=0`} title={`${project.name} project video`} loading="lazy" className="h-full w-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                  : <><img src={project.image} alt={`${project.name} — ${project.location}`} loading="lazy" className="home-case-media h-full w-full object-cover transition-transform duration-[1200ms] ease-out md:group-hover:scale-[1.06]" /><div className="absolute inset-0 bg-gradient-to-t from-[#071326] via-[#071326]/10 to-transparent" /></>}
              {!project.videoSrc && !project.videoId && <span className="absolute bottom-4 left-5 rounded-full border border-white/15 bg-[#061326]/75 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[.18em] text-[#299BF0] backdrop-blur-xl">{project.industry}</span>}
            </div>
            <div className="home-case-copy relative z-20 flex flex-1 flex-col p-4 sm:p-5">
              <p className="text-[11px] leading-5 text-slate-400 sm:text-[12px]">{project.description}</p>
              <div className="mt-4 space-y-1.5 border-t border-white/10 pt-4">
                {project.highlights.map(highlight => <p key={highlight} className="text-[11px] font-semibold text-[#23C7FF]">{highlight}</p>)}
              </div>
              <Link to={`/projects/${project.id}`} className="mt-auto inline-flex w-fit items-center gap-2 pt-5 text-[11px] font-semibold text-[#AFC3DB] transition hover:gap-3 hover:text-[#32A9F5] focus-visible:text-[#32A9F5]">Read the full story <HiOutlineArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
            </div>
          </motion.article>)}
        </div>
      </div>
    </section>

    <section id="home-about" className="home-major-section relative scroll-mt-20 overflow-hidden border-t border-white/10 bg-[radial-gradient(circle_at_50%_-10%,rgba(35,199,255,.13),transparent_38%),radial-gradient(circle_at_8%_58%,rgba(41,155,240,.12),transparent_32%),radial-gradient(circle_at_92%_72%,rgba(20,88,145,.16),transparent_34%),linear-gradient(145deg,#020b19_0%,#06172b_48%,#03101f_100%)]">
      <div className="home-grid pointer-events-none absolute inset-0 opacity-[.14] [mask-image:radial-gradient(ellipse_at_center,black,transparent_76%)]" />
      <div className="pointer-events-none absolute inset-x-[12%] top-0 h-px bg-gradient-to-r from-transparent via-[#23C7FF]/45 to-transparent" />
      <div className="home-case-orb pointer-events-none absolute -left-36 top-24 h-80 w-80 rounded-full bg-[#299BF0]/12 blur-[120px]" />
      <div className="home-case-orb is-delayed pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-[#14678b]/12 blur-[150px]" />

      <div className="container-ems relative">
        <div className="mx-auto max-w-5xl text-center">
          <div className="home-reveal home-about-intro">
            <Eyebrow>About EMS</Eyebrow>
            <p className="mx-auto mt-6 max-w-4xl text-[clamp(.9rem,1.3vw,1.08rem)] leading-8 text-slate-300">EMS delivers integrated MEP, automation and smart infrastructure solutions that connect buildings, operations and technology across Egypt, England and the GCC.</p>
          </div>
        </div>

        <div className="relative mx-auto mt-14 max-w-[1450px] lg:mt-16">
          <span className="absolute left-5 right-5 top-[17px] hidden h-px bg-gradient-to-r from-transparent via-[#299BF0]/55 to-transparent md:block" />
          <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
            {aboutMilestones.map(([title, text, Icon], index) => (
              <motion.article key={title} initial={{ opacity: 0, y: 24, scale: .97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: '-50px' }} whileHover={{ y: -6, scale: 1.01 }} transition={{ duration: .6, delay: index * .09, ease }} className="group relative pt-0 md:pt-8">
                <span className="relative z-10 mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-[#299BF0]/50 bg-[#041126] text-[#23C7FF] shadow-[0_0_25px_rgba(41,155,240,.2)] md:absolute md:left-0 md:top-0">
                  <Icon aria-hidden="true" className="h-5 w-5 transition duration-300 group-hover:scale-110" />
                </span>
                <div className="h-full min-h-36 rounded-2xl border border-white/[.04] bg-[#07182e]/80 p-6 transition duration-500 group-hover:border-[#299BF0]/30 group-hover:bg-[#0B2548]/75 group-hover:shadow-[0_20px_45px_rgba(0,0,0,.2)]">
                  <h3 className="text-sm font-bold text-[#23C7FF]">{title}</h3>
                  <p className="mt-1.5 text-[12px] leading-[1.55] text-slate-400">{text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-[1450px] gap-8 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <motion.article initial={{ opacity: 0, x: -24, scale: .98 }} whileInView={{ opacity: 1, x: 0, scale: 1 }} viewport={{ once: true, margin: '-60px' }} whileHover={{ y: -6, scale: 1.01 }} transition={{ duration: .7, ease }} className="group relative isolate overflow-hidden rounded-2xl border border-[#299BF0]/25 bg-[linear-gradient(135deg,#0B2548_0%,#07182e_72%)] p-7 transition-shadow duration-500 hover:shadow-[0_24px_60px_rgba(0,0,0,.24)] sm:p-8 lg:col-span-6">
            <span className="absolute -right-2 -top-10 -z-10 font-serif text-[9rem] leading-none text-white/[.025]">01</span>
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#23C7FF]/25 bg-[#23C7FF]/10 text-[#23C7FF]"><HiOutlineCheckBadge className="h-5 w-5" /></span>
              <span className="font-mono text-[8px] uppercase tracking-[.22em] text-slate-500">Our purpose</span>
            </div>
            <h3 className="mt-5 font-serif text-[clamp(1.65rem,2.35vw,2.2rem)]">Our Mission</h3>
            <p className="mt-3 max-w-xl text-[13px] leading-6 text-slate-300">Analyze customer needs without compromising satisfaction—delivering economical, fast and high-quality solutions through full-scope MEP works and modern technologies.</p>
            <Link to="/about" className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold text-[#23C7FF] transition hover:gap-3 hover:text-white">Read our story <HiOutlineArrowUpRight /></Link>
          </motion.article>

          <motion.article initial={{ opacity: 0, x: 24, scale: .98 }} whileInView={{ opacity: 1, x: 0, scale: 1 }} viewport={{ once: true, margin: '-60px' }} whileHover={{ y: -6, scale: 1.01 }} transition={{ duration: .7, delay: .08, ease }} className="group relative isolate overflow-hidden rounded-2xl border border-[#299BF0]/25 bg-[linear-gradient(135deg,#07182e_0%,#0B2548_100%)] p-7 transition-shadow duration-500 hover:shadow-[0_24px_60px_rgba(0,0,0,.24)] sm:p-8 lg:col-span-6">
            <span className="absolute -right-2 -top-10 -z-10 font-serif text-[9rem] leading-none text-white/[.025]">02</span>
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#23C7FF]/25 bg-[#23C7FF]/10 text-[#23C7FF]"><HiOutlineEye className="h-5 w-5" /></span>
              <span className="font-mono text-[8px] uppercase tracking-[.22em] text-slate-500">Our direction</span>
            </div>
            <h3 className="mt-5 font-serif text-[clamp(1.65rem,2.35vw,2.2rem)]">Our Vision</h3>
            <p className="mt-3 max-w-xl text-[13px] leading-6 text-slate-300">Be a distinctive and independent MEP provider delivering modern, highly professional services across complete MEP requirements and the latest technologies.</p>
            <Link to="/about" className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold text-[#23C7FF] transition hover:gap-3 hover:text-white">Explore our direction <HiOutlineArrowUpRight /></Link>
          </motion.article>
        </div>

        <div className="mx-auto mt-16 max-w-[1450px] lg:mt-20">
          <p className="mx-auto max-w-4xl text-center text-[clamp(1rem,1.5vw,1.3rem)] leading-relaxed text-[#AFC3DB]">Meet the visionary behind EMS&apos;s innovative smart infrastructure solutions.</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .75, ease }} className="mx-auto mt-10 grid max-w-[1450px] items-center gap-12 lg:grid-cols-[.92fr_1.08fr] lg:gap-16">
          <section className="px-2 sm:px-4">
            <div className="relative w-fit">
              <img src="/ahmed-elzayat.jpeg" alt="Ahmed Elzayat, CEO and Founder of EMS" loading="lazy" className="h-52 w-52 rounded-full border-4 border-[#299BF0]/35 object-cover object-top shadow-[0_20px_55px_rgba(0,0,0,.35)] sm:h-56 sm:w-56" />
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#299BF0]/40 bg-[#299BF0] px-4 py-2 text-[11px] font-bold uppercase tracking-[.08em] text-[#010B1F] shadow-lg">CEO &amp; Founder</span>
            </div>
            <h3 className="mt-9 font-sans text-[clamp(1.55rem,2.2vw,2rem)] font-bold text-white">Eng. Ahmed El-Zayat</h3>
            <p className="mt-4 max-w-2xl text-[clamp(.85rem,1.1vw,1rem)] leading-7 text-[#AFC3DB]">With over 15 years of experience in IoT and AI technologies, Engineer Ahmed El-Zayat has led EMS to become a pioneer in smart infrastructure solutions. His vision is to transform how organizations operate through innovative technology integration.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="https://www.facebook.com/share/1LkNgGndZa/?mibextid=wwXIfr" target="_blank" rel="noreferrer" className="brand-gradient-button rounded-lg px-5 py-3 text-[12px] font-semibold">View Facebook Profile</a>
              <a href="https://eg.linkedin.com/in/ahmed-elzayat-a8325b41" target="_blank" rel="noreferrer" className="rounded-lg border border-[#299BF0] px-5 py-3 text-[12px] font-semibold text-[#299BF0] transition hover:bg-[#299BF0] hover:text-[#010B1F]">Connect on LinkedIn</a>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-[#299BF0]/25 bg-[#07182e] shadow-[0_28px_80px_rgba(0,0,0,.24)] transition duration-500 hover:-translate-y-1 hover:border-[#299BF0]/45 hover:shadow-[0_32px_90px_rgba(0,0,0,.3)]">
            <div className="p-6 sm:px-7 sm:py-6">
              <h3 className="font-sans text-[clamp(1.3rem,1.8vw,1.65rem)] font-bold text-white">Featured Podcast</h3>
              <p className="mt-2 text-[clamp(.84rem,1.05vw,.98rem)] leading-6 text-[#AFC3DB]">Engineer Ahmed El-Zayat discusses the significance of Artificial Intelligence in enhancing and improving our daily lives in a special podcast episode.</p>
            </div>
            <div className="overflow-hidden border-t border-[#299BF0]/25 bg-[#041126]">
              <video
                title="Ahmed Elzayat featured podcast about artificial intelligence"
                src="/CBC%20TALK.mp4"
                controls
                autoPlay
                muted
                preload="metadata"
                playsInline
                className="aspect-video w-full bg-black object-contain"
              >
                Your browser does not support the video element.
              </video>
            </div>
          </section>
        </motion.div>

        <div className="relative mx-auto mt-20 max-w-[1250px] lg:mt-24">
          <div aria-hidden="true" className="home-partners-aura pointer-events-none absolute inset-x-[14%] top-8 h-32 rounded-full bg-[linear-gradient(90deg,rgba(41,155,240,.16),rgba(35,199,255,.12),rgba(33,211,184,.13))] blur-[70px]" />
          <div className="home-reveal text-center">
            <button
              type="button"
              aria-pressed={partnersUnderlineVisible}
              onClick={() => setPartnersUnderlineVisible(visible => !visible)}
              className="home-partners-title rounded-sm font-mono text-[clamp(1.1rem,1.8vw,1.55rem)] font-extrabold uppercase tracking-[.22em] outline-none focus-visible:ring-2 focus-visible:ring-[#299BF0] focus-visible:ring-offset-4 focus-visible:ring-offset-[#041126]"
            >
              Our Partners
            </button>
            <span
              aria-hidden="true"
              className={`mx-auto mt-4 block h-0.5 rounded-full bg-gradient-to-r from-[#299BF0] via-[#23C7FF] to-[#21D3B8] transition-[width,opacity] duration-500 ${partnersUnderlineVisible ? 'w-24 opacity-100' : 'w-12 opacity-60'}`}
            />
          </div>

          <div className="relative mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-5 sm:grid-cols-4 sm:gap-6 lg:gap-8">
            {featuredPartners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 22, scale: .94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                whileHover={{ y: -6, scale: 1.035 }}
                transition={{ duration: .55, delay: index * .08, ease }}
                className="home-partner-logo-card flex h-24 items-center justify-center rounded-2xl px-5 sm:h-28"
              >
                <img src={partner.logo} alt={`${partner.name} logo`} loading="lazy" className={`relative z-10 h-8 w-28 object-contain opacity-90 transition-opacity hover:opacity-100 sm:h-9 sm:w-32 ${partner.id === 'oracle' ? 'scale-[2.35]' : ''}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <AnimatePresence>
      {activeVideo && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${activeVideo.name} video player`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: .25 }}
          onMouseDown={() => setActiveVideo(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 p-3 backdrop-blur-sm sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: .94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: .96, y: 10 }}
            transition={{ duration: .3, ease }}
            onMouseDown={event => event.stopPropagation()}
            className="relative w-[96vw] max-w-[1700px]"
          >
            <button type="button" autoFocus onClick={() => setActiveVideo(null)} aria-label="Close video" className="absolute right-2 top-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-[#010B1F]/85 text-white shadow-lg backdrop-blur transition hover:border-white/60 hover:bg-[rgb(33,124,154)] sm:-right-3 sm:-top-3">
              <HiOutlineXMark className="h-6 w-6" />
            </button>
            <video key={activeVideo.videoSrc} src={activeVideo.videoSrc} controls autoPlay preload="auto" playsInline className="max-h-[88vh] w-full rounded-xl border border-white/10 bg-black object-contain shadow-[0_30px_100px_rgba(0,0,0,.65)]">Your browser does not support the video element.</video>
            <p className="mt-3 text-center text-xs font-semibold text-white/80">{activeVideo.name} · {activeVideo.location}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </main>
}
