import React from 'react'

function Button({
    children="Click me",
    type = 'button',
    className = '',
    them=true,
    ...props
},ref) {
    if (them) {
        className += ' btn-them';
    }
    return (
      
    <button type={type} className={`${className}`} {...props} ref={ref}>{children}</button>
  )
}

export default React.forwardRef(Button)
