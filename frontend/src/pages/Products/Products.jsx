import { Banner, Button, Category, ProductItem } from "../../components"
import '../../assets/css/product.css'
import { useEffect, useState } from "react"
import axiosClient from "../../utility/api/axiosClient";
import url from "../../components/constant/url";
import { useDispatch, useSelector } from "react-redux";
function Products() {

  const [productData, setProductData] = useState([]);
  useEffect(() => {
    (async() => {
      try {
        console.log('check ')
        let response = await axiosClient.get(url.BE_GET_ALL_PRODUCT);
        console.log("response.data", response.data)
        if (response.status == 200) {
          
          setProductData(response.data.allProducts);
        }
      } catch (error) {
        console.log('CATCH ERROR: IN : get all product Data:: 💀💀💀 :: ',error)
      }
    })()
  },[])
  return (
    <>
      {/* product offer slider gos here */}
      <Banner />
      {/* category */}
      <Category />
      <section className="categoryProducts">
        <div className="container">
          <h2 className="text-center">Category Name</h2>

          <div className="categoryProductsInner mt-5  ">
            <div className="row gx-01">
              {productData.map((element, index) => (
                 <div className="col-6 col-md-4 col-lg-3" key={index}>
                  <ProductItem product={element } />
              </div>
              ))}
            </div>
          </div>
        </div>
      </section> 
    </>
  )
}

export default Products
