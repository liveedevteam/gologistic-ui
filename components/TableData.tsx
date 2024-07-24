import React, { useEffect } from 'react'

export default function TableData(props: { data: any }) {
  const [isLoading, setIsLoading] = React.useState(true)
  const { data } = props || null

  useEffect(() => {
    console.log(data.result[0])
    if (data && data.result && data.result[0]) {
      setIsLoading(false)
    }
  }, [data])

  if (isLoading) return <div>Loading</div>
  else
    return (
      <>
        <div className='table-responsive'>
          <table className="table table-striped">
            <tbody className="table-light">
              {data.result.map((item: any, index: number) => {
                delete item._id
                delete item.__v
                if (index === 0) return (<tr className='' key={index}>
                  {Object.keys(item).map((key, index) => {
                    if (key !== "truck")
                      return (<td className='' key={index}>{key}</td>)
                    else if (key === "truck") {
                      {
                        Object.keys(item[key]).map((k: any, i: number) => {
                          return <td className='' key={i}>{k}</td>
                        })
                      }
                    }
                  })}
                </tr>)
                else return (<tr className='' key={index}>
                  {Object.values(item).map((value: any, index) => {
                    if (typeof value !== 'object')
                      return <td className='' key={index}>{value}</td>
                    else {
                      value.map((v: any, i: number) => {
                        console.log(`Truck`, v)
                        return <td className='' key={i}>{v}</td>
                      })
                    }
                  })}
                </tr>)
              })}
            </tbody>
          </table>
        </div>

      </>
    )
}
