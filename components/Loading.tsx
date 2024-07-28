import React from 'react'

export default function Loading() {
    return (
        <>
            {/* Bootstrap fool page loading I need loading to centralize from vertical and horizontal position top 0*/}
            <div className="d-flex justify-content-center align-items-center"
                style={{ height: '100vh' }}
            >
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    )
}
