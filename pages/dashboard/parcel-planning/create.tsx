import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import DatePicker from "react-datepicker";
import { getStartAndStopPoints, getStocKDataFromPeaCode, postData } from '@/pages/api/callApi'

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
            peas: [{
                peaCode: '',
                quantity: 0,
                description: ''
            }],
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
    const [startPoints, setStartPoints] = React.useState([])
    const [endPoints, setEndPoints] = React.useState([])
    const router = useRouter()

    const findPeaData = async (e: any, peaCode: string, index: number, peaIndex: number) => {
        e.preventDefault()
        const data = await getStocKDataFromPeaCode(peaCode)
        console.log(`data`, data)
        if (data && data.result) {
            const description = data.result.description
            const newParcels = [...planning.parcels]
            newParcels[index].peas[peaIndex].description = description
            setPlanning({ ...planning, parcels: newParcels })
        } else {
            const newParcels = [...planning.parcels]
            newParcels[index].peas[peaIndex].description = ''
            setPlanning({ ...planning, parcels: newParcels })
        }
    }

    useEffect(() => {
        const fetchStartPoints = async () => {
            try {
                const type = 'oil-price'
                const data = await getStartAndStopPoints(type)
                setStartPoints(data.startPoints)
                setEndPoints(data.stopPoints)
            } catch (error) {
                console.log(error)
            }
        }
        fetchStartPoints()
    }, [])

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
                                <label htmlFor="date" className="form-label">วันที่</label><br />
                                {/* <input
                                    type="date"
                                    className="form-control"
                                    value={planning.date}
                                    onChange={(e) => {
                                        const value = e.target.value
                                        setPlanning({ ...planning, date: value })
                                    }}
                                    pattern='[0-9]{4}-[0-9]{2}-[0-9]{2}'
                                /> */}
                                <DatePicker
                                    selected={planning.date ? new Date(planning.date) : new Date()}
                                    onChange={(date: any) => {
                                        setPlanning({ ...planning, date: date.toISOString().split('T')[0] })
                                    }}
                                    dateFormat="dd-MM-yyyy"
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
                            {planning && planning.parcels && planning.parcels.map((parcel, index) => (<div className='card mt-3' key={index}>
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
                                                {/* <input
                                                    type="text"
                                                    className="form-control"
                                                    value={parcel.source}
                                                    onChange={(e) => {
                                                        const value = e.target.value
                                                        const newParcels = [...planning.parcels]
                                                        newParcels[index].source = value
                                                        setPlanning({ ...planning, parcels: newParcels })
                                                    }}
                                                /> */}
                                                <select className='form-control'
                                                    value={parcel.source}
                                                    onChange={(e) => {
                                                        const value = e.target.value
                                                        const newParcels = [...planning.parcels]
                                                        newParcels[index].source = value
                                                        setPlanning({ ...planning, parcels: newParcels })
                                                    }}>
                                                    <option value=''>เลือกต้นทาง</option>
                                                    {startPoints && startPoints.map((point: any, index: number) => <option key={index} value={point}>{point}</option>)}
                                                </select>
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
                                                        // set zero to all number of vehicles except the selected one
                                                        newNumberOfVehicles.forEach((vehicle, vehicleIndex) => {
                                                            if (vehicleIndex !== parseInt(value)) {
                                                                newNumberOfVehicles[vehicleIndex].number = 0
                                                            }
                                                        })
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
                                                <select className='form-control'
                                                    value={parcel.destination}
                                                    onChange={(e) => {
                                                        const value = e.target.value
                                                        const newParcels = [...planning.parcels]
                                                        newParcels[index].destination = value
                                                        setPlanning({ ...planning, parcels: newParcels })
                                                    }}>
                                                    <option value=''>เลือกปลายทาง</option>
                                                    {endPoints && endPoints.map((point: any, index: number) => <option key={index} value={point}>{point}</option>)}
                                                </select>
                                                {/* <input
                                                    type="text"
                                                    className="form-control"
                                                    value={parcel.destination}
                                                    onChange={(e) => {
                                                        const value = e.target.value
                                                        const newParcels = [...planning.parcels]
                                                        newParcels[index].destination = value
                                                        setPlanning({ ...planning, parcels: newParcels })
                                                    }}
                                                /> */}
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
                                        <div className='card card-body m-2'>
                                            {parcel.peas.map((peaObj, peaIndex) => (<React.Fragment key={peaIndex}>
                                                <div className='row'>
                                                    <div className='col-4'>
                                                        <div className="mb-3">
                                                            <label htmlFor="amount" className="form-label">รหัส PEA</label>
                                                            <div className="input-group">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={peaObj.peaCode}
                                                                    onChange={(e) => {
                                                                        const value = e.target.value
                                                                        const newParcels = [...planning.parcels]
                                                                        newParcels[index].peas[peaIndex].peaCode = value
                                                                        setPlanning({ ...planning, parcels: newParcels })
                                                                    }}
                                                                />
                                                                <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={(e) => findPeaData(e, peaObj.peaCode, index, peaIndex)}>
                                                                    <i className="bi bi-search"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-3'>
                                                        <div className="mb-3">
                                                            <label htmlFor="amount" className="form-label">จำนวนพัสดุ</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={peaObj.quantity}
                                                                onChange={(e) => {
                                                                    const value = e.target.value
                                                                    const newParcels = [...planning.parcels]
                                                                    newParcels[index].peas[peaIndex].quantity = value === '' ? 0 : parseInt(value)
                                                                    setPlanning({ ...planning, parcels: newParcels })
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='col-4'>
                                                        <div className="mb-4">
                                                            <label htmlFor="amount" className="form-label">คำอธิบาย</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={peaObj.description}
                                                                disabled={true}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='col-1'>
                                                        <div style={{ marginTop: '5px' }}></div>
                                                        {
                                                            parcel.peas.length > 1 && <button className='btn btn-danger mt-4' onClick={(e) => {
                                                                e.preventDefault()
                                                                const newParcels = [...planning.parcels]
                                                                newParcels[index].peas.splice(peaIndex, 1)
                                                                setPlanning({ ...planning, parcels: newParcels })
                                                            }}>
                                                                <i className="bi bi-trash"></i>
                                                            </button>
                                                        }
                                                    </div>
                                                </div>
                                            </React.Fragment>))}
                                            <div className='col-12'>
                                                <div className='d-flex justify-content-end'>
                                                    <button type="button" className="btn btn-primary" onClick={() => {
                                                        const newParcels = [...planning.parcels]
                                                        newParcels[index].peas.push({
                                                            peaCode: '',
                                                            quantity: 0,
                                                            description: ''
                                                        })
                                                        setPlanning({ ...planning, parcels: newParcels })
                                                    }}>
                                                        <i className="bi bi-plus-circle"></i>&nbsp;&nbsp;เพิ่มรหัส
                                                    </button>
                                                </div>
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
                                                        newPlanning.parcels[index].budget = value as any
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
                                                <label htmlFor="amount" className="form-label">วันที่เข้ารับพัสดุ</label><br />
                                                <DatePicker
                                                    className='form-control'
                                                    selected={parcel.date ? new Date(parcel.date) : new Date()}
                                                    onChange={(date: any) => {
                                                        const newParcels = [...planning.parcels]
                                                        newParcels[index].date = date.toISOString().split('T')[0]
                                                        setPlanning({ ...planning, parcels: newParcels })
                                                    }}
                                                    dateFormat="dd-MM-yyyy"
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
                                        peas: [{
                                            peaCode: '',
                                            quantity: 0,
                                            description: ''
                                        }],
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
