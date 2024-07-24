import Layout from '@/components/Layout'
import TableData from '@/components/TableData'
import { getDatas } from '@/pages/api/callApi'
import React, { useEffect } from 'react'

export default function OilPrice() {
  const [oilPrice, setOilPrice] = React.useState(null) as any;
  const [page, setPage] = React.useState(1)
  const [limit, setLimit] = React.useState(10)
  const [isLoading, setIsLoading] = React.useState(true)

  const fetchOilPrice = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/oil-prices/?page=${page}&limit=${limit}`
      const data = await getDatas(url)
      setOilPrice(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (oilPrice && oilPrice.result && oilPrice.result[0]) {
      setIsLoading(false)
    }
  }, [oilPrice])

  useEffect(() => {
    fetchOilPrice()
  }, [])
  return (
    <>
      <Layout>
        <div className="container">
          <div className='m-3'></div>
          <h1>ราคาน้ำมัน</h1>
          <div className='m-4'></div>
          <div className="row">
            <div className="col-12">
              {!isLoading && <TableData data={oilPrice} />}
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
