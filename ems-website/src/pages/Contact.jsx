import PageHeader from '../components/ui/PageHeader'
import ContactSection from '../components/home/ContactSection'

export default function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Start the conversation"
        description="Whether you're planning a new SCADA deployment or need support on an existing system, our team is ready to help."
      />
      <ContactSection />
    </>
  )
}
