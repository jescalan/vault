import './style.css'
import App from 'next/app'
import NProgress from 'nprogress'
import Router from 'next/router'
import DefaultHeadTags from '../components/default-head-tags'
import MegaNav from '@hashicorp/react-mega-nav'
import Footer from '@hashicorp/react-footer'
import ProductSubnav from '@hashicorp/react-product-subnav'
import { ConsentManager } from '@hashicorp/react-consent-manager'
import consentManagerConfig from '../lib/consent-manager-config'
import { fetch } from '@hashicorp/nextjs-scripts/dato/client'
import globalDataQuery from './globalData.graphql'
import bugsnagClient from '../lib/bugsnag'
import Error from './_error'
import Link from 'next/link'

/*
 * We are capturing certain actions to be performed in DatoCMS prior to publish.
 * For now, we can mock these out with simple function calls
 * as to not cause current production issues
 * Each change is appended with `- [ ]` (checkmark) task
 */
const _pipe = (a, b) => arg => b(a(arg))
const pipe = (...fns) => fns.reduce(_pipe)

const renameAndUpdateOverviewLink = data => {
  // - [ ] change first link title from 'Overview' to 'Intro'
  data.tdmFocusedLinks[0].title = 'Intro'
  // - [ ] change first link url to '/intro'
  data.tdmFocusedLinks[0].url = '/intro'

  return data
}

const updateUseCases = data => {
  // - [ ] add Identity-based Access use case
  data.tdmFocusedLinks[1].links[2] = {
    external: false,
    title: 'Identity-based Access',
    url: '/use-cases/identity-based-access'
  }
  // - [ ] update Secrets Management use case url
  data.tdmFocusedLinks[1].links[0].url = '/use-cases/secrets-management'
  // - [ ] update Data Encryption use case url
  data.tdmFocusedLinks[1].links[1].url = '/use-cases/data-encryption'

  return data
}

const __mockCmsChanges = pipe(renameAndUpdateOverviewLink, updateUseCases)
/* End of mocked DatoCMS-related actions */

Router.events.on('routeChangeStart', NProgress.start)
Router.events.on('routeChangeError', NProgress.done)
Router.events.on('routeChangeComplete', url => {
  setTimeout(() => window.analytics.page(url), 0)
  NProgress.done()
})

// Bugsnag
const ErrorBoundary = bugsnagClient.getPlugin('react')

class NextApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    } else if (Component.isMDXComponent) {
      // fix for https://github.com/mdx-js/mdx/issues/382
      const mdxLayoutComponent = Component({}).props.originalType
      if (mdxLayoutComponent.getInitialProps) {
        pageProps = await mdxLayoutComponent.getInitialProps(ctx)
      }
    }

    const globalData = await fetch({
      query: globalDataQuery,
      dependencies: [ProductSubnav, MegaNav],
      variables: { productId: '85509' } // product id for vault in dato
    })

    return { pageProps, globalData, path: ctx.asPath }
  }

  render() {
    const { Component, pageProps, globalData, path } = this.props

    return (
      <ErrorBoundary FallbackComponent={Error}>
        <DefaultHeadTags globalData={globalData} />
        <MegaNav
          data={globalData.megaNav}
          title="Vault Documentation"
          homeUrl="https://www.hashicorp.com"
          titleUrl="https://vaultproject.io"
        />
        <ProductSubnav
          Link={Link}
          dark={false}
          /* Remove call to __mockCmsChanges before production release */
          subnav={__mockCmsChanges(globalData.productSubnav)}
          products={globalData.allEnterpriseProducts}
          currentPath={path}
          rootUrl="vaultproject.io"
        />
        <Component {...pageProps} />
        <Footer data={globalData.globalFooter} />
        <ConsentManager {...consentManagerConfig} />
      </ErrorBoundary>
    )
  }
}

export default NextApp
