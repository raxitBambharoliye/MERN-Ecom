import React from 'react'
import '../../assets/css/product.css'
import { Button } from '../common'
import { shortString } from '../../utility/common'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { changeSingleProductId } from '../../store/data.slice'
import { APP_URL } from '../constant'
function ProductItem({ product }) {
    console.log('product', product)

    const dispatch = useDispatch();

    return (
        <div className="productItem">
            <div className="productImage">
                <img src={`${import.meta.env.VITE_BASE_URL}${product.bannerImage}`} alt="" />
            </div>
            <div className="productData">
                <div className="productRating ">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>

                </div>
                <h3 className="productName" title={product.name}>{shortString(product.name, 14)}</h3>
                <h4 className="productPrice">${product.price * product.discount / 100} <span>${product.price}</span></h4>
                <div className="row align-items-center">
                    <div className="col-12 ">
                        <Link className='w-100 d-block'>
                            <Button className="productButton w-100">Buy Now </Button>
                        </Link>
                    </div>
                    <div className="col-12 ">
                        <Link to={`${APP_URL.FE_SINGLE_PRODUCT}/${product._id}`} className='w-100 d-block'><Button className="productButton mt-2 w-100" onClick={(e) => { dispatch(changeSingleProductId(product._id)) }} >Read More </Button></Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProductItem
