import { useState } from "react"
import Header from "./header"
import Footer from "./footer"
import NavBar from "./navbar"
import Sidebar from "./sidebar"

export default function Layout({title, children}) {

    const [collapseSidebar, setCollapsedSidebar] = useState(false);

    return (
        <>
            <Header title={title} />
            <div className="wrapper">
                <Sidebar collapseSidebar={collapseSidebar} />
                <div className="main">
                    <NavBar setCollapsedSidebar={setCollapsedSidebar} />
                    <main className="content">
                        <div className="container-fluid p-0">

                            {children}
                            
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    )
}