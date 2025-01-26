import React, { useId } from 'react'
import { Input, PasswordInput } from '../form'
import Select from '../form/Select';

 function AddDataInput(
    {
        type = "text",
        inputClass = "",
        labelClass = "",
        label,
         id,
        options=[],
        ...pros
    },ref
) {
     const Id = id ? id : useId();
    const selectInput = ()=>
     {
        switch(type){
            case "password":
                return <PasswordInput id={Id} margin={false} inputClass={inputClass} {...pros} />;
           
            case "select":
                return <Select options={options} id={Id} {...pros} />;
            default:
                return <Input margin={false} type={type} id={Id} inputClass={inputClass} {...pros}></Input>;
        }   
    }
    return (
        <div className="row align-items-center mb-4" ref={ref}>
            <div className="col-md-3">
                <label htmlFor={Id} className={`form-label m-0 ${labelClass}`}>{label}</label>
            </div>
            <div className="col-md-9">
               
                {selectInput()}
                
            </div>
        </div>
    )
}
export default React.forwardRef(AddDataInput)