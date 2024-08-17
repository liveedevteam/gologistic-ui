import Layout from '@/components/Layout'
import Loading from '@/components/Loading'
import { getDataById, getStartAndStopPoints, getStocKDataFromPeaCode, putData } from '@/pages/api/callApi'
import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import DatePicker from "react-datepicker";
import { useReactToPrint } from 'react-to-print'
import Image from 'next/image'

const MyDocument = React.forwardRef((props: any, ref: any) => {
    const { data } = props
    return (
        <div ref={ref} style={{ height: '100%', }}>
            <div style={{ padding: '20px' }}>
                <div className='m-1'></div>
                <Image
                    src="/assets/images/logo.png"
                    alt="logo"
                    width={90}
                    height={70}
                />
                <div className='m-1'></div>
                <div className='row'>
                    <div className='col-6'>จาก: ผกพ.</div>
                    <div className='col-6'>ถึง: กจล.(ต)</div>
                    <div className='col-6'>เลขที่: </div>
                    <div className='col-6'>วันที่: </div>
                    <div className='col-12'>เรื่อง: ขออนุมัติแผนจัดรถยนต์บรรทุกเพื่อขนส่ง</div>
                    <div className='col-12'>อ้างถึง: แผนจัดสรรพัสดุ</div>
                    <div className='m-1'></div>
                    <hr style={{
                        border: '2px solid black'
                    }} />
                    <div className='m-1'></div>
                    <p>เรียน อก.จส.(ต)</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ตามอนุมัติ เลขที่ xxx ลงวันที่ xxx จัดสรรพัสดุประเภทลูกถ้วย ให้คลังพัสดุเบิกข่ายในสังกัด กจล.(ต) รายละเอียดเอกสารแนบน้้น xxx จึงขอให้ xxx พิจารณาอนุมัติแผนจัดรถยนต์บรรทุกเพื่อขนส่งพัสดุดังกล่าว ไปยังคลังพัสดุเบิกจ่ายในสังกัด xxx โดยขอให้ xxx พิจารณา ดำเนินการจัดจ้างรถยนต์บรรทุก มีรายละเอียด ดังนี้</p>
                    <table className='table table-bordered' style={{
                        fontSize: "12px"
                    }}>
                        <thead>
                            <tr>
                                <th rowSpan={2}>ลำดับ</th>
                                <th rowSpan={2}>ต้นทาง</th>
                                <th rowSpan={2}>ปลายทาง</th>
                                <th rowSpan={2}>รหัสพัสดุ</th>
                                <th rowSpan={2}>รายการพัสดุ</th>
                                <th rowSpan={2}>สัญญา (งวดที่)</th>
                                <th colSpan={2}>จำนวน</th>
                                <th colSpan={3}>จำนวนรถ</th>
                                <th rowSpan={2}>ระยะทาง</th>
                                <th rowSpan={2}>หมายเหตุ/บันทึก</th>
                            </tr>
                            <tr>
                                <th>ลูก</th>
                                <th>พาเลท</th>
                                <th>6 ล้อ</th>
                                <th>10 ล้อ</th>
                                <th>18 ล้อ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.parcels.map((parcel: any, index: number) => (
                                <React.Fragment key={index}>
                                    <tr key={index}>
                                        <td rowSpan={parcel.peas.length}>{index + 1}</td>
                                        <td rowSpan={parcel.peas.length}>{parcel.source}</td>
                                        <td rowSpan={parcel.peas.length}>{parcel.destination}</td>
                                        <td>{parcel.peas[0].peaCode}</td>
                                        <td>{parcel.peas[0].description}</td>
                                        <td rowSpan={parcel.peas.length}>{parcel.contract}</td>
                                        <td>{parcel.peas[0].quantity}</td>
                                        <td>{parcel.peas[0].quantity}</td>
                                        <td rowSpan={parcel.peas.length}>{parcel.numberOfVehicles[0].number}</td>
                                        <td rowSpan={parcel.peas.length}>{parcel.numberOfVehicles[1].number}</td>
                                        <td rowSpan={parcel.peas.length}>{parcel.numberOfVehicles[2].number}</td>
                                        <td rowSpan={parcel.peas.length}>{parcel.peas[0].distance}</td>
                                        <td rowSpan={parcel.peas.length}></td>
                                    </tr>
                                    {parcel.peas.map((pea: any, peaIndex: number) => {
                                        if (peaIndex !== 0) {
                                            return (
                                                <React.Fragment key={peaIndex}>
                                                    <tr key={peaIndex}>
                                                        <td>{pea.peaCode}</td>
                                                        <td>{pea.description}</td>
                                                        <td>{pea.quantity}</td>
                                                        <td>{pea.quantity}</td>
                                                    </tr>
                                                </React.Fragment>
                                            )
                                        } else {
                                            return true
                                        }
                                    })}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                    <div style={{ pageBreakAfter: 'always' }}></div>
                    <div className='m-2'></div>
                    <p>จึงเรียนมาเพื่อโปรดพิจารณาอนุมัติ</p>
                    <div className='m-12'></div>
                    <div className='row' style={{
                        marginLeft: "100px"
                    }}>
                        <div className='col-6'>
                            <div style={{ marginTop: '70px' }}></div>
                            <p>ลงชื่อ ..............................................</p>
                            <p>(..................................................)</p>
                            <p>ตำแหน่ง ..............................................</p>
                            <p>วันที่ ..............................................</p>
                        </div>
                        <div className='col-6'>
                            <div style={{ marginTop: '70px' }}></div>
                            <p>ลงชื่อ ..............................................</p>
                            <p>(..................................................)</p>
                            <p>ตำแหน่ง ..............................................</p>
                            <p>วันที่ ..............................................</p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
})

export default function ParcelPlanningQuotation() {
    const [planning, setPlanning] = React.useState(null) as any
    const [startPoints, setStartPoints] = React.useState([])
    const [endPoints, setEndPoints] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const router = useRouter()
    const documentRef = useRef();
    const id = router.query.id

    const handlePrint = useReactToPrint({
        content: () => documentRef.current || null,
        pageStyle: `
          @page {
            size: A4 landscape;
            margin: 10mm; /* Adjust margins as needed */
          }
          body {
            font-family: Arial, sans-serif;
            -webkit-print-color-adjust: exact; /* Ensures color accuracy in print */
            -webkit-print-font-size: 12px; /* Adjust font size as needed */
          }
          .container {
            padding: 0; /* Ensure no padding in container to maximize space */
          }
          .table {
            width: 100%; /* Ensure the table takes full width */
          }
            .row, .col-6, .col-12 {
        width: 100%;
        margin: 0;
        padding: 0;
      }
        `,
    });
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
                <div className='d-flex flex-row-reverse'>
                    <button className="btn btn-primary" onClick={handlePrint}>
                        <i className="bi bi-plus-circle"></i>&nbsp;&nbsp;Print PDF
                    </button>
                </div>
                <div className='m-4'></div>
                <MyDocument ref={documentRef} data={planning} />
                {/* <div className="row">
                    <div className="col-12">
                        <h1>PDF Preview</h1>
                        <div className='m-4'></div>
                        <div className='d-flex flex-row-reverse'>
                            <button className="btn btn-primary" onClick={handlePrint}>
                                <i className="bi bi-plus-circle"></i>&nbsp;&nbsp;Print PDF
                            </button>
                        </div>
                        <br />
                        
                        <form onSubmit={submitForm}>
                        </form>
                    </div>
                </div> */}
            </div>}
        </Layout>
    )
}
