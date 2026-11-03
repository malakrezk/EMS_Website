import { HiOutlineArrowRight } from 'react-icons/hi2'
import AppButton from '../../../components/common/AppButton'
import Container from '../../../components/layout/Container'
import Reveal from '../../../components/ui/Reveal'
import { contact } from '../IoT.data'

export default function IoTContact() {
  return <section className="iot-contact" aria-labelledby="iot-contact-title">
    <Container className="iot-contact-layout">
      <Reveal><h2 id="iot-contact-title" className="iot-heading">{contact.title}</h2></Reveal>
      <Reveal delay={.12}>
        <p className="iot-contact-question">{contact.question}</p>
        <p>{contact.text}</p>
        <div className="iot-actions">
          <AppButton to="/contact">{contact.cta} <HiOutlineArrowRight aria-hidden="true" /></AppButton>
        </div>
      </Reveal>
    </Container>
  </section>
}
