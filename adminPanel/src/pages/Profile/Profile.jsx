import React, { useEffect, useRef, useState } from 'react'
import '../../assets/css/profile.css'
import Button from '../../components/Button/Button'
import { useSelector } from 'react-redux'
import { Input } from '../../components/form/index'
import { useForm } from 'react-hook-form'
import PreviewImage from '../../components/PreviewImage/PreviewImage'
import axiosClient from '../../utility/axiosClient'
import { setAdmin, setToken } from '../../common'
import { useDispatch } from 'react-redux'
import { login } from '../../store/authSlice'
import {APP_URL} from '../../constant/'

export default function Profile() {
    const admin = useSelector((state) => state.authReducer.admin);
    const [userData, setUserData] = useState(admin);
    const [isEdit, setIsEdit] = useState(false);
    const inputRef = useRef()

    const dispatch = useDispatch()

    useEffect(() => {
        setUserData(admin)
    }, [admin])

    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        defaultValues: {
            userName: userData.userName,
            email: userData.email,
            companyName: userData.companyName,
            phone: userData.phone,
            role: userData.role
        }
    });

    const editProfileSub = async (data) => {
        try {
            const formData = new FormData();
            if (data.profile[0]) {
                formData.append('profile', data.profile[0])
            }
            formData.append("userName", data.userName)
            formData.append("email", data.email)
            formData.append("companyName", data.companyName)
            formData.append("phone", data.phone)
            formData.append("adminId", userData._id)

            const response = await axiosClient.post(APP_URL.BE_EDIT_ADMIN_PROFILE, formData);
            if (response.status == 200 ) {
                setAdmin(response.data.admin);
                setToken(response.data.token);
                dispatch(login(response.data.admin));
                setIsEdit(!isEdit);
            }
        } catch (error) {
            console.log('error', error)
            console.log('error.response.data', error.response.data)
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
        <div className='container'>
            <h2 className='pageTitle'>profilePage</h2>
            <div className="row">
                <div className="col-12">
                    <div className="profilePreview">
                        <div className="d-md-flex align-items-center">
                            <div className="profileImage">
                                <img src={userData.profile ?? './image/profile.jpg'} alt="" />
                            </div>
                            <div className="profilePreviewData ps-sm-4">
                                <h3 className="name my-2 my-lg-0">{userData.userName}</h3>
                                <span className='profilePreviewSmData d-block d-sm-inline'><i className="fa-solid fa-user profileDataIcon" />{userData.role}</span>
                                <span className='profilePreviewSmData d-block d-sm-inline'><i className="fa-solid fa-envelope profileDataIcon" />{userData.email}</span>
                                <div className="adminDataOverview mt-lg-2 ">
                                    <div className="d-md-flex">
                                        <div className="adminDataOverviewItem mb-2 mt-2 text-center mb-lg-0">
                                            <div className="d-flex justify-content-center justify-content-lg-start align-items-center mb-1">
                                                <i className="fa-solid fa-boxes-stacked icon" />
                                                <h4 className='m-0'>200</h4>
                                            </div>
                                            <p className='m-0'>Product</p>
                                        </div>
                                        <div className="adminDataOverviewItem mb-2 mt-2 text-center mb-lg-0">
                                            <div className="d-flex justify-content-center justify-content-lg-start align-items-center mb-1">
                                                <i className="fa-solid fa-truck-fast icon" />
                                                <h4 className='m-0'>200</h4>
                                            </div>
                                            <p className='m-0'>Order</p>
                                        </div>
                                        <div className="adminDataOverviewItem mb-2 mt-2 text-center mb-lg-0">
                                            <div className="d-flex justify-content-center justify-content-lg-start align-items-center mb-1">
                                                <i className="fa-solid fa-truck icon" />
                                                <h4 className='m-0'>200</h4>
                                            </div>
                                            <p className='m-0'>Delivered</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 mt-4">
                    <div className="profileDetail">
                        <div className="card">
                            <div className="card-header p-3 ">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className='m-0'>Profile Details</p>
                                    {!isEdit && (<Button buttonClass="themButtonFill" onClick={(e) => { setIsEdit(!isEdit) }} ref={inputRef}>Edit</Button>)}

                                </div>
                            </div>
                            {isEdit ? (
                                <div className="card-body px-4">
                                    <form onSubmit={handleSubmit(editProfileSub)}>
                                        <PreviewImage ref={inputRef} src={userData.profile ?? './image/profile.jpg'}    {...register("profile")} />

                                        {/* email */}
                                        <div className="editProfileItem ">
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <label htmlFor={"profileEditEmail"} className={`form-label`}>Email : </label>
                                                </div>
                                                <div className="col-md-9">
                                                    <Input type="email" id={"profileEditEmail"} inputClass="themInput " placeholder="Enter your email id ..."
                                                        {...register("email", {
                                                            required: "Please enter your email",
                                                            email: "Please enter valid email"
                                                        })} ></Input>
                                                </div>
                                            </div>
                                        </div>
                                        {errors.email && <p className='validationError'>{errors.email.message}</p>}
                                        {/* company name */}
                                        <div className="editProfileItem ">
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <label htmlFor={"profileEditCompanyName"} className={`form-label`}>Company Name : </label>
                                                </div>
                                                <div className="col-md-9">
                                                    <Input type="text" id={"profileEditCompanyName"} inputClass="themInput " placeholder="Enter your Company Name ..."
                                                        {...register("companyName", {
                                                            required: "company name is required"
                                                        })}></Input>
                                                </div>
                                            </div>
                                        </div>
                                        {errors.companyName && <p className='validationError'>{errors.companyName.message}</p>}

                                        {/* user name */}
                                        <div className="editProfileItem ">
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <label htmlFor={"profileEditUserName"} className={`form-label`}>User Name : </label>
                                                </div>
                                                <div className="col-md-9">
                                                    <Input type="text" id={"profileEditUserName"} inputClass="themInput " placeholder="Enter your User Name ..."
                                                        {...register("userName", {
                                                            required: "user name is required"
                                                        })}></Input>
                                                </div>
                                            </div>
                                        </div>
                                        {errors.userName && <p className='validationError'>{errors.userName.message}</p>}
                                        {/* phone */}
                                        <div className="editProfileItem ">
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <label htmlFor={"profileEditPhone"} className={`form-label`}>Phone : </label>
                                                </div>
                                                <div className="col-md-9">
                                                    <Input type="text" id={"profileEditPhone"} inputClass="themInput " placeholder="Enter your Phone Number..."
                                                        {...register("phone", {
                                                            required: "Enter your phone number",
                                                            // pattern:/^(\+92)?[0-9]{10}$/||"Enter valid number"
                                                        })}></Input>
                                                </div>
                                            </div>
                                        </div>
                                        {errors.phone && <p className='validationError'>{errors.phone.message}</p>}
                                        <div className="text-end">

                                            <Button type="button" buttonClass="themButtonBorder me-2 " onClick={(e) => { setIsEdit(!isEdit) }} >Discard</Button>
                                            <Button type="submit" buttonClass="themButtonFill ">Save</Button>
                                        </div>
                                    </form>
                                </div>
                            ) :
                                (<div className="card-body">
                                    <ul  >  
                                        <li className='profileDetailItem row'><p className='title col-md-3'>user name : </p><p className='data col-md-9'>{userData.userName}</p></li>
                                        <li className='profileDetailItem row'><p className='title col-md-3'>Company name : </p><p className='data col-md-9'>{userData.companyName}</p></li>
                                        <li className='profileDetailItem row'><p className='title col-md-3'>Email : </p><p className='data col-md-9'>{userData.email}</p></li>
                                        <li className='profileDetailItem row'><p className='title col-md-3'>Phone : </p><p className='data col-md-9'>{userData.phone}</p></li>
                                        <li className='profileDetailItem row'><p className='title col-md-3'>Active : </p><p className='data col-md-9'>{userData.isActive ? "Active" : "deActive"}</p></li>
                                        <li className='profileDetailItem row'><p className='title col-md-3'>Post : </p><p className='data col-md-9'>{userData.role}</p></li>
                                    </ul>
                                </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
