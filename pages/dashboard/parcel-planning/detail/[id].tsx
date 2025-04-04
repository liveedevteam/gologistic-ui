import Layout from '@/components/Layout'
import Loading from '@/components/Loading'
import { getDataById, getMediaDataById, getStartAndStopPoints, getStocKDataFromPeaCode, putData } from '@/pages/api/callApi'
import { useRouter } from 'next/router'
import React from 'react'
import DatePicker from "react-datepicker";

export default function ParcelPlanningDetail() {
  const [planning, setPlanning] = React.useState(null) as any
  const [startPoints, setStartPoints] = React.useState([])
  const [endPoints, setEndPoints] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const router = useRouter()
  const id = router.query.id

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // router.push('/dashboard/parcel-planning')
  }

  const fetchData = async () => {
    try {
      console.log(`id`, id)
      const type = 'planning'
      const data = await getDataById(type, id as string)
      console.log(`data`, data)
      setPlanning(data)
    } catch (error) {
      console.log(error)
    }
  }

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

  React.useEffect(() => {
    if (planning) {
      setIsLoading(false)
    }
  }, [planning])

  React.useEffect(() => {
    if (id) {
      fetchData()
      fetchStartPoints()
    }
  }, [id])

  return (
    <Layout>
      {isLoading && <Loading />}
      {!isLoading && <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>อัพเดทแผนงาน</h1>
            <div className='m-4'></div>
            <div className='d-flex flex-row-reverse'>
              <button className="btn btn-primary" onClick={async () => {
                const resUrl = await getMediaDataById('planning', id as string) as any
                console.log(`resUrl`, resUrl)
                window.open(resUrl.url, '_blank')
              }}>
                <i className="bi bi-plus-circle"></i>&nbsp;&nbsp;Download XLSX
              </button>
              &nbsp;&nbsp;
              {planning.status !== 'draft' && <button className="btn btn-primary" onClick={async () => {
                router.push(`/dashboard/parcel-planning/pdf/${id}`)
              }}>
                <i className="bi bi-plus-circle"></i>&nbsp;&nbsp;Print PDF
              </button>}
            </div>
            <form onSubmit={submitForm}>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">ชื่อ</label>
                <input
                  type="text"
                  className="form-control"
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
                  value={dayjs(planning.date).format('YYYY-MM-DD')}
                  onChange={(e) => {
                    const value = e.target.value
                    setPlanning({ ...planning, date: value })
                  }}
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
              <div className='col-12'>
                <div className="mb-3">
                  <label htmlFor="parcel" className="form-label">สถานะ</label>
                  <select className='form-control'
                    onChange={(e) => {
                      const value = e.target.value
                      setPlanning({ ...planning, status: value })
                    }}
                    value={planning.status}
                    defaultChecked={planning.status}
                  >
                    <option value='draft'>Draft</option>
                    <option value='inProgress'>แผนจ้างขนส่ง</option>
                    <option value='proposal'>ใบเสนอราคา</option>
                    <option value='comparePrice'>เปรียบเทียบราคา</option>
                    <option value='completed'>ขออนุมัติจ้าง</option>
                  </select>
                </div>
              </div>
              {planning && planning.parcels && planning.parcels.map((parcel: any, index: number) => (<div className='card mt-3' key={index}>
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
                          onChange={(e) => {
                            const value = e.target.value
                            const newParcels = [...planning.parcels]
                            newParcels[index].source = value
                            setPlanning({ ...planning, parcels: newParcels })
                          }}
                          value={parcel.source}
                          defaultChecked={parcel.source}
                        >
                          {startPoints.map((point: any, index: number) => (
                            <option key={index} value={point}>{point}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className='col-6'>
                      <div className="mb-3">
                        <label htmlFor="amount" className="form-label">ประเภทรถ</label>
                        <select className='form-control'
                          onChange={(e) => {
                            const value = e.target.value
                            const newParcels = [...planning.parcels]
                            const newNumberOfVehicles = [...parcel.numberOfVehicles]
                            newParcels[index].type = parseInt(value)
                            newParcels[index].numberOfVehicles = newNumberOfVehicles
                            newNumberOfVehicles.forEach((vehicle, vehicleIndex) => {
                              if (vehicleIndex !== parseInt(value)) {
                                newNumberOfVehicles[vehicleIndex].number = 0
                              }
                            })
                            setPlanning({ ...planning, parcels: newParcels })
                          }}
                          value={parcel.type}
                          defaultChecked={parcel.type}

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
                        <select className='form-control'
                          onChange={(e) => {
                            const value = e.target.value
                            const newParcels = [...planning.parcels]
                            newParcels[index].destination = value
                            setPlanning({ ...planning, parcels: newParcels })
                          }}
                          value={parcel.destination}
                          defaultChecked={parcel.destination}
                        >
                          {endPoints.map((point: any, index: number) => (
                            <option key={index} value={point}>{point}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className='col-6'>
                      <div className="mb-3">
                        <label htmlFor="amount" className="form-label">จำนวนคันรถ</label>
                        <input
                          type="text"
                          className="form-control"
                          value={parcel.numberOfVehicles[parcel.type].number || 0}
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
                    <div className='col-6'>
                      <div className="mb-3">
                        <label htmlFor="amount" className="form-label">ราคากลาง</label>
                        <input
                          type="text"
                          className="form-control"
                          value={parcel.peas[0].centralPrice}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className='col-6'>
                      <div className="mb-3">
                        <label htmlFor="amount" className="form-label">วงเงินประมาณการค่าขนส่ง</label>
                        <input
                          type="text"
                          className="form-control"
                          value={parcel.peas[0].centralPrice * parcel.peas[0].numberOfVehicles[parcel.type].number}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className='card card-body m-2'>
                      {parcel.peas.map((peaObj: any, peaIndex: number) => (<React.Fragment key={peaIndex}>
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
                    {/* <div className='col-4'>
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
                        <label htmlFor="amount" className="form-label">รายการพัสดุที่ขนส่ง</label>
                        <input
                          type="text"
                          className="form-control"
                          value={planning.parcels[index].description}
                          onChange={(e) => {
                            const value = e.target.value
                            const newParcels = [...planning.parcels]
                            newParcels[index].peaCode = value
                            setPlanning({ ...planning, parcels: newParcels })
                          }}
                          disabled={true}
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
                            const newPlanning = { ...planning }
                            newPlanning.parcels[index].quantity = value === '' ? 0 : parseInt(value)
                            setPlanning(newPlanning)
                          }}
                        />
                      </div>
                    </div> */}
                    <div className='col-4'>
                      <div className="mb-3">
                        <label htmlFor="amount" className="form-label">ระยะทาง (กิโลเมตร)</label>
                        <input
                          type="text"
                          className="form-control"
                          value={parcel.peas[0].distance}
                          disabled={true}
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
                            newPlanning.parcels[index].budget = value
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
                        {/* <input
                          type="date"
                          className="form-control"
                          value={parcel.date}
                          onChange={(e) => {
                            const value = e.target.value
                            const newPlanning = { ...planning }
                            newPlanning.parcels[index].date = value
                            setPlanning(newPlanning)
                          }}
                        /> */}
                        <DatePicker
                          selected={parcel.date ? new Date(parcel.date) : new Date()}
                          onChange={(date: any) => {
                            const newPlanning = { ...planning }
                            newPlanning.parcels[index].date = date.toISOString().split('T')[0]
                            setPlanning(newPlanning)
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
                      description: '',
                      quantity: 0,
                      distance: 0,
                      centralPrice: 0,
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
                      ]
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
              <button
                type="submit"
                className="btn btn-primary"
                onClick={async () => {
                  setIsLoading(true)
                  try {
                    await putData('planning', id as string, planning)
                    alert('อัพเดทแผนงานเรียบร้อย')
                    fetchData()
                  } catch (error) {
                    alert('อัพเดทแผนงานไม่สำเร็จ: ' + error)
                  } finally {
                    setIsLoading(false)
                  }
                }}
              >
                <i className="bi bi-plus-circle"></i>&nbsp;&nbsp;อัพเดทแผนงาน
              </button>
              <div className='m-4'></div>
            </form>
          </div>
        </div>
      </div>}
    </Layout>
  )
}
