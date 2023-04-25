import Navbar from "./navbar";

function Layout({ children }) {
    return (
        <>
            <Navbar />
            <div>{children}</div>
        </>
    )
}

export default Layout