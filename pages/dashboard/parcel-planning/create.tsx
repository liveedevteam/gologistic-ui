import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import React from 'react'
import { postData } from '@/pages/api/callApi'

export default function ParcelCreate() {
    const [planning, setPlanning] = React.useState({
        title: '',
        budget: 0,
        date: '',
        oilPricePerLiter: 0,
        parcels: [{
            source: '',
            destination: '',
            distance: 0,
            peaCode: '',
            quantity: 0,
            numberOfVehicles: [
                {
                    "type": "6 ล้อ",
                    "number": 0
                },
                {
                    "type": "10 ล้อ",
                    "number": 0
                },
                {
                    "type": "18 ล้อ",
                    "number": 0
                }
            ],
            budget: 0,
            contract: '',
            date: '',
            type: 0 as number,
            ratio: 0
        }]
    })
    const router = useRouter()
    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(`planning`, planning)
        try {
            await postData('planning', planning)
            router.push('/dashboard/parcel-planning')
        } catch (error) {
            alert(`เกิดข้อผิดพลาด ${error}`)
        }
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
                                <label htmlFor="date" className="form-label">ชื่อ</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="date"
                                    value={planning.title}
                                    onChange={(e) => {
                                        const value = e.target.value
                                        setPlanning({ ...planning, title: value })
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="date" className="form-label">วันที่</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={planning.date}
                                    onChange={(e) => {
                                        const value = e.target.value
                                        setPlanning({ ...planning, date: value })
                                    }}
                                />
                            </div>
                            <div className='col-12'>
                                <div className="mb-3">
                                    <label htmlFor="parcel" className="form-label">ราคาน้ำมัน</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={planning.oilPricePerLiter}
                                        onChange={(e) => {
                                            const value = e.target.value
                                            setPlanning({ ...planning, oilPricePerLiter: value === '' ? 0 : parseInt(value) })
                                        }}
                                    />
                                </div>
                            </div>
                            {planning.parcels.map((parcel, index) => (<div className='card mt-3' key={index}>
                                <div className='card-header'>
                                    <div className='d-flex'>
                                        <div className='flex-grow-1'>พัสดุ {index + 1}</div>
                                        <div className='justify-content-end'>
                                            {index > 0 && <i className="bi bi-trash" onClick={() => {
                                                const newParcels = [...planning.parcels]
                                                newParcels.splice(index, 1)
                                                setPlanning({ ...planning, parcels: newParcels })
                                            }}></i>}
                                        </div>
                                    </div>
                                </div>
                                <div className='card-body'>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <div className="mb-3">
                                                <label htmlFor="parcel" className="form-label">ต้นทาง</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={parcel.source}
                                                    onChange={(e) => {
                                                        const value = e.target.value
                                                        const newParcels = [...planning.parcels]
                                                        newParcels[index].source = value
                                                        setPlanning({ ...planning, parcels: newParcels })
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <div className="mb-3">
                                                <label htmlFor="amount" className="form-label">ประเภทรถ</label>
                                                <select className='form-control'
                                                    value={parcel.type}
                                                    onChange={(e) => {
                                                        const value = e.target.value
                                                        console.log(`value`, value)
                                                        const newParcels = [...planning.parcels]
                                                        const newNumberOfVehicles = [...parcel.numberOfVehicles]
                                                        newParcels[index].type = parseInt(value)
                                                        newParcels[index].numberOfVehicles = newNumberOfVehicles
                                                        setPlanning({ ...planning, parcels: newParcels })
                                                    }}
                                                >
                                                    <option value={0}>6 ล้อ</option>
                                                    <option value={1}>10 ล้อ</option>
                                                    <option value={2}>18 ล้อ</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <div className="mb-3">
                                                <label htmlFor="amount" className="form-label">ปลายทาง</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={parcel.destination}
                                                    onChange={(e) => {
                                                        const value = e.target.value
                                                        const newParcels = [...planning.parcels]
                                                        newParcels[index].destination = value
                                                        setPlanning({ ...planning, parcels: newParcels })
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <div className="mb-3">
                                                <label htmlFor="amount" className="form-label">จำนวนคันรถ</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={parcel.numberOfVehicles[parcel.type].number}
                                                    onChange={(e) => {
                                                        const value = e.target.value
                                                        const newParcels = [...planning.parcels]
                                                        const newNumberOfVehicles = [...parcel.numberOfVehicles]
                                                        newNumberOfVehicles[parcel.type].number = value === '' ? 0 : parseInt(value)
                                                        newParcels[index].numberOfVehicles = newNumberOfVehicles
                                                        setPlanning({ ...planning, parcels: newParcels })
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div className="mb-3">
                                                <label htmlFor="amount" className="form-label">รหัสพัสดุ</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={planning.parcels[index].peaCode}
                                                    onChange={(e) => {
                                                        const value = e.target.value
                                                        const newParcels = [...planning.parcels]
                                                        newParcels[index].peaCode = value
                                                        setPlanning({ ...planning, parcels: newParcels })
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div className="mb-3">
                                                <label htmlFor="amount" className="form-label">จำนวนพัสดุ</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={parcel.quantity}
                                                    onChange={(e) => {
                                                        const value = e.target.value
                                                        const newParcels = [...planning.parcels]
                                                        newParcels[index].quantity = value === '' ? 0 : parseInt(value)
                                                        setPlanning({ ...planning, parcels: newParcels })
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div className="mb-3">
                                                <label htmlFor="amount" className="form-label">แผนจัดสรร/สัญญา</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={parcel.contract}
                                                    onChange={(e) => {
                                                        const value = e.target.value
                                                        const newPlanning = { ...planning }
                                                        newPlanning.parcels[index].contract = value
                                                        setPlanning(newPlanning)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div className="mb-3">
                                                <label htmlFor="amount" className="form-label">งบที่จัดซื้อ</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={parcel.budget}
                                                    onChange={(e) => {
                                                        const value = e.target.value
                                                        const newPlanning = { ...planning }
                                                        newPlanning.parcels[index].budget = value === '' ? 0 : parseInt(value)
                                                        setPlanning(newPlanning)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div className="mb-3">
                                                <label htmlFor="amount" className="form-label">สัดส่วน</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={parcel.ratio}
                                                    onChange={(e) => {
                                                        const value = e.target.value
                                                        const newPlanning = { ...planning }
                                                        newPlanning.parcels[index].ratio = value === '' ? 0 : parseInt(value)
                                                        setPlanning(newPlanning)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div className="mb-3">
                                                <label htmlFor="amount" className="form-label">วันที่เข้ารับพัสดุ</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    value={parcel.date}
                                                    onChange={(e) => {
                                                        const value = e.target.value
                                                        const newPlanning = { ...planning }
                                                        newPlanning.parcels[index].date = value
                                                        setPlanning(newPlanning)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>))
                            }
                            <div className='m-4'></div>
                            <div className='d-flex justify-content-end'>
                                <button type="button" className="btn btn-primary" onClick={() => {
                                    const newParcels = [...planning.parcels]
                                    newParcels.push({
                                        source: '',
                                        destination: '',
                                        distance: 0,
                                        peaCode: '',
                                        quantity: 0,
                                        numberOfVehicles: [
                                            {
                                                "type": "6 ล้อ",
                                                "number": 0
                                            },
                                            {
                                                "type": "10 ล้อ",
                                                "number": 0
                                            },
                                            {
                                                "type": "18 ล้อ",
                                                "number": 0
                                            }
                                        ],
                                        budget: 0,
                                        contract: '',
                                        date: '',
                                        type: 0,
                                        ratio: 0
                                    })
                                    setPlanning({ ...planning, parcels: newParcels })
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
