import React, { useEffect } from 'react'

export default function SearchButton(props: {
    data: any,
    setData: any,
    searchText: string,
    setSearchText: any,
    fetchData?: any
}) {
    const {
        data,
        setData,
        searchText,
        setSearchText,
        fetchData
    } = props || null

    const searchTextByPeaCode = async () => {
        if (searchText === '') {
            fetchData()
        } else {    
            const newData = { ...props.data }
            const result = props.data.result.filter((item: any) => {
                return item.peaCode.includes(searchText)
            })
            newData.result = result
            setData(newData)
        }
    }

    useEffect(() => {
        if (searchText === '') {
            fetchData()
        }
    }, [searchText])

    return (
        <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="ค้นหาแผนงานด้วยเลขที่ กพ."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={searchTextByPeaCode}>
                <i className="bi bi-search"></i>
            </button>
        </div>
    )
}