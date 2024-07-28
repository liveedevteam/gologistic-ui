import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import SearchButton from './SearchButton'
import Loading from './Loading'

export default function TableData(props: {
  data: any,
  type: string,
  page?: number,
  setPage?: any
}) {
  const [isLoading, setIsLoading] = React.useState(true)
  const [pages, setPages] = React.useState([1])
  const {
    data,
    type
  } = props || null
  const buttonText = React.useState('')
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

  useEffect(() => {
    if (data && data.result && data.result[0]) {
      getPages(data)
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
  }, [data])

  if (isLoading) return <Loading />
  else
    return (
      <>
        <div className='d-flex flex-row-reverse'>
          <button className="btn btn-primary" onClick={() => {
            const path = `/dashboard/${type}/create`
            router.push(path)
          }}>
            <i className="bi bi-plus-circle"></i>&nbsp;&nbsp;เพิ่ม
          </button>
        </div>
        <div className='m-4'></div>
        <SearchButton />
        <div className='m-4'></div>
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
                console.log(item)
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
      </>
    )
}
