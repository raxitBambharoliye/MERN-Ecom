import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input } from '../common';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../../utility/api/axiosClient';
import { setUser } from '../../utility/common';
import { setLogin } from '../../store/auth.slice';

function EditProfile() {
    const auth = useSelector((state) => state.AuthReducer);
    const [user, setUserData] = useState(auth.userData);
    const [image, setImage] = useState('./image/userPro.png');
    const dispatch = useDispatch();
    useEffect(() => {
        setUserData(auth.userData);
    }, [auth]);

    const inputRef = useRef();
    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        defaultValues: {
            userName: user.userName,
            email: user.email,
            phone: user.phone
        }
    });
    const editProfileSubmit = async (data) => {
        try {
            let fromData = new FormData();
            if (data.userProfile[0]) {
                fromData.append("userProfile", data.userProfile[0]);
                }
            fromData.append("email", data.email);
            fromData.append("userName", data.userName);
            fromData.append("userId", auth.userData._id);
            if (data.phone) { fromData.append("phone", data.phone); }

            let resData = await axiosClient.post('/user/editProfile', fromData)
            console.log('resData.data.user :: RRR ', resData.data.user)
            if (resData.status === 200 && resData.data.user) {
                setUser(resData.data.user);
                dispatch(setLogin(resData.data.user));
                window.location.reload();
            }
        } catch (error) {
            console.log("catch error", error)
            if (error && error.response && error.response.status == 400 && error.response.data.error.length > 0) {
                error.response.data.error.forEach(element => {
                    setError(element.path, {
                        message: element.msg
                    })
                });
            }
            console.log("CATCH ERROR IN : Login : ")
        }
    }
    const previewHandle = (e) => {
        console.log('check ')
        console.log('e.target.files[0]', e.target.files[0])
        setImage(URL.createObjectURL(e.target.files[0]))
    }
    return (
        <div
            className="modal fade"
            id="EditProfile"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered modal-lg" >
                <form action="" className="modal-content modalCum" onSubmit={handleSubmit(editProfileSubmit)} >
                    <div className="modal-header justify-content-center " >
                        <h1 className="text-center flex-grow-1" id="staticBackdropLabel">
                            Light Store
                        </h1>
                        <button
                            type="button"
                            className="btn-close text-white"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        />
                    </div>
                    <div className="modal-body login">
                        <div className="row">
                            <div className="col-2">
                                <label className="editProfileImg" htmlFor='proImg'>
                                    {auth.userData.userProfile ? (
                                        <img src={auth.userData.userProfile} className='position-absolute top-50 start-50 translate-middle ' alt="profileImage" />
                                    ) : (
                                        <img src={image} className='position-absolute top-50 start-50 translate-middle ' alt="profileImage" />
                                    )}

                                    <p className='position-absolute top-50 start-50 translate-middle text-white '><i className="fa-solid fa-pen-nib" /></p>
                                </label>
                                <Input type='file' id="proImg" className="visually-hidden" {...register("userProfile")} accept='jpg jpeg png' onChange={previewHandle} />
                            </div>
                            <div className="col-9">
                                <Input label="Email : " type="email" className="input bd-bark " placeholder='Enter your Email Id... ' ref={inputRef}
                                    {...register("email", {
                                        required: "email required",
                                    })}
                                />
                                {errors.email && <p className="ValidationError">{errors.email.message}</p>}

                                <Input label="User Name : " type="text" className="input bd-bark " placeholder='Enter your user name... ' ref={inputRef}
                                    {...register("userName", {
                                        required: "user name required"
                                    })}
                                />
                                {errors.userName && <p className="ValidationError">{errors.userName.message}</p>}

                                <Input label="Phone Number : " type="number" className="input bd-bark " placeholder='Enter phone number ... ' ref={inputRef}
                                    {...register("phone", {
                                        maxLength: {
                                            value: 10,
                                            message: "Phone number must be at least 10 characters"
                                        },
                                        minLength: {
                                            value: 10,
                                            message: "Phone number must be at least 10 characters"
                                        }
                                    })}
                                />
                                {errors.phone && <p className="ValidationError">{errors.phone.message}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <Button className="rounded " type="submit" children="Edit" ref={inputRef} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfile
