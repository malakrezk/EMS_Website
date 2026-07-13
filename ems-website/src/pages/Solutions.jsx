import PageHeader from '../components/ui/PageHeader'
import Industries from '../components/home/Industries'
import DashboardPreview from '../components/home/DashboardPreview'

export default function Solutions() {
  return (
    <>
      <PageHeader
        eyebrow="Solutions"
        title="Solutions engineered for every sector of the grid"
        description="Whichever industry you operate in, our solutions are shaped around your network's reliability, safety, and compliance requirements."
      />
      <Industries />
      <DashboardPreview />
    </>
  )
}
