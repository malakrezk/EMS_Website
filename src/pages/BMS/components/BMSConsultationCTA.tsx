import { HiOutlineArrowRight } from 'react-icons/hi2'
import AppButton from '../../../components/common/AppButton'
import Container from '../../../components/layout/Container'
import Reveal from '../../../components/ui/Reveal'

export default function BMSConsultationCTA() {
  return <section className="bms-consultation" aria-labelledby="bms-cta-title"><div className="bms-cta-wireframe" aria-hidden="true" /><Container><Reveal><p className="bms-label">LET’S CONNECT YOUR BUILDING</p><h2 id="bms-cta-title">Ready to Build <span>Smarter?</span></h2><p>Planning a new building automation project or upgrading an existing BMS?</p><p>Contact EMS to discuss your project requirements, technical scope, and integration objectives.</p><AppButton to="/contact">Request a BMS Project Consultation <HiOutlineArrowRight aria-hidden="true" /></AppButton><div className="bms-regions">Egypt <span>·</span> Saudi Arabia <span>·</span> Oman</div></Reveal></Container></section>
}
