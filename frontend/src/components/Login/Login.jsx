import React, { useId, useRef } from 'react'
import { Button, Input } from '../common'
import Register from '../Register/Register'
import { Link, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axiosClient from '../../utility/api/axiosClient'
import { getUser, setToken, setUser } from '../../utility/common'

function Login() {
    const inputRef = useRef();

    const { register, formState: { errors, isSubmitting }, handleSubmit, setError } = useForm({
        defaultValues: {
            email: 'r@gmail.com',
            password: '123456'
        }
    });

    const submitHan = async (data) => {
        try {

            const response = await axiosClient.post('/user/login', data);
            if (response.status == 200 && response.data.token !='' && response.data.user) {
                setToken(response.data.token);
                setUser(response.data.user); 
                window.location.reload();
            }
        } catch (error) {
            console.log(error)
            // if (error && error.response.status && error.response.status == 400 && error.response.data.error.length>0) {
            //     error.response.data.error.forEach(element => { 
            //         setError(element.path, {
            //             message: element.msg
            //         })
            //     });
            // }
            console.log("CATCH ERROR IN : Login : ")
        }
    }
    return (
        <>
            <div
                className="modal fade"
                id="login"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered "  >
                    <form action="" className="modal-content form" onSubmit={handleSubmit(submitHan)} >

                        <div className="modal-header justify-content-center" data-bs-theme="dark"   >
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
                        {errors.root && <p className="ValidationError text-center mt-2">{errors.root.message}</p>}
                        <div className="modal-body login">

                            <Input label="Email : " type="email" className="input" placeholder='Enter your Email Id... ' ref={inputRef}
                                {...register("email", {
                                    required: "email required"
                                })}
                            />
                            {errors.email && (<p className="ValidationError">{errors.email.message}</p>)}

                            <Input label="Password : " type="password" className="input" placeholder='Enter your password ... ' ref={inputRef}
                                {...register("password", {
                                    required: "password is required",
                                    minLength: {
                                        value: 6,
                                        message: "password must be at least 6 characters"
                                    }
                                })}
                            />
                            {errors.password && (<p className="ValidationError">{errors.password.message}</p>)}
                        </div>
                        <div className="modal-footer">
                            <Link className='fromLInk' data-bs-toggle="modal" data-bs-target="#register" >create new Account</Link>
                            < Button className=' rounded light ' type='submit' children='LogIn' />
                        </div>              
                    </form>
                </div>
            </div>
            <Register />

        </>
    )
}
export default Login
