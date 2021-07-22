import { useState, useEffect } from "react"
import Header from "./header"
import Footer from "./footer"
import NavBar from "./navbar"
import Sidebar from "./sidebar"
import api from "../util/api"

export default function Layout({title, children, token}) {

    const [collapseSidebar, setCollapsedSidebar] = useState(false);

    const [username, setUsername] = useState('');

    useEffect(() => {
        api().get('api/user', { headers: {"Authorization" : `Bearer ${token}`} })
        .then(response => {
            setUsername(response.data.name.charAt(0).toUpperCase() + response.data.name.slice(1))
        })
    },[])

    return (
        <>
            <Header title={title} />
            <div className="wrapper">
                <Sidebar collapseSidebar={collapseSidebar} />
                <div className="main">
                    <NavBar setCollapsedSidebar={setCollapsedSidebar} token={token} username={username} />
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