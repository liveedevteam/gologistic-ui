import Link from 'next/link'
import React from 'react'

export default function Sidebar({
    toggleSidebar
}: {
    toggleSidebar: () => void
}) {
    const listItems = [
        {
            name: 'หน้าหลัก',
            href: '/dashboard',
            icon: 'bi bi-speedometer'
        },
        {
            name: 'แผนงาน',
            href: '/dashboard/parcel-planning',
            icon: 'bi bi-box'
        },
        {
            name: 'น้ำหนัก',
            href: '/dashboard/weight',
            icon: 'bi bi-ubuntu'
        },
        {
            name: 'คลัง',
            href: '/dashboard/stock',
            icon: 'bi bi-house-check'
        },
        {
            name: 'STD',
            href: '/dashboard/std',
            icon: 'bi bi-paperclip'
        },
        {
            name: 'ราคาน้ำมัน',
            href: '/dashboard/oil-price',
            icon: 'bi bi-currency-dollar'
        }
    ]
    return (
        <>
            <div className="bg-dark border-right" id="sidebar-wrapper" style={{
                borderRight: "2px solid #fff"
            }}>
                <div className="list-group list-group-flush">
                    {/* button x to close and float right */}
                    <div className="list-group-item list-group-item-action bg-dark text-white border-0 border-bottom" >
                        <div className='d-flex justify-content-end mt-3 mb-3'>
                            <i className="bi bi-x-lg" onClick={toggleSidebar}></i>
                        </div>
                    </div>
                    {listItems.map((item, index) => (
                        <Link href={item.href} key={index} style={{
                            textDecoration: 'none'
                        }}>
                            <div className="list-group-item list-group-item-action bg-dark text-white border-0 border-bottom" >
                                <div className="d-flex w-100 justify-content-start m-1">
                                    <i className={item.icon}></i>
                                    <span className="ms-2">{item.name}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}
