import PageHeader from '../components/ui/PageHeader'
import ContactSection from '../components/home/ContactSection'

export default function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Start the conversation"
        description="Talk to EMS about connecting BMS, SCADA, IoT, AI and digital operations through the ZETA platform."
      />
      <ContactSection />
    </>
  )
}
