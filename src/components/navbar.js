
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Avatar from '../styles/img/avatars/avatar.jpg'
import api from '../util/api'
import { logOut } from '../util/auth'

export default function NavBar({setCollapsedSidebar, token, username, href}) {

	const [dropdownToggle, setdropdownToggle] = useState(false)

	const toggleSidebar = () => {
		setCollapsedSidebar(prev => !prev)
	}

	const toggle = (e) => {
		e.preventDefault()
		setdropdownToggle(prev => !prev)
	}

    return (
        <>
			<nav className="navbar navbar-expand navbar-light navbar-bg">
				<a className="sidebar-toggle js-sidebar-toggle" onClick={toggleSidebar}>
					<i className="hamburger align-self-center"></i>
				</a>
				<div className="navbar-collapse collapse">
					<ul className="navbar-nav navbar-align">
						<li className="nav-item dropdown">
							<a className="nav-icon dropdown-toggle d-inline-block d-sm-none" onClick={toggle} href="#" data-bs-toggle="dropdown">
								<i className="align-middle" data-feather="settings"></i>
							</a>

							<a className="nav-link d-none d-sm-flex align-items-center py-0" onClick={toggle} href="#" data-bs-toggle="dropdown">
								<Image 
									src={Avatar} 
									className="avatar img-fluid rounded"
									width={40}
									height={40}
									/>							
							</a>
							<div className={`dropdown-menu dropdown-menu-end ${dropdownToggle ? 'show' : ''}` } data-bs-popper={`${dropdownToggle ? 'none' : ''}` }>
								<a className="dropdown-item" href="pages-profile.html">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user align-middle me-1"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
									Hi! {username}
								</a>
								{/* <div className="dropdown-divider"></div> */}
								{/* <Link href='/settings'>
									<a className={`dropdown-item ${href === '/settings' ? 'active' : ''}`} href="/settings">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings align-middle me-1"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
										Settings
									</a>
								</Link> */}
								<div className="dropdown-divider"></div>
								<a className="dropdown-item" href="#"
									onClick={
										(e) => {
											e.preventDefault(); 
											api().post('api/logout', {}, { headers: {"Authorization" : `Bearer ${token}`} })
											.then(logOut());
										}}
								>Log out</a>
							</div>
						</li>
					</ul>
				</div>
			</nav>
        </>
    )
}