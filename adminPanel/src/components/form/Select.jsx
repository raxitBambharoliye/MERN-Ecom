import React from 'react'

 function Select({options,...props},ref) {
  return (
    <div className="limit">
            <select
              className="form-select form-select-sm"
              aria-label="Small select example"
              {...props}
              ref={ref}
          >
              {options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>
    )
}


export default React.forwardRef(Select);