import Layout from '@/components/Layout'
import Loading from '@/components/Loading'
import { getDatas } from '@/pages/api/callApi'
import dayjs from 'dayjs'
import buddhistEra from 'dayjs/plugin/buddhistEra';

dayjs.extend(buddhistEra);
import localeData from 'dayjs/plugin/localeData';
import updateLocale from 'dayjs/plugin/updateLocale';
import { useRouter } from 'next/router'
import React from 'react'

import 'dayjs/locale/th';

dayjs.extend(buddhistEra);
dayjs.extend(localeData);
dayjs.extend(updateLocale);

dayjs.locale('th');

dayjs.updateLocale('th', {
    months: [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
        "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ]
});

export default function ParcelPlanning() {
    const [plannings, setPlannings] = React.useState(null) as any
    const [searchText, setSearchText] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(true)
    const [page, setPage] = React.useState(1)
    const [limit, setLimit] = React.useState(25)

    const fetchData = async () => {
        try {
            const url = `${process.env.NEXT_PUBLIC_API_URL}/plannings`
            const data = await getDatas(url)
            console.log(`data`, data)
            setPlannings(data.result)
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        if (searchText === '') {
            fetchData()
        }
    }, [searchText])

    React.useEffect(() => {
        if (plannings && plannings[0]) {
            setIsLoading(false)
        }
    }, [plannings])

    React.useEffect(() => {
        fetchData()
    }, [page])

    React.useEffect(() => {
        fetchData()
    }, [])

    const router = useRouter()
    return (<>
        <Layout>
            {isLoading && <Loading />}
            {!isLoading && <div className="container">
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
                                placeholder="ค้นหาแผนงานด้วยชื่อ."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => {
                                if (searchText === '') {
                                    return
                                }
                                const newPlannings = plannings.filter((planning: any) => planning.title.includes(searchText))
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
                                        <td className=''>ชื่อ</td>
                                        <td className=''>วันที่</td>
                                        <td>ราคาน้ำมัน</td>
                                        <td>สถานะ</td>
                                        <td>เพิ่มเติม</td>
                                    </tr>
                                    {plannings && plannings.map((planning: any, index: number) => (
                                        <tr className='' key={index}>
                                            <td className=''>{planning.title}</td>
                                            <td className=''>{dayjs(planning.date as string).format('D MMMM BBBB')}</td>
                                            <td>{planning.oilPricePerLiter}</td>
                                            <td>{planning.status}</td>
                                            <td>
                                                <button className="btn btn-outline-primary" onClick={() => {
                                                    router.push('/dashboard/parcel-planning/detail/' + planning._id)
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
            </div>}
        </Layout>
    </>)
}
