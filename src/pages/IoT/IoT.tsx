import { useEffect } from 'react'
import PageBackground from '../../components/common/PageBackground'
import IoTApproach from './components/IoTApproach'
import IoTContact from './components/IoTContact'
import IoTHero from './components/IoTHero'
import IoTIndustries from './components/IoTIndustries'
import IoTIntegrations from './components/IoTIntegrations'
import IoTIntro from './components/IoTIntro'
import IoTServices from './components/IoTServices'
import IoTWhy from './components/IoTWhy'
import './IoT.css'

export default function IoT() {
  useEffect(() => {
    const previousTitle = document.title
    const previousDescription = document.querySelector('meta[name="description"]')
    const oldContent = previousDescription?.getAttribute('content')
    const description = previousDescription ?? document.createElement('meta')
    description.setAttribute('name', 'description')
    description.setAttribute('content', 'EMS IoT solutions connect physical assets, sensors, control systems and operational platforms across smart buildings, water infrastructure and industrial facilities in Egypt, Saudi Arabia and Oman.')
    if (!previousDescription) document.head.append(description)
    const canonical = document.createElement('link')
    canonical.rel = 'canonical'
    canonical.href = 'https://www.ems-me.com/services/iot'
    document.head.append(canonical)
    document.title = 'IoT Solutions for Smart Buildings and Infrastructure | EMS'
    return () => {
      document.title = previousTitle
      if (!previousDescription) description.remove()
      else if (oldContent !== null && oldContent !== undefined) description.setAttribute('content', oldContent)
      else description.removeAttribute('content')
      canonical.remove()
    }
  }, [])

  return <div className="iot-page engineering-page-background text-white">
    <PageBackground />
    <IoTHero />
    <IoTIntro />
    <IoTServices />
    <IoTIndustries />
    <IoTIntegrations />
    <IoTApproach />
    <IoTWhy />
    <IoTContact />
  </div>
}
