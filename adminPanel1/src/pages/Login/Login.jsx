import React, { useEffect, useRef } from 'react'
import '../../assets/css/style.css'
import '../../assets/css/login.css'
import Button from '../../components/Button/Button'
import Logo from '../../components/Logo/Logo'
import { Input, PasswordInput } from '../../components/form'
import { useForm } from 'react-hook-form'
import axiosClient from '../../utility/axiosClient'
import { getAdmin, getToken, setAdmin, setToken } from '../../common'
import { Navigate, useNavigate } from 'react-router-dom'
import {APP_URL} from '../../constant/'

export default function Login() {
    const navigate=useNavigate()
    const token = getToken();
    const AdminData = getAdmin();
    if (token && AdminData) {
        return <Navigate to='/' />
    }

    const inputRef = useRef();
    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        defaultValues: {
            email: 'r@patel.com',
            password: "123456"
        }
    });

    const loginSubmit = async (data) => {
        try {
            const responseData = await axiosClient.post(APP_URL.BE_LOGIN_ADMIN, data);
            setToken(responseData.data.token);
            setAdmin(responseData.data.admin);
            navigate("/")

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
        <div className="d-flex vh-100 align-items-center justify-content-center">

            <div className="loginForm col-11 col-sm-7 col-lg-4">
                <div className="loginLogo my-3">
                    <Logo />
                </div>
                {errors.root && <p className='validationError'>{errors.root.message}</p>}

                <form onSubmit={handleSubmit(loginSubmit)}>
                    <Input type="email" inputClass="themInput" ref={inputRef} placeholder="Enter your Email Id ..." label="Email"
                        {...register("email", {
                            required: "Please enter your email"
                        })}
                    />
                    {errors.email && <p className='validationError'>{errors.email.message}</p>}
                    <PasswordInput inputClass="themInput" ref={inputRef} placeholder="Enter your Password ..." label="Password"
                        {...register("password", {
                            required: "Please enter your password",
                            email: "enter valid email address",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters long"
                            }
                        })}
                    />
                    {errors.password && <p className='validationError'>{errors.password.message}</p>}

                    <Button buttonClass='themButtonBorder' type='submit'>Submit</Button>
                </form>

            </div>
        </div>
    )
}
