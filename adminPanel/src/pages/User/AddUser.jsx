import React, { useRef } from 'react'
import AddDataInput from '../../components/AddDataInput/AddDataInput'
import Button from '../../components/Button/Button'
import { useForm } from 'react-hook-form'
import PreviewImage from '../../components/PreviewImage/PreviewImage'
import axiosClient from '../../utility/axiosClient'
import {useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { APP_URL } from '../../constant'

export default function AddUser() {
  const navigate =useNavigate()

  const adminData = useSelector((state) => state.authReducer.admin);
  const { register, handleSubmit, formState: { errors }, getValues, setError } = useForm(
    {
      defaultValues:{
        userName:'t',
        email:"t@gmail.com",
        companyName:"RADHE TEST",
        phone:"1234567890",
        role:"manager",
        password:"123456",
        CPassword:"123456"
      }
    }
  );
  const inputRef = useRef();

  const addUserSb = async (data) => {
    try {
      const formData = new FormData();
      if (data.userProfile[0]) {
        formData.append("userProfile", data.userProfile[0]);
      }
      formData.append("userName", data.userName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("password", data.password);
      formData.append("editor",adminData._id)
      let response = await axiosClient.post(APP_URL.BE_ADD_USER , formData)
      if (response.status === 200) {
        navigate(APP_URL.RE_VIEW_USER_PAGE);  
      }
    } catch (error) {
      console.log('error', error)
      // if (error && error.response && error.response.status && error.response.status == 400 && error.response.data.error.length > 0) {
      //   error.response.data.error.forEach((element) => {
      //     setError(element.path, {
      //       message: element.msg
      //     })
      //   });
      // }
    }
  }
  return (
    <div className="container ">
      <h2 className='pageTitle'>Add User</h2>
      <div className="addDataFrom">
        <form onSubmit={handleSubmit(addUserSb)}>
          <PreviewImage labelClass='mb-4' {...register("userProfile")} />
          <AddDataInput type='text' label={"User Name : "} placeholder='Enter admin user name ... ' ref={inputRef} inputClass='themInput'{...register("userName", {
            required: "user name is required"
          })} />
          {errors.userName && <p className='validationError text-center'>{errors.userName.message}</p>}

          <AddDataInput type='email' label={"Email : "} placeholder='Enter admin Email ID ... ' ref={inputRef} inputClass='themInput' {...register("email", {
            required: "email is required"
          })} />
          {errors.email && <p className='validationError text-center'>{errors.email.message}</p>}

          <AddDataInput type="text" label={"Phone Number : "} placeholder='Enter admin phone number ... ' ref={inputRef} inputClass='themInput'{...register("phone", {
            required: "phone number is required"
          })} />
          {errors.phone && <p className='validationError text-center'>{errors.phone.message}</p>}


          <AddDataInput type="password" label={"Password : "} placeholder='Enter admin password ... ' ref={inputRef} inputClass='themInput' {...register("password", {
            required: "password is required",
            minLength: {
              value: 6,
              message: "password must be at least 6 characters long"
            }
          })} />
          {errors.password && <p className='validationError text-center'>{errors.password.message}</p>}

          <AddDataInput type="password" label={"Conform Password : "} placeholder='Conform admin password ... ' ref={inputRef} inputClass='themInput' {...register("CPassword", {
            required: "conform password is required",
            validate: value => value == getValues("password") || "Password not match"
          })} />
          {errors.CPassword && <p className='validationError text-center'>{errors.CPassword.message}</p>}

          <div className="text-end">
            <Button buttonClass="themButtonFill" type='submit' ref={inputRef} >Add User </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
