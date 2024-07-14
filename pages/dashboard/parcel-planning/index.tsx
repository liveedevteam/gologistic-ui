import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import React from 'react'

const defaultPlannings = [{
    id: 1,
    date: '20/12/2024',
    description: 'แผนงานการขนส่งพัสดุ 20/12/2024',
    status: 'กำลังเดินการ'
}]

export default function ParcelPlanning() {
    const [plannings, setPlannings] = React.useState([...defaultPlannings])
    const [searchText, setSearchText] = React.useState('')
    const router = useRouter()
    return (<>
        <Layout>
            <div className="container">
                <div className='m-3'></div>
                <h1>แผนงานการขนส่งพัสดุ</h1>
                <div className='m-4'></div>
                <div className="row">
                    <div className="col-12">
                        <div className='d-flex flex-row-reverse'>
                            <button className="btn btn-primary" onClick={() => {
                                router.push('/dashboard/parcel-planning/create')
                            }}>
                                <i className="bi bi-plus-circle"></i>&nbsp;&nbsp;เพิ่มแผนงาน
                            </button>
                        </div>
                        <div className='m-4'></div>
                        {/* Input text with Search button */}
                        <div className="input-group mb-3">
                            <input
                                type="text" 
                                className="form-control" 
                                placeholder="ค้นหาแผนงานด้วยเลขที่ กพ."     
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => {
                                if (searchText === '') {
                                    setPlannings([...defaultPlannings])
                                    return
                                }
                                const newPlannings = plannings.filter(planning => planning.id.toString().includes(searchText))
                                setPlannings(newPlannings)
                            }}>
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                        <div className='m-4'></div>
                        <div className='table-responsive'>
                            <table className="table table-striped">
                                <tbody className="table-light">
                                    <tr className=''>
                                        <td className=''>เลขที่ กพ.</td>
                                        <td className=''>วันที่</td>
                                        <td>รายละเอียด</td>
                                        <td>สถานะ</td>
                                        <td>เพิ่มเติม</td>
                                    </tr>
                                    {plannings.map((planning, index) => (
                                        <tr className='' key={index}>
                                            <td className=''>{planning.id}</td>
                                            <td className=''>{planning.date}</td>
                                            <td>{planning.description}</td>
                                            <td>{planning.status}</td>
                                            <td>
                                                <button className="btn btn-outline-primary" onClick={() => {
                                                    router.push('/dashboard/parcel-planning/detail/' + planning.id)
                                                }}>
                                                    <i className="bi bi-eye"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    </>)
}
