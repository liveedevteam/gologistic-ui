import { useRouter } from 'next/router'
import React from 'react'

export default function TopNavbar({
    toggleSidebar
}: {
    toggleSidebar: () => void
}) {
    const router = useRouter()
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom">
            <div className='container-fluid'>
                <button className="btn btn-dark" id="sidebarToggle" onClick={toggleSidebar}>
                    <i className="bi bi-list"></i>
                </button>
                {/* Logout button */}
                <button className="btn btn-dark ms-auto" onClick={() => {
                    window.localStorage.removeItem('token')
                    router.push('/login')
                }}>
                    <i className="bi bi-box-arrow-right"></i>
                </button>
            </div>
        </nav>
    )
}
