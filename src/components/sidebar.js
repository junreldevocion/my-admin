import Link from 'next/link'

export default function Sidebar({collapseSidebar}) {

    return (
        <nav id="sidebar" className={`sidebar ${collapseSidebar ? 'collapsed' : ''}`}>
			<div className="sidebar-content js-simplebar">
				<Link href="/">
					<a className="sidebar-brand" href="index.html">
						<span className="align-middle">AdminKit</span>
					</a>
				</Link>

				<ul className="sidebar-nav">
					<li className="sidebar-header">
						Pages
					</li>

					<li className="sidebar-item active">
						<Link href="/">
							<a className="sidebar-link" href="index.html">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sliders align-middle"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
								<span className="align-middle">Dashboard</span>
							</a>
						</Link>
					</li>
				</ul>
			</div>
		</nav>
    )
}