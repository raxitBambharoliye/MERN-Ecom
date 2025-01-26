import React, { useEffect, useRef, useState } from 'react'
import { Input } from '../../components/form'
import { useForm } from 'react-hook-form';
import PreviewImage from '../../components/PreviewImage/PreviewImage';
import Button from '../../components/Button/Button';
import axiosClient from '../../utility/axiosClient';
import { useSelector, useDispatch } from 'react-redux'
import { setViewData, setEditData, setSinglePreviewImage, cleanAllData } from '../../store/dataSlice';
import { APP_URL } from '../../constant'

export default function EditUser({
    id,
    page, totalLimit, search
}) {
    const editSt = useSelector((state) => state.dataReducer.editData);
    const editorAdmin = useSelector((state) => state.authReducer.admin)

    const [admin, setAdmin] = useState(editSt);
    const dispatch = useDispatch();
    const buttonRef = useRef();


    const { register, reset, handleSubmit, formState: { errors }, getValues } = useForm({
        defaultValues: {
            userName: admin.userName || '',
            email: admin.email || '',
            companyName: admin.companyName || '',
            phone: admin.phone || '',
            role: admin.role || '',
        }
    });

    useEffect(() => {
        setAdmin(editSt);
        console.log('editSt.profile', editSt.profile)
        if (editSt.profile)
            dispatch(setSinglePreviewImage(`${import.meta.env.VITE_BASE_URL}${editSt.profile}`));

        reset({
            userName: editSt.userName || '',
            email: editSt.email || '',
            phone: editSt.phone || '',
            profileImg: `${import.meta.env.VITE_BASE_URL}${editSt.profile}` || './image/dummy.jpg'
        })
    }, [editSt])

    const editUserSub = async (data) => {

        try {
            const formData = new FormData();
            if (data.userProfile[0]) {
                formData.append("userProfile", data.userProfile[0]);
            }
            formData.append("userName", data.userName);
            formData.append("email", data.email);
            formData.append("phone", data.phone);
            formData.append("password", data.password);
            formData.append("editor", editorAdmin._id);
            formData.append("userId", editSt._id);
            formData.append("page", page);
            formData.append("limit", totalLimit);
            formData.append("search", search);

            let response = await axiosClient.post(APP_URL.BE_EDIT_USER, formData)
            if (response.status === 200) {
                dispatch(setViewData(response.data.allUser))
                buttonRef.current.click();
                // dispatch(setEditData({}))
                dispatch(cleanAllData())

            }
        } catch (error) {
            console.log('error', error)
            if (error && error.response && error.response.status && error.response.status == 400 && error.response.data.error.length > 0) {
                error.response.data.error.forEach((element) => {
                    setError(element.path, {
                        message: element.msg
                    })
                });
            }
        }
    }
    const inputRef = useRef();



    return (
        <div
            className="modal fade"
            id={id}
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            data-bs-backdrop="static"
        >
            <div className="modal-dialog  modal-dialog-centered modal-lg">
                <form className="modal-content" onSubmit={handleSubmit(editUserSub)}>
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                            Edit User
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        />
                    </div>
                    <div className="modal-body">
                        <div className="card-body px-4">

                            <PreviewImage ref={inputRef} src={getValues('profileImg')}    {...register("userProfile")} />
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


                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <Button type="button" buttonClass="themButtonBorder me-2 " data-bs-dismiss="modal" ref={buttonRef} onClick={(e)=>{dispatch(cleanAllData())}} >Discard</Button>
                        <Button type="submit" buttonClass="themButtonFill ">Save</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
