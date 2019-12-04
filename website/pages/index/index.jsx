import './style.css'
import Hero from '@hashicorp/react-hero'
import SectionHeader from '@hashicorp/react-section-header'
import UseCases from '@hashicorp/react-use-cases'
import TextAndContent from '@hashicorp/react-text-and-content'
import Button from '@hashicorp/react-button'
import { fetch } from '@hashicorp/nextjs-scripts/dato/client'
import BeforeAfterDiagram from '../../components/BeforeAfterDiagram'
import query from './query.graphql'

export default function IndexPage(data) {
  return (
    <div id="p-index">
      <Hero data={data.hero} />
      <section className="g-container padded">
        <SectionHeader {...data.infrastructureHeadline} />
        <BeforeAfterDiagram {...data.infrastructureDiagram} />
      </section>
      <section className="g-container padded">
        <UseCases {...data.useCases} />
      </section>
      <section className="g-container padded">
        <SectionHeader {...data.principlesHeadline} />
        {data.principles.map(x => (
          <TextAndContent key={x.text} data={x} />
        ))}
      </section>
      <section className="g-container padded">
        <SectionHeader {...data.openSourceHeadline} />
        <Button
          title={data.openSourceCta.buttonText}
          url={data.openSourceCta.url}
        />
      </section>
    </div>
  )
}

export async function unstable_getStaticProps() {
  const { vaultOssPage } = await fetch({
    query,
    dependencies: [
      Hero,
      SectionHeader,
      BeforeAfterDiagram,
      UseCases,
      TextAndContent
    ]
  })
  return { props: vaultOssPage }
}
