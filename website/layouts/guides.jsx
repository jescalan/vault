export default function GuidesLayoutWrapper() {
  return function GuidesLayout({ children }) {
    return <div className="page">{children}</div>
  }
}
