import React from 'react'
import { useAuth } from '@/contexts/AuthContext'

export default function TopNavbar({
    toggleSidebar
}: {
    toggleSidebar: () => void
}) {
    const { logout } = useAuth()
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom">
            <div className='container-fluid'>
                <button className="btn btn-dark" id="sidebarToggle" onClick={toggleSidebar}>
                    <i className="bi bi-list"></i>
                </button>
                {/* Logout button */}
                <button className="btn btn-dark ms-auto" onClick={logout}>
                    <i className="bi bi-box-arrow-right"></i>
                </button>
            </div>
        </nav>
    )
}
