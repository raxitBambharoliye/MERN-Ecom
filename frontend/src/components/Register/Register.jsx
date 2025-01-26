import React, { useId, useRef } from 'react';
import { Button, Input } from '../common';
import { useForm } from 'react-hook-form';
import axiosClient from '../../utility/api/axiosClient';
import { setToken, setUser } from '../../utility/common';

function Register() {
    const inputRef = useRef();
    const { register, handleSubmit, formState: { errors }, getValues,setError } = useForm();


    const registerSubmit = async (data) => {
        try {
            const response = await axiosClient.post('/user/register', data)
            if (response.status === 200 && response.data.token !='' && response.data.user) { 
                setToken(response.data.token);
                setUser(response.data.user); 
                window.location.reload();
            }
            console.log(response.data)
        } catch (error) {
            console.log('error', error)
            if (error && error.response.status == 400) {
                error.response.data.error.forEach(element => {
                    setError(element.path, {
                        message: element.msg
                    })
                });
            }
        }
    }

    return (
        <div
            className="modal fade"
            id="register"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <form action="" className="modal-content form" onSubmit={handleSubmit(registerSubmit)}>
                    <div className="modal-header justify-content-center" data-bs-theme="dark">
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
                        <Input label="Email : " type="email" className="input" placeholder='Enter your Email Id... ' ref={inputRef}
                            {...register("email", {
                                required: "email required",
                            })}
                        />
                        {errors.email && <p className="ValidationError">{errors.email.message}</p>}

                        <Input label="User Name : " type="text" className="input" placeholder='Enter your user name... ' ref={inputRef}
                            {...register("userName", {
                                required: "user name required"
                            })}
                        />
                        {errors.userName && <p className="ValidationError">{errors.userName.message}</p>}

                        <Input label="Password : " type="password" className="input" placeholder='Enter your password ... ' ref={inputRef}
                            {...register("password", {
                                required: "password required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters long"
                                }
                            })}
                        />
                        {errors.password && <p className="ValidationError">{errors.password.message}</p>}

                        <Input label="Conform Password : " type="password" className="input" placeholder='Conform your password ... ' ref={inputRef}
                            {...register("CPassword", {
                                required: "conform password required ",
                                validate: value => value == getValues("password") || "password not matching"
                            })}
                        />
                        {errors.CPassword && <p className="ValidationError">{errors.CPassword.message}</p>}

                    </div>
                    <div className="modal-footer">
                        <Button className="rounded light" type="submit" children="Sign Up" ref={inputRef} />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
