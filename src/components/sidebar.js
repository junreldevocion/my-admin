import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Sidebar({collapseSidebar, href}) {

	const [collapse, setCollapse] = useState(false);

	const toggleCollapse = (e) => {
		e.preventDefault()
		setCollapse(!collapse)
	}

	useEffect(() => {
		if (href === '/change-password') {
			setCollapse(true)
		}
	},[])

    return (
        <nav id="sidebar" className={`sidebar ${collapseSidebar ? 'collapsed' : ''}`}>
			<div className="sidebar-content js-simplebar">
				<Link href="/">
					<a className="sidebar-brand" href="index.html">
						<span className="align-middle"><span className="text-primary">My</span>Admin</span>
					</a>
				</Link>

				<ul className="sidebar-nav">
					<li className="sidebar-header">
						Pages
					</li>

					<li className={`sidebar-item ${href === '/' ? 'active' : ''}`}>
						<Link href="/">
							<a className="sidebar-link" href="index.html">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sliders align-middle me-2"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
								<span className="align-middle">Dashboard</span>
							</a>
						</Link>
					</li>
					<li className={`sidebar-item ${href === '/change-password' ? 'active' : ''}`}>
						<a data-bs-target="#setting" data-bs-toggle="collapse" 
						className={`sidebar-link ${ !collapse ? 'collapsed' : '' }`}
						onClick={toggleCollapse}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings align-middle me-2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
							<span className="align-middle">Settings</span>
						</a>
						<ul id="pages" className={`sidebar-dropdown list-unstyled collapse ${ collapse ? 'show' : ''}`} data-bs-parent="#sidebar" wfd-invisible="true">
							<li className={`sidebar-item ${href === '/change-password' ? 'active' : ''}`}>
								<Link href="/change-password">
									<a className="sidebar-link" href="#">
										<span className="align-middle">Change password</span>
									</a>
								</Link>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</nav>
    )
}