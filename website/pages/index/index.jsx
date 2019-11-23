import './style.css'
import Hero from '@hashicorp/react-hero'
import SectionHeader from '@hashicorp/react-section-header'
import Callouts from '@hashicorp/react-callouts'
import LinkedTextSummaryList from '@hashicorp/react-linked-text-summary-list'
import Button from '@hashicorp/react-button'
import SplitCta from '@hashicorp/react-split-cta'
import Link from 'next/link'
import { fetch } from '@hashicorp/nextjs-scripts/dato/client'
import query from './query.graphql'

export default function IndexPage(data) {
  return (
    <div id="p-index">
      <Hero data={data.hero} />
      <section id="use-cases" className="g-container padded">
        <SectionHeader {...data.useCasesHeadline} />
        <Callouts {...data.useCasesCallouts[0]} />
      </section>
      <section id="docs-summary" className="g-container padded">
        <SectionHeader {...data.documentationHeadline} />
        <LinkedTextSummaryList
          Link={Link}
          data={[
            {
              description: 'Installing Vault and Vault Enterprise.',
              link: '/docs/install',
              title: 'Installing Vault'
            },
            {
              description:
                "Technical details about Vault's architecture, cryptographic components, and security model.",
              link: '/docs/internals',
              title: 'Internals'
            },
            {
              description:
                'Foundational concepts critical to understanding how Vault operates.',
              link: '/docs/concepts',
              title: 'Concepts'
            },
            {
              description:
                'Managing Vault via its Command Line Interface (CLI).',
              link: '/docs/commands',
              title: 'Commands (CLI)'
            },
            {
              description:
                'Deploying Vault systems and configuring components such as storage and unseal interfaces.',
              link: '/docs/configuration',
              title: 'Configuration'
            },
            {
              description:
                'Configuring the Vault binary as a client daemon for performing security operations.',
              link: '/docs/agent',
              title: 'Vault Agent'
            },
            {
              description:
                'Engines for performing security operations using secrets stored within Vault.',
              link: '/docs/secrets',
              title: 'Secret Engines'
            },
            {
              description:
                'Methods for configuring how users and applications authenticate into Vault.',
              link: '/docs/auth',
              title: 'Auth Methods'
            },
            {
              description:
                'Devices for capturing audit logs monitoring activity within Vault.',
              link: '/docs/audit',
              title: 'Audit Devices'
            },
            {
              description:
                'Configuring how Vault operates with external systems and applications via plugins.',
              link: '/docs/plugin',
              title: 'Plugin Backends'
            },
            {
              description:
                "Topics related to Vault Enterprise, Vault's premium varient for professional teams and organizations.",
              link: '/docs/enterprise',
              title: 'Vault Enterprise'
            }
          ]}
        />
      </section>
      <section id="features" className="padded">
        <div className="g-container">
          <SectionHeader {...data.featuresHeadline} />
          <div className="buttons">
            {data.featuresButtons.buttons.map(button => (
              <Button {...button} key={button.title} />
            ))}
          </div>
        </div>
      </section>
      <section id="oss-enterprise">
        <SplitCta data={data.ossEnterpriseCtas.items} />
      </section>
    </div>
  )
}

export async function unstable_getStaticProps() {
  const { vaultOssPage } = await fetch({
    query,
    dependencies: [Hero, SectionHeader, SplitCta, Callouts]
  })
  return { props: vaultOssPage }
}
