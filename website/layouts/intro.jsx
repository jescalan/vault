import IntroPage, { getInitialProps } from '../components/intro-page'
import orderData from '../data/intro-navigation.js'
import { frontMatter } from '../pages/intro/**/*.mdx'

function IntroLayoutWrapper(pageMeta) {
  function IntroLayout(props) {
    return (
      <IntroPage
        {...props}
        orderData={orderData}
        frontMatter={frontMatter}
        category="intro"
        pageMeta={pageMeta}
      />
    )
  }

  IntroLayout.getInitialProps = getInitialProps

  return IntroLayout
}

export default IntroLayoutWrapper
