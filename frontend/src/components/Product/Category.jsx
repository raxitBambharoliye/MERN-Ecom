import React, { useEffect, useState } from 'react'
import '../../assets/css/category.css'
import axiosClient from '../../utility/api/axiosClient';
import { APP_URL } from '../constant';
function Category() {
    const [category, setCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(()=>{
        (async()=>{
            try {
                setIsLoading(true)
                const response= await axiosClient.get(APP_URL.BE_GET_ALL_CATEGORY)
                console.log('response ✋✋✋✋ ', response)
                if(response && response.status==200 ){
                    setCategory(response.data.allCategory)
                }
                setIsLoading(false)
            } catch (error) {
               console.log('CATCH ERROR : IN : get all category data:: ',error) 
            }
        })()
    },[])
    if (isLoading) { 
        return(<h1>Loading....</h1>)
    }


    return (
        <section className="category">
            <div className="container">
                <div className="row spanRow justify-content-center scroll-container gx-0">
                    {category.map((element,index)=>(
                        <div className="col-3 col-lg-2 scroll-item" key={index}>
                        <div className="categoryItem">
                            <img src={`${import.meta.env.VITE_BASE_URL}${element.categoryImage}`} alt="" className="categoryImg" />
                            <p>{element.categoryName}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </section>

    )
}

export default Category
