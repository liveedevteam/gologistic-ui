import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import SearchButton from './SearchButton'
import Loading from './Loading'
import { importData } from '@/pages/api/callApi'

export default function TableData(props: {
  data: any,
  setData: any,
  type: string,
  page?: number,
  setPage?: any,
  fetchData?: any
}) {
  const [isLoading, setIsLoading] = React.useState(true)
  const [pages, setPages] = React.useState([1])
  const {
    data,
    setData,
    type,
    fetchData
  } = props || null
  const [searchText, setSearchText] = React.useState('')
  const router = useRouter()

  const getPages = (data: any) => {
    const total = data.total
    const limit = data.totalPerPage
    const pages = Math.ceil(total / limit)
    const pagesArray = []
    for (let i = 1; i <= pages; i++) {
      pagesArray.push(i)
    }
    setPages(pagesArray)
    return pagesArray
  }

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0]
    setIsLoading(true)
    const uploadConfirm = confirm('Are you sure you want to import this file?')
    if (uploadConfirm) {
      try {
        await importData(type, file)
        fetchData()
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    if (data && data.result && searchText === '') {
      getPages(data)
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
  }, [data])

  return (
    <>
      <div className='d-flex flex-row-reverse'>
        <button className="btn btn-primary" onClick={() => {
          const path = `/dashboard/${type}/create`
          router.push(path)
        }}>
          <i className="bi bi-plus-circle"></i>&nbsp;&nbsp;เพิ่ม
        </button>
        <div className='m-2'></div>
        <button className="btn btn-primary">
          <label className="btn btn-primary" htmlFor="fileInput">
            <input
              type="file"
              id="fileInput"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <i className="bi bi-file-earmark-arrow-down"></i>&nbsp;&nbsp;Import Excel
          </label>
        </button>
      </div>
      {
        type !== 'oilPrice' && <>
          <div className='m-4'></div>
          <SearchButton
            data={data}
            setData={setData}
            searchText={searchText}
            setSearchText={setSearchText}
            fetchData={props.fetchData}
          />
        </>
      }
      <div className='m-4'></div>
      {isLoading && <Loading />}
      {!isLoading && data && data.result && data.result[0] && <>
        <div className='table-responsive'>
          <table className="table table-striped">
            <tbody className="table-light">
              {type === 'oilPrice' && <tr>
                <th>Type</th>
                <th>Key</th>
                <th>Price Per Liter</th>
                <th>Distance</th>
                <th>See More</th>
              </tr>}
              {
                type !== 'oilPrice' && <tr>
                  <th>PEA Code</th>
                  <th>Description</th>
                  <th>Unit</th>
                  {
                    type === 'std' && <th>Price</th>
                  }
                  {
                    (type === 'stock' || type === 'weight') && <th>Package</th>
                  }
                  {
                    type === 'weight' && <th>Weight</th>
                  }
                  {
                    type === 'weight' && <th>Total Weight</th>
                  }
                  <th>See More</th>
                </tr>
              }
              {data.result.map((item: any, index: number) => {
                // console.log(item)
                if (type === 'oilPrice') {
                  return <tr key={index}>
                    <td>{item.type}</td>
                    <td>{item.key}</td>
                    <td>{item.priceLiter}</td>
                    <td>{item.distance}</td>
                    <td>
                      <button className="btn btn-outline-primary" onClick={() => {
                        router.push(`/dashboard/oil-price/${item._id}`)
                      }}>
                        <i className="bi bi-eye"></i>
                      </button>
                    </td>
                  </tr>
                }
                else return <tr key={index}>
                  <td>{item.peaCode}</td>
                  <td>{item.description}</td>
                  <td>{item.unit}</td>
                  {
                    type === 'std' && <td>{item.price}</td>
                  }
                  {
                    (type === 'stock' || type === 'weight') && <td>{item.package}</td>
                  }
                  {
                    type === 'weight' && <td>{item.weight}</td>
                  }
                  {
                    type === 'weight' && <td>{item.totalWeight}</td>
                  }
                  <td>
                    <button className="btn btn-outline-primary" onClick={() => {
                      router.push(`/dashboard/oil-price/${item._id}`)
                    }}>
                      <i className="bi bi-eye"></i>
                    </button>
                  </td>
                </tr>
              })}
            </tbody>
          </table>
          <div className='m-4'></div>
          <div className='d-flex justify-content-center'>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous" onClick={() => {
                    let currentPage = props.page as number
                    if (currentPage === 1) return
                    if (currentPage > 1) props.setPage(currentPage - 1)
                  }}>
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">{props.page}</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next" onClick={() => {
                    let currentPage = props.page as number
                    if (currentPage === pages.length) return
                    if (currentPage < pages.length) props.setPage(currentPage + 1)
                  }}>
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </>}
    </>
  )
}
