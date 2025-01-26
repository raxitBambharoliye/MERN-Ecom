import React, { useId } from 'react'

function Search({
    inputClass = "",
    parentClass="col-3 ",
    id,
    margin=true,
    ...pros

}, ref) {
    const Id =id?id: useId();
    return (
        <div className={`${margin && 'mb-3 '}${parentClass} position-relative searchInput`}>
           <label  className={`form-label position-absolute`}><i className="fa-solid fa-magnifying-glass"/></label>
            <input type="search" className={`form-control themInput ${inputClass}`}  {...pros} ref={ref}  />
        </div>
    )
}

export default React.forwardRef(Search)
