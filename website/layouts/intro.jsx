export default function IntroLayoutWrapper() {
  return function IntroLayout({ children }) {
    return <div className="page">{children}</div>
  }
}
