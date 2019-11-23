import './style.css'
import fetch from 'isomorphic-unfetch'
import { VERSION } from '../../data/version.js'
import ProductDownloader from '@hashicorp/react-product-downloader'
import Head from 'next/head'

export default function DownloadsPage({ downloadData }) {
  return (
    <div id="p-downloads" class="g-container">
      <Head>
        <title key="title">Downloads | Vault by HashiCorp</title>
      </Head>
      <ProductDownloader
        product="Vault"
        version={VERSION}
        downloads={downloadData}
      />
    </div>
  )
}

DownloadsPage.getInitialProps = () => {
  return fetch(`https://releases.hashicorp.com/vault/${VERSION}/index.json`)
    .then(r => r.json())
    .then(r => {
      // TODO: restructure product-downloader to run this logic internally
      return r.builds.reduce((acc, build) => {
        if (!acc[build.os]) acc[build.os] = {}
        acc[build.os][build.arch] = build.url
        return acc
      }, {})
    })
    .then(r => ({ downloadData: r }))
}