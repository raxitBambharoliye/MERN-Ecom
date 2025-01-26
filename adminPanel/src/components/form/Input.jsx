import React, { useId } from 'react'

function Input({
    type = "text",
    inputClass = "",
    labelClass="",
    label,
    parentClass="",
    id,
    margin=true,
    ...pros

}, ref) {
    const Id =id?id: useId();
    return (
        <div className={`${margin && 'mb-3 '}${parentClass}`}>
            {label && (<label htmlFor={Id} className={`form-label ${labelClass}`}>{ label}</label>)}
            <input type={type} className={`form-control ${inputClass}`} id={Id} {...pros} ref={ref} />
        </div>
    )
}

export default React.forwardRef(Input)
