import React, { useId } from 'react'

function Input({
    type = "text",
    className = "",
    label,
    labelClass = '',
    ...props
}, ref) {
    const id=useId()
    return (
        <div className="mb-3">
            {label && <label htmlFor={id} className={`form-label ${labelClass}`}>{label}</label>}
            <input
                type={type}
                className={`form-control  ${className}`}
                id={id}
                ref={ref}
                {...props}
            />
        </div>
    )
}

export default React.forwardRef(Input)
