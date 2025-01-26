import React from 'react'

function TextArea(
    {
        label,
        className = '',
        placeholder=" ",
        ...props
    }, ref
) {
    const id = React.useId()
    return (
        <div className="form-floating">
            <textarea
                className={`form-control ${className}`}
                placeholder={placeholder}
                id={id}
                defaultValue={""}
                {...props}
                ref={ref}
            />
            <label htmlFor={id}>{ label}</label>
        </div>
    )
}

export default React.forwardRef(TextArea)
