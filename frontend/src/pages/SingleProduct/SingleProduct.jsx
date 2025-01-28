import React, { useEffect, useState } from 'react'
import { Button, Input } from '../../components'
import '../../assets/css/singleProduct.css'
import axiosClient from '../../utility/api/axiosClient';
import url from '../../components/constant/url';
import { useParams } from 'react-router-dom';
import AddReview from '../../components/AddReview/AddReview';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleProductReview, setSingleProductSummary } from '../../store/data.slice';
function SingleProduct() {
  const stateData = useSelector((state) => state.dataReducer);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [bannerImage, setBannerImage] = useState();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1)
  const [singleProduct, setSingleProduct] = useState({});
  const [singleProductReview, setSingleProductReviewState] = useState(stateData.singleProductReview);
  const [singleProductReviewSummary, setSingleProductReviewSummary] = useState(stateData.singleProductSummary);
  const auth = useSelector((state) => state.AuthReducer);
  if (!id) {
    return (<><h1>Product not found</h1></>)
  }
  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const response = await axiosClient(`${url.BE_GET_SINGLE_PRODUCT}/${id}`)
        console.log('response', response)
        if (response && response.status == 200) {
          setSingleProduct(response.data.productData)
          dispatch(setSingleProductSummary(response.data.reviewSummary));
          dispatch(setSingleProductReview(response.data.reviewData));
        }
        console.log('response', response)
        console.log(response.data);
        setLoading(false)
      } catch (error) {
        console.log('CATCH ERROR : IN : get single product : API', error)
      }
    })()
  }, [])
  useEffect(() => {
    if (singleProduct && singleProduct.bannerImage) {
      setBannerImage(singleProduct.bannerImage)
    }
  }, [singleProduct])

  useEffect(() => {
    setSingleProductReviewState(stateData.singleProductReview);
    setSingleProductReviewSummary(stateData.singleProductSummary);
  },[stateData.singleProductSummary,stateData.singleProductReview])

  if (loading || !singleProduct || !singleProduct.mulImage) {
    return (<><h1>loading</h1></>)
  }
  return (
    <>
      <section className='singleProductData'>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-lg-6">
              <div className=" singleProductLeft">
                <div className="row gx-2">
                  <div className="col-12 col-lg-2 order-last order-lg-first">
                    <div className="ProductsSmallImages">
                      <div className="row d-lg-block bg-red  spanRow">
                        {singleProduct.mulImage.map((image, index) => (
                          <div className={`singleProductSmallImage col-3 col-sm-2 col-lg-12 spanItem ${bannerImage == image ? "active" : ""}`} onClick={(e) => { setBannerImage(image); }} key={`productSingleImage-${index}`}>
                            <img src={`${import.meta.env.VITE_BASE_URL}${image}`} alt="" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-10">
                    <div className="singleProductImage">
                      <img src={`${import.meta.env.VITE_BASE_URL}${bannerImage}`} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className=" singleProductRight">
                <h2>{singleProduct.name} </h2>
                <h3>$ {singleProduct.price * singleProduct.discount / 100} <span>{singleProduct.price}$</span> </h3>
                <p className='discount'>save up to <span>{singleProduct.discount}%</span>  </p>
                <div className="quantity d-flex align-items-center mb-3">
                  <button className='quantityBtn' onClick={(e) => { setQuantity((q) => q - 1) }}> - </button>
                  <input type='text' disabled className='form-control quantityInput' value={quantity}></input>
                  <button className='quantityBtn' onClick={(e) => { setQuantity((q) => q + 1) }}>+</button>
                </div>
                <div className="mb-3">
                  <Button>Add to Cart</Button>
                </div>
                <div className="">
                  <Button>Buy Now </Button>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="productDescription">
                <h2 className='mb-2'>About Products</h2>
                <div dangerouslySetInnerHTML={{ __html: singleProduct.description }} />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* customer review  */}
      <section className='customerReview'>
        <div className="container">

          <div className="row align-items-center">
            <div className="col-12  col-lg-3 mb-4">
              <div className="customerReviewTitle mb-3 px-4 px-lg-0">
                <h2>Customer Reviews</h2>
                <div className="rate d-flex d-lg-block d-xl-flex align-items-center">
                  <div className="star">
                    {Array.from({ length: Math.floor(singleProductReviewSummary.averageRating) }).map((_, index) =>(<i className="fa-solid fa-star"></i>))}
                    {(singleProductReviewSummary.averageRating - Math.floor(singleProductReviewSummary.averageRating) > 0) && <i className="fa-solid fa-star-half-stroke"></i>}
                    {Array.from({ length: Math.floor(5 - singleProductReviewSummary.averageRating) }).map((_, index) => (<i className="fa-regular fa-star"></i>))}
                  </div>
                  <p className='m-0 mt-1 ms-2'>5 Out Of {singleProductReviewSummary.averageRating}</p>
                </div>
              </div>
              <div className="customerReviewRate px-4 px-lg-0">
                <div className="customerReviewRateItem d-flex  align-items-center">
                  <div className="customerRateProgressBar" >
                    <div className="ratProgress" style={{ width: `${singleProductReviewSummary.rating["5"]}%` }} ><p>5 start</p></div>
                  </div>
                  <p className='m-0 ms-1'>100%</p>
                </div>
                <div className="customerReviewRateItem d-flex  align-items-center">
                  <div className="customerRateProgressBar">
                    <div className="ratProgress" style={{ width: `${singleProductReviewSummary.rating["4"]??0}%` }}><p>4 start</p></div>
                  </div>
                  <p className='m-0 ms-1'>100%</p>
                </div>
                <div className="customerReviewRateItem d-flex  align-items-center">
                  <div className="customerRateProgressBar">
                    <div className="ratProgress" style={{ width: `${singleProductReviewSummary.rating["3"]}%` }}><p>3 start</p></div>
                  </div>
                  <p className='m-0 ms-1'>100%</p>
                </div>
                <div className="customerReviewRateItem d-flex  align-items-center">
                  <div className="customerRateProgressBar">
                    <div className="ratProgress" style={{ width: `${singleProductReviewSummary.rating["2"]}%` }}><p>2 start</p></div>
                  </div>
                  <p className='m-0 ms-1'>100%</p>
                </div>
                <div className="customerReviewRateItem d-flex  align-items-center">
                  <div className="customerRateProgressBar">
                    <div className="ratProgress" style={{ width: `${singleProductReviewSummary.rating["1"]}%` }}><p>1 start</p></div>
                  </div>
                  <p className='m-0 ms-1'>100%</p>
                </div>

              </div>
            </div>
            <div className="col-12 col-lg-9">
              <div className="customerReviewInner mb-2 px-4 px-lg-0">
                {/* customer review item */}
                {singleProductReview.length <= 0 &&
                  <div className=" w-100 h-100 d-flex align-items-center justify-content-center"><h2 className='noReviewText'>No review at</h2></div>}

                {singleProductReview.map((review, index) => (
                  <div className="customerReviewItem " key={`customerReviewItem-${index}`}>
                    <div className="customerReviewProfile">
                      <div className="customerProfile d-flex align-items-center">
                        <img src={review.userId.profile ?`${import.meta.env.VITE_BASE_URL}${review.userId.profile}` : "/image/userPro.png"} alt="customer profile" />
                        <h3 className='m-0'>{review.userId.userName}</h3>
                      </div>
                      <div className="customerRate star">
                        {Array.from({ length: review.rating }).fill(null).map((_, index) => (
                          <i className="fa-solid fa-star"></i>
                        ))}
                        {Array.from({ length: (5 - review.rating) }).fill(null).map((_, index) => (
                          <i className="fa-regular fa-star"></i>
                        ))}
                      </div>
                      <div className="customerReviewMessage">
                        <p>{review.reviewMessage}</p>
                      </div>
                    </div>
                  </div>
                ))}

              </div>
              <div className="addButton px-4 px-lg-0">
                {(auth.userData && auth.userData.email && auth.userData._id) && <Button className={"btn-rounded"} data-bs-toggle="modal" data-bs-target="#AddProductReview" >Create Review</Button>}
              </div>
            </div>
          </div>
        </div>
      </section>
      <AddReview/>

    </>
  )
}

export default SingleProduct
