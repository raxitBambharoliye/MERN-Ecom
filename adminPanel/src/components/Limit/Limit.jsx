import React from 'react'

export default function Limit({limit,onChangeHandler}) {
  return (
    <div className="limit">
            <select
              className="form-select form-select-sm"
              aria-label="Small select example"
              onChange={(e) => { onChangeHandler(parseInt(e.target.value)) }}
              value={limit}
            >
              <option value={10}>10</option>
              <option value={20}>20  </option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
  )
}
