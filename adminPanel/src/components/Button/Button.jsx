import React from 'react'

function Button({
    type = 'button',
    children = 'click me ',
  buttonClass = '',
    ...props
},ref) {
  return (
      <button type={type} className={`btn ${buttonClass}`} ref={ref} {...props}>{children}</button>
  )
}

export default React.forwardRef(Button);
