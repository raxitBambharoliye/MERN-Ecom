import React, { useEffect, useRef, useState } from 'react'
import { Button, Input, TextArea } from '../common'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axiosClient from '../../utility/api/axiosClient'
import { useDispatch, useSelector } from 'react-redux'
import { APP_URL } from '../constant'
import { setAddress } from '../../store/auth.slice'
import { shallowEqual } from '../../utility/common'

function EditAddress() {
    const inputRef = useRef();
    const auth = useSelector((state) => state.AuthReducer);
    const address = useSelector((state) => state.dataReducer.editAddress);



    const dispatch = useDispatch();
    const { register, formState: { errors }, handleSubmit, setError, setValue } = useForm();
    useEffect(() => {
        if (address) {
            setValue("title", address.title);
            setValue("address1", address.address1);
            setValue("address2", address.address2);
            setValue("city", address.city);
            setValue("state", address.state);
            setValue("pinCode", address.pinCode);
            setValue("country", address.country);
            setValue("mapLink", address.mapLink);

        }
    }, [address])
    const closeButtonRef = useRef();
    const submitHan = async (data) => {
        try {
            if (!auth.userData || !auth.userData._id) {
                setError('root', {
                    message: "User not logged in"
                })
                return;
            }
            console.log('address', address)
            if (!address || !address._id) {
                setError('root', {
                    message: "something want wrong."
                })
                return;
            }
            data.userId = auth.userData._id;
            data.id = address._id;
            const oldObject = {
                title: address.title,
                address1: address.address1,
                address2: address.address2,
                city: address.city,
                state: address.state,
                pinCode: address.pinCode,
                country: address.country,
                mapLink: address.mapLink
            }
            const newObject = {
                title: data.title,
                address1: data.address1,
                address2: data.address2,
                city: data.city,
                state: data.state,
                pinCode: data.pinCode,
                country: data.country,
                mapLink: data.mapLink
            }
            let checkChange = shallowEqual(oldObject, newObject);
            if (checkChange) {
                closeButtonRef.current.click();
                return;
            }
            const response = await axiosClient.post(APP_URL.BE_EDIT_ADDRESS, data);
            if (response && response.status === 200) {
                closeButtonRef.current.click();
                dispatch(setAddress(response.data.address));
            }
        } catch (error) {
            console.log("test", error)
            console.log('error.response', error.response)

            if (error && error.response.status && error.response.status == 400 && error.response.data.error.length > 0) {
                error.response.data.error.forEach(element => {
                    setError(element.path, {
                        message: element.msg
                    })
                });
            }
            console.log("CATCH ERROR IN : Login : ")
        }
    }
    return (
        <>
            <div className="modal fade " id="EditAddressModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered "  >
                    <form action="" className="modal-content form" onSubmit={handleSubmit(submitHan)} >
                        <div className="modal-header justify-content-center"    >
                            <h1 className="text-center flex-grow-1" id="staticBackdropLabel">Light Store</h1>
                            <button type="button" className="btn-close text-white" data-bs-dismiss="modal" aria-label="Close" ref={closeButtonRef} />
                        </div>
                        <div className="modal-body">
                            {errors.root && (<p className="ValidationError">{errors.root.message}</p>)}

                            {/* address Title */}
                            <Input label="Address Title" type="text" className=" bd-bark " placeholder='Enter Address Title... ' ref={inputRef}{...register("title", { required: "Address Title is required" })} />
                            {errors.title && (<p className="ValidationError">{errors.title.message}</p>)}

                            {/* address 1 */}
                            <Input label="Address 1" type="text" className=" bd-bark " placeholder='20, soc. name, area name.' ref={inputRef} {...register("address1", { required: "address  required" })} />
                            {errors.address1 && (<p className="ValidationError">{errors.address1.message}</p>)}

                            {/* address 2 */}
                            <Input label="Address 2(optional)" type="text" className=" bd-bark " placeholder='20, soc. name, area name.' ref={inputRef} {...register("address2")} />
                            {errors.address2 && (<p className="ValidationError">{errors.address2.message}</p>)}

                            {/* city & state */}
                            <div className="row">
                                <div className="col-6">
                                    <Input label="City" type="text" className=" bd-bark " placeholder='Enter Your city ' ref={inputRef} {...register("city", { required: "city is required" })} />
                                    {errors.city && (<p className="ValidationError">{errors.city.message}</p>)}

                                </div>
                                <div className="col-6">
                                    <Input label="State" type="text" className=" bd-bark " placeholder='Enter Your state. ' ref={inputRef} {...register("state", { required: "state is required" })} />
                                    {errors.state && (<p className="ValidationError">{errors.state.message}</p>)}

                                </div>
                            </div>
                            {/* country & pincode */}
                            <div className="row">
                                <div className="col-6">
                                    <Input label="Country" type="text" className=" bd-bark " placeholder='Enter Your country ' ref={inputRef} {...register("country", { required: "country is required" })} />
                                    {errors.country && (<p className="ValidationError">{errors.country.message}</p>)}

                                </div>
                                <div className="col-6">
                                    <Input label="Pin code" type="number" className=" bd-bark " placeholder='Enter Your pin code. ' ref={inputRef} {...register("pinCode", { required: "pin code is required", pattern: { value: /^[0-9]{6}$/, message: "PNI code must be  6 digits" }, })} />
                                    {errors.pinCode && (<p className="ValidationError">{errors.pinCode.message}</p>)}
                                </div>
                            </div>
                            {/* map link */}
                            <Input label="Map Link (optional)" type="url" className=" bd-bark " placeholder='Enter your map link. ' ref={inputRef} {...register("mapLink")} />
                            {errors.mapLink && (<p className="ValidationError">{errors.mapLink.message}</p>)}

                        </div>
                        <div className="modal-footer">
                            < Button className=' rounded  ' type='submit' children='Edit Address' />
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}
export default EditAddress
