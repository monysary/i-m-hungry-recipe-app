import Footer from "./footer"
import Navbar from "./navbar"

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  )
}

export default Layout
