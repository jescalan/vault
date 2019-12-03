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
          subnav={globalData.productSubnav}
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
