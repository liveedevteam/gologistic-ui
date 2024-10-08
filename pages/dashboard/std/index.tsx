import Layout from '@/components/Layout'
import TableData from '@/components/TableData'
import { getDatas } from '@/pages/api/callApi'
import React, { useEffect } from 'react'

export default function STD() {
  const [data, setData] = React.useState(null) as any;
  const [page, setPage] = React.useState(1)
  const [limit, setLimit] = React.useState(25)
  const [isLoading, setIsLoading] = React.useState(true)

  const fetchData = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/stds/?page=${page}&limit=${limit}`
      const data = await getDatas(url)
      setData(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [page])

  useEffect(() => {
    if (data && data.result && data.result[0]) {
      setIsLoading(false)
    }
  }, [data])

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <>
      <Layout>
        <div className="container">
          <div className='m-3'></div>
          <h1>STD</h1>
          <div className='m-4'></div>
          <div className="row">
            <div className="col-12">
              {!isLoading && <TableData
                data={data}
                setData={setData}
                type={`std`}
                page={page}
                setPage={setPage}
                fetchData={fetchData}
              />}
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
