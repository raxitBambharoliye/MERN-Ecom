import React, { useRef } from 'react'
import { Button, TextArea } from '../common'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axiosClient from '../../utility/api/axiosClient'
import { useDispatch, useSelector } from 'react-redux'
import { setSingleProductReview, setSingleProductSummary } from '../../store/data.slice'

function AddReview() {
    const { id } = useParams();
    const auth = useSelector((state) => state.AuthReducer);
    const dispatch = useDispatch();
    const { register, formState: { errors }, handleSubmit, setError } = useForm();
    const closeButtonRef = useRef();
    const submitHan = async (data) => {
        try {
            if (!id) {
                setError('root', {
                    message: "Product not found"
                })
                return;
            }
            if (!auth.userData || !auth.userData._id) {
                setError('root', {
                    message: "User not logged in"
                })
                return;
            }
            data.userId = auth.userData._id;
            data.productId = id;
            const response = await axiosClient.post('/user/addProductReview', data);
            if (response && response.status === 200) {
                closeButtonRef.current.click();
                dispatch(setSingleProductSummary(response.data.reviewSummary));
                dispatch(setSingleProductReview(response.data.reviewData));
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
            <div
                className="modal fade"
                id="AddProductReview"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered "  >
                    <form action="" className="modal-content form" onSubmit={handleSubmit(submitHan)} >
                        <div className="modal-header justify-content-center"    >
                            <h1 className="text-center flex-grow-1" id="staticBackdropLabel">
                                Light Store
                            </h1>
                            <button
                                type="button"
                                className="btn-close text-white"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                ref={closeButtonRef}
                            />
                        </div>
                        <div className="modal-body">
                            {errors.root && (<p className="ValidationError">{errors.root.message}</p>)}
                            {errors.userId && (<p className="ValidationError">{errors.userId.message}</p>)}
                            {errors.productId && (<p className="ValidationError">{errors.productId.message}</p>)}

                            <div className="rating">
                                <div id="full-stars-example-two" className='mb-2'>
                                    <div id="full-stars-example-two">
                                        <div className="rating-group">
                                            <input disabled defaultChecked className="rating__input rating__input--none" id="rating3-none" defaultValue={0} type="radio" name='rating' />
                                            <label aria-label="1 star" className="rating__label" htmlFor="rating3-1">
                                                <i className="rating__icon rating__icon--star fa fa-star" />
                                            </label>
                                            <input className="rating__input" id="rating3-1" defaultValue={1} type="radio" {...register("rating", { required: "rating is required." })} />
                                            <label aria-label="2 stars" className="rating__label" htmlFor="rating3-2">
                                                <i className="rating__icon rating__icon--star fa fa-star" />
                                            </label>
                                            <input className="rating__input" id="rating3-2" defaultValue={2} type="radio" {...register("rating", { required: "rating is required." })} />
                                            <label aria-label="3 stars" className="rating__label" htmlFor="rating3-3">
                                                <i className="rating__icon rating__icon--star fa fa-star" />
                                            </label>
                                            <input className="rating__input" id="rating3-3" defaultValue={3} type="radio" {...register("rating", { required: "rating is required." })} />
                                            <label aria-label="4 stars" className="rating__label" htmlFor="rating3-4">
                                                <i className="rating__icon rating__icon--star fa fa-star" />
                                            </label>
                                            <input className="rating__input" id="rating3-4" defaultValue={4} type="radio" {...register("rating", { required: "rating is required." })} />
                                            <label aria-label="5 stars" className="rating__label" htmlFor="rating3-5">
                                                <i className="rating__icon rating__icon--star fa fa-star" />
                                            </label>
                                            <input className="rating__input" id="rating3-5" defaultValue={5} type="radio" {...register("rating", { required: "rating is required." })} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {errors.rating && (<p className="ValidationError">{errors.rating.message}</p>)}
                            <TextArea rows="4" className="addReviewInput" cols="50" maxlength="160" label="Add Your Review" {...register("reviewMessage", {
                                required: "review Message is required",
                                maxLength: { value: 150, message: "message length must be less than 150 characters" }
                            })} />
                            {errors.reviewMessage && (<p className="ValidationError">{errors.reviewMessage.message}</p>)}

                        </div>
                        <div className="modal-footer">
                            < Button className=' rounded  ' type='submit' children='Add Review' />
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}
export default AddReview
