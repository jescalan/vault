import VerticalTextBlockList from '@hashicorp/react-vertical-text-block-list'
import SectionHeader from '@hashicorp/react-section-header'
import Head from 'next/head'

function CommunityPage() {
  return (
    <div id="community">
      <Head>
        <title key="title">Community | Vault by HashiCorp</title>
      </Head>
      <SectionHeader
        headline="Community"
        description="Vault is an open source project with a growing community. There are active, dedicated users willing to help you through various mediums."
        use_h1={true}
      />
      <VerticalTextBlockList
        data={[
          {
            header: 'IRC',
            body: '`#vault-tool` on Freenode'
          },
          {
            header: 'Announcement List',
            body:
              '[HashiCorp Announcement Google Group](https://groups.google.com/group/hashicorp-announce)'
          },
          {
            header: 'Discussion List',
            body:
              '[Vault Google Group](https://groups.google.com/group/vault-tool)'
          },
          {
            header: 'Bug Tracker',
            body:
              '[Issue tracker on GitHub](https://github.com/hashicorp/vault/issues) for reporting bugs. Use IRC or the mailing list for general help.'
          },
          {
            header: 'Training',
            body:
              '[Paid HashiCorp](https://www.hashicorp.com/training.html) training courses are available in a city near you. Private training courses are also available.'
          }
        ]}
      />
    </div>
  )
}

export default CommunityPage
