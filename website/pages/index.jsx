import IndexPage, {
  unstable_getStaticProps as staticProps
} from './index/index'
export default IndexPage
export async function unstable_getStaticProps() {
  return staticProps()
}
