import React, { useEffect, useRef, useState } from 'react'
import { Input } from '../../components/form'
import { useForm } from 'react-hook-form';
import PreviewImage from '../../components/PreviewImage/PreviewImage';
import Button from '../../components/Button/Button';
import axiosClient from '../../utility/axiosClient';
import { useSelector, useDispatch } from 'react-redux'
import { setViewData, setEditData, setSinglePreviewImage, setMultiPreviewImage, cleanAllData } from '../../store/dataSlice';
import { APP_URL } from '../../constant/'
import AddDataInput from '../../components/AddDataInput/AddDataInput'
import MultiPreviewImage from '../../components/PreviewImage/MultiPreviewImage';
import TextEditor from '../../components/form/TextEditor';
export default function EditProduct({
    id,
    page, totalLimit,
    search,
}) {
    const editData = useSelector((state) => state.dataReducer.editData);
    const editorAdmin = useSelector((state) => state.authReducer.admin)

    const [category, setCategory] = useState();
    const [admin, setAdmin] = useState(editData);
    const [removeImage, setRemoveImage] = useState([]);
    const dispatch = useDispatch();
    const buttonRef = useRef();

    useEffect(() => {
        (async () => {
            try {
                const response = await axiosClient.get(`${APP_URL.BE_ALL_CATEGORY}/0/0`);
                const categoryData = response.data.allCategory;
                let optionData = [];
                categoryData.forEach((element) => {
                    optionData.push({ value: element._id, text: element.categoryName });
                })
                setCategory(optionData)
            } catch (error) {
                console.log(`CATCH ERROR :: IN :: addProduct :: get category :: API :: 💀💀💀 :: \n ${error} `)

            }

        })()
    }, [])
    const { register, reset,control, handleSubmit, formState: { errors }, setError } = useForm({
        defaultValues: {
        }
    });

    useEffect(() => {
        if(editData.bannerImage)
            dispatch(setSinglePreviewImage(`${import.meta.env.VITE_BASE_URL}${editData.bannerImage}`));
        
        const mulImage = [];
        editData.mulImage?.forEach((element) => {
            mulImage.push(`${import.meta.env.VITE_BASE_URL}${element}`)
        })
        dispatch(setMultiPreviewImage(mulImage));
        console.log('editData.mulImage', editData.mulImage)
        reset({
            name: editData.name,
            description: editData.description,
            price: editData.price,
            discount: editData.discount,
            stock: editData.stock,
            inStock: editData.inStock,
            isActive: editData.isActive,
            categoryId: editData.categoryId,
            creator: editData.creator,
        })
    }, [editData])

    const editProductSub = async (data) => {
        try {
            const formData = new FormData();
            if (data.bannerImage) { formData.append("bannerImage", data.bannerImage[0]); }
            if (data.mulImage) {
                const mulFile = Array.from(data.mulImage);
                mulFile.forEach((image) => {
                    formData.append('mulImage', image);
                });
            }
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("price", data.price);
            formData.append("discount", data.discount);
            formData.append("stock", +data.stock);
            formData.append("inStock", false);
            formData.append("isActive", false);
            formData.append("categoryId", data.categoryId);
            formData.append("creator", admin._id);
            formData.append("removeImage", removeImage)
            formData.append("page", page)
            formData.append("search", search)
            formData.append("limit", totalLimit)
            formData.append("product_id", editData._id);
            const response = await axiosClient.post(`${APP_URL.BE_EDIT_PRODUCT}`, formData);
            console.log('response', response)
            dispatch(setViewData(response.data.allProduct))
            // dispatch(setEditData({}))
            dispatch(cleanAllData())            
        
            buttonRef.current.click();
        } catch (error) {
            console.log(`CATCH ERROR :: IN :: editCategorySub :: submitHandler :: API :: 💀💀💀 :: \n  `,error);
            if (error && error.response.status && error.response.status == 400 && error.response.data.error.length > 0) {
                error.response.data.error.forEach((element) => {
                    setError(element.path, {
                        message: element.msg
                    })
                });
            }
        }
    }
    const inputRef = useRef();
    const handleRemoveImage = (index) => {
        setRemoveImage(value => [...value, index]);
    }
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
                <form className="modal-content" onSubmit={handleSubmit(editProductSub)}>
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                            Edit Product
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
                            <PreviewImage src={editData.bannerImage} labelClass='mb-4' {...register("bannerImage",)} />
                            {errors.categoryImage && <p className='validationError text-left'>{errors.bannerImage   .message}</p>}

                            {/* name */}
                            <AddDataInput type="text" label={"Product Name : "} placeholder='Enter Product name ... ' ref={inputRef} inputClass='themInput'{...register("name", {
                                required: "Product name is required"
                            })} />
                            {errors.name && <p className='validationError text-center'>{errors.name.message}</p>}
                            {/*  description */}
                            {/* <AddDataInput type="text" label={"Product description : "} placeholder='Enter Product description ... ' ref={inputRef} inputClass='themInput'{...register("description", {
                                required: "Product description is required"
                            })} /> */}
                            <TextEditor defaultValue={editData.description} name={"description"} label='description : ' control={control} hight={350} />
                            {errors.description && <p className='validationError text-center'>{errors.description.message}</p>}

                            <div className="row">
                                <div className="col-md-5">
                                    {/*  price */}
                                    <AddDataInput type="number" label={"price : "} placeholder='Enter price ... ' ref={inputRef} inputClass='themInput'{...register("price", {
                                        required: "Product price is required"
                                    })} />
                                    {errors.price && <p className='validationError text-center'>{errors.price.message}</p>}
                                </div>
                                <div className="col-md-5">
                                    {/*  discount */}
                                    <AddDataInput type="number" label={" discount : "} placeholder='Enter  discount ... ' ref={inputRef} onChange={(e) => { setDiscount(parseInt(e.target.value)) }} inputClass='themInput'{...register("discount", {
                                        // required: "Product discount is required",
                                        validate: (value) => value >= 0 && value <= 100 || "Enter valid discount"
                                    })} />
                                    {errors.discount && <p className='validationError text-center'>{errors.discount.message}</p>}
                                </div>
                                <div className="col-md-2">
                                    {/* <p>Price: {discountPrice > 0 ? discountPrice : 0}</p> */}
                                </div>
                            </div>

                            {/*  stock */}
                            <AddDataInput type="number" label={"Product stock : "} placeholder='Enter Product stock ... ' ref={inputRef} inputClass='themInput'{...register("stock", {
                                required: "Product stock is required"
                            })} />
                            {errors.stock && <p className='validationError text-center'>{errors.stock.message}</p>}

                            {/*  categoryData */}
                            <AddDataInput type="select" options={category} label={"Product Category : "} placeholder='Enter Product Category ... ' ref={inputRef} inputClass='themInput'{...register("categoryId", {
                                required: "Product Category is required"
                            })} />
                            {errors.Category && <p className='validationError text-center'>{errors.Category.message}</p>}
                            {errors.categoryName && <p className='validationError text-center'>{errors.categoryName.message}</p>}
                            <MultiPreviewImage images={editData.mulImage} removeHandler={handleRemoveImage}
                             {...register("mulImage")}/>
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
