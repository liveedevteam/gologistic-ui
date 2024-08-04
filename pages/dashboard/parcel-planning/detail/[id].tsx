import Layout from '@/components/Layout'
import dayjs from 'dayjs'
import { headers } from 'next/headers'
import { useRouter } from 'next/router'
import React from 'react'

export default function ParcelPlanningDetail() {
  const [planning, setPlanning] = React.useState({
    header: 'แผนงานการขนส่งพัสดุ 20/12/2024',
    date: '20/12/2024',
    description: 'คำอธิบายแผนงานการขนส่งพัสดุ 20/12/2024'
  })
  const [parcels, setParcels] = React.useState([{
    oilPrice: 20.34,
    source: 'xxx',
    destination1: 'xxx',
    destination2: 'xxx',
    parcelCode: 'x12',
    parcelAmount: 120,
    parcelType: 'xxx',
    vehicleAmount: 1400,
    ratio: 230,
    proportion: 120,
    receiveDate: '23/12/2024'
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
            <div className='d-flex flex-row-reverse'>
              <button className="btn btn-primary" onClick={() => {
                // const path = `/dashboard/${type}/manage?mode=add`
                // router.push(path)
              }}>
                <i className="bi bi-printer"></i>&nbsp;&nbsp;Print
              </button>
              <div className='m-2'></div>
              <button className="btn btn-primary">
                <label className="btn btn-primary" htmlFor="fileInput">
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    // onChange={handleFileChange}
                  />
                  <i className="bi bi-file-earmark-arrow-down"></i>&nbsp;&nbsp;Export Excel
                </label>
              </button>
            </div>
            <h1>{planning.header}</h1>
            <div className='m-4'></div>
            <form onSubmit={submitForm}>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">วันที่</label>
                <input
                  type="date"
                  className="form-control"
                  value={dayjs(planning.date).format('YYYY-MM-DD')}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">วันที่</label>
                <input
                  type="text"
                  className="form-control"
                  value={`ออกใบเสนอราคา`}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">รายละเอียด</label>
                <textarea
                  className="form-control"
                  rows={3}
                >
                  {planning.description}
                </textarea>
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
                        />
                      </div>
                    </div>
                    <div className='col-6'>
                      <div className="mb-3">
                        <label htmlFor="parcel" className="form-label">ต้นทาง</label>
                        <input
                          type="text"
                          className="form-control"
                          value={parcel.source}
                        />
                      </div>
                    </div>
                    <div className='col-6'>
                      <div className="mb-3">
                        <label htmlFor="amount" className="form-label">ประเภทรถ</label>
                        <input
                          type="text"
                          className="form-control"
                          value={parcel.parcelType}
                        />
                      </div>
                    </div>
                    <div className='col-6'>
                      <div className="mb-3">
                        <label htmlFor="amount" className="form-label">ปลายทาง 1</label>
                        <input
                          type="text"
                          className="form-control"
                          value={parcel.destination1}
                        />
                      </div>
                    </div>
                    <div className='col-6'>
                      <div className="mb-3">
                        <label htmlFor="amount" className="form-label">จำนวนรถ</label>
                        <input
                          type="text"
                          className="form-control"
                          value={parcel.vehicleAmount}
                        />
                      </div>
                    </div>
                    <div className='col-6'>
                      <div className="mb-3">
                        <label htmlFor="amount" className="form-label">ปลายทางที่ 2</label>
                        <input
                          type="text"
                          className="form-control"
                          value={parcel.destination2}
                        />
                      </div>
                    </div>
                    <div className='col-6'></div>
                    <div className='col-4'>
                      <div className="mb-3">
                        <label htmlFor="amount" className="form-label">รหัสพัสดุ</label>
                        <input
                          type="text"
                          className="form-control"
                          value={parcel.parcelCode}
                        />
                      </div>
                    </div>
                    <div className='col-4'>
                      <div className="mb-3">
                        <label htmlFor="amount" className="form-label">จำนวนพัสดุ</label>
                        <input
                          type="text"
                          className="form-control"
                          value={parcel.parcelAmount}
                        />
                      </div>
                    </div>
                    <div className='col-4'>
                      <div className="mb-3">
                        <label htmlFor="amount" className="form-label">แผนจัดสรร/สัญญา</label>
                        <input
                          type="text"
                          className="form-control"
                          value={parcel.proportion}
                        />
                      </div>
                    </div>
                    <div className='col-4'>
                      <div className="mb-3">
                        <label htmlFor="amount" className="form-label">งบที่จัดซื้อ</label>
                        <input
                          type="text"
                          className="form-control"
                          value={parcel.proportion}
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
                        />
                      </div>
                    </div>
                    <div className='col-4'>
                      <div className="mb-3">
                        <label htmlFor="amount" className="form-label">วันที่เข้ารับพัสดุ</label>
                        <input
                          type="text"
                          className="form-control"
                          value={parcel.receiveDate}
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
                  setParcels([...parcels, {
                    oilPrice: 0,
                    source: '',
                    destination1: '',
                    destination2: '',
                    parcelCode: '',
                    parcelAmount: 0,
                    parcelType: '',
                    vehicleAmount: 0,
                    ratio: 0,
                    proportion: 0,
                    receiveDate: ''
                  }])
                }}>
                  <i className="bi bi-plus-circle"></i>&nbsp;&nbsp;เพิ่มรายการพัสดุ
                </button>
              </div>
              <div className='m-4'></div>
              <button type="submit" className="btn btn-primary">
                {router.pathname.includes('create') ? <i className="bi bi-plus-circle"></i> : <i className="bi bi-pencil"></i>}
                &nbsp;&nbsp;{router.pathname.includes('create') ? 'สร้างแผนงาน' : 'แก้ไขแผนงาน'}
              </button>
              <div className='m-4'></div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}
