import React from 'react'

export default function SearchButton() {
    const [searchText, setSearchText] = React.useState('')
    return (
        <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="ค้นหาแผนงานด้วยเลขที่ กพ."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => {

            }}>
                <i className="bi bi-search"></i>
            </button>
        </div>
    )
}