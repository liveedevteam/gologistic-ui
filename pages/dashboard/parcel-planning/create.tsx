import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import React from 'react'

export default function ParcelCreate() {
    const [parcels, setParcels] = React.useState([{
        oilPrice: 0,
        source: '',
        destination1: '',
        destination2: '',
        parcelCode: '',
        parcelAmount: 0,
        parcelType: '',
        vehicleAmount: 0,
        budget: 0,
        proportion: 0,
        receiveDate: ''
    }])
    const router = useRouter()
    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        router.push('/dashboard/parcel-planning')
    }
    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>สร้างแผนงานการขนส่งพัสดุ</h1>
                        <div className='m-4'></div>
                        <form onSubmit={submitForm}>
                            <div className="mb-3">
                                <label htmlFor="date" className="form-label">วันที่</label>
                                <input type="date" className="form-control" id="date" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">รายละเอียด</label>
                                <textarea className="form-control" id="description" rows={3}></textarea>
                            </div>
                            {parcels.map((parcel, index) => (<div className='card mt-3' key={index}>
                                <div className='card-header'>
                                    <div className='d-flex'>
                                        <div className='flex-grow-1'>พัสดุ {index + 1}</div>
                                        <div className='justify-content-end'>
                                            {index > 0 && <i className="bi bi-trash" onClick={() => {
                                                setParcels(parcels.filter((_, i) => i !== index))
                                            }}></i>}
                                        </div>
                                    </div>
                                </div>
                                <div className='card-body'>
                                    <div className='row'>
                                        <div className='col-12'>
                                            <div className="mb-3">
                                                <label htmlFor="parcel" className="form-label">ราคาน้ำมัน</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={parcel.oilPrice}
                                                    onChange={(e) => {
                                                        const newParcels = [...parcels]
                                                        newParcels[index].oilPrice = parseFloat(e.target.value)
                                                        setParcels(newParcels)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <div className="mb-3">
                                                <label htmlFor="parcel" className="form-label">ต้นทาง</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <div className="mb-3">
                                                <label htmlFor="amount" className="form-label">ประเภทรถ</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <div className="mb-3">
                                                <label htmlFor="amount" className="form-label">ปลายทาง 1</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <div className="mb-3">
                                                <label htmlFor="amount" className="form-label">จำนวนรถ</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <div className="mb-3">
                                                <label htmlFor="amount" className="form-label">ปลายทางที่ 2</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className='col-6'></div>
                                        <div className='col-4'>
                                            <div className="mb-3">
                                                <label htmlFor="amount" className="form-label">รหัสพัสดุ</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div className="mb-3">
                                                <label htmlFor="amount" className="form-label">จำนวนพัสดุ</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div className="mb-3">
                                                <label htmlFor="amount" className="form-label">แผนจัดสรร/สัญญา</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div className="mb-3">
                                                <label htmlFor="amount" className="form-label">งบที่จัดซื้อ</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div className="mb-3">
                                                <label htmlFor="amount" className="form-label">สัดส่วน</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div className="mb-3">
                                                <label htmlFor="amount" className="form-label">วันที่เข้ารับพัสดุ</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>))
                            }
                            <div className='m-4'></div>
                            <div className='d-flex justify-content-end'>
                                <button type="button" className="btn btn-primary" onClick={() => {
                                    setParcels([...parcels, {
                                        oilPrice: 0,
                                        source: '',
                                        destination1: '',
                                        destination2: '',
                                        parcelCode: '',
                                        parcelAmount: 0,
                                        parcelType: '',
                                        vehicleAmount: 0,
                                        budget: 0,
                                        proportion: 0,
                                        receiveDate: ''
                                    }])
                                }}>
                                    <i className="bi bi-plus-circle"></i>&nbsp;&nbsp;เพิ่มรายการพัสดุ
                                </button>
                            </div>
                            <div className='m-4'></div>
                            <button type="submit" className="btn btn-primary"><i className="bi bi-plus-circle"></i>&nbsp;&nbsp;สร้างแผนงาน</button>
                            <div className='m-4'></div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
