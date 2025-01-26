import React, { useId } from 'react'

function InputFloat(
    {
        type = "text",
        inputClass = "",
        label = 'label',
        placeholder = "label",
        ...props
    }, ref
) {
    const Id = useId();
    return (
        <div className="form-floating mb-3  ">
            <input type={type} className={`form-control ${inputClass}`} id={Id} placeholder={placeholder} ref={ref}  {...props} />
            <label htmlFor={Id}>{label}</label>
         
        </div>
    )
}

export default React.forwardRef(InputFloat);