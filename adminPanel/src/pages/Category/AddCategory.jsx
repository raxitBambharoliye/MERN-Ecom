import React, { useRef } from 'react'
import AddDataInput from '../../components/AddDataInput/AddDataInput'
import Button from '../../components/Button/Button'
import { useForm } from 'react-hook-form'
import PreviewImage from '../../components/PreviewImage/PreviewImage'
import axiosClient from '../../utility/axiosClient'
import { useSelector } from 'react-redux'
import {APP_URL} from '../../constant/'
import {useNavigate } from 'react-router-dom'

export default function AddCategory() {
  const admin = useSelector((state) => state.authReducer.admin);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors },  setError } = useForm();
  const inputRef = useRef();
  const addSub = async (data) => {
    try {
      const formData = new FormData();
      if (data.categoryImage[0]) {
        formData.append("categoryImage", data.categoryImage[0]);
      }
      formData.append("categoryName", data.categoryName);
      formData.append("creator",admin._id)
      let response = await axiosClient.post(APP_URL.BE_ADD_CATEGORY, formData)
      console.log('response', response.data)  
      if (response.status == 200) {
        navigate(APP_URL.RE_VIEW_CATEGORY_PAGE)
      }
    } catch (error) {
      console.log('error', error)
      if (error && error.response.status && error.response.status == 400 && error.response.data.error.length > 0) {
        error.response.data.error.forEach((element) => {
          setError(element.path, {
            message: element.msg
          })  
        });
      }
    }
  }
  return (
    <div className="container ">
      <h2 className='pageTitle'>Add Category</h2>
      <div className="addDataFrom">
        <form onSubmit={handleSubmit(addSub)}>
          <PreviewImage labelClass='mb-4' {...register("categoryImage", {
            required:"category image is required "
          })} />
          {errors.categoryImage && <p className='validationError text-left'>{errors.categoryImage.message}</p>}

          <AddDataInput type="text" label={"Category Name : "} placeholder='Enter category name ... ' ref={inputRef} inputClass='themInput'{...register("categoryName", {
            required: "company name is required"
          })} />
          {errors.categoryName && <p className='validationError text-center'>{errors.categoryName.message}</p>}

          <div className="text-end">
            <Button buttonClass="themButtonFill" type='submit' ref={inputRef} >Add Category</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
