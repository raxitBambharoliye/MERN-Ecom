import React, { useEffect, useState } from 'react'
import Button from '../Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import '../../assets/css/style.css'
import { cleanAllData } from '../../store/dataSlice';
function Active({
    type,
    closeBtnRef,
    onClickHandler,
    InStock=false
}) {
    const dataSt = useSelector((state) => state.dataReducer.editData);
    const dispatch = useDispatch();
    const [activeData, setActiveData] = useState(dataSt);
    useEffect(() => {
        setActiveData(dataSt);
    }, [dataSt])
    let titleData;
    switch (type) {
        case 'admin':
            titleData = activeData.userName
            break;
        case 'category':
            titleData = activeData.categoryName;
            break;
        case 'product':
            titleData = activeData.name;
            break;
    }
    return (
        <>

            <div
                className="modal fade"
                id={InStock?"stock":"activeModal"}
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-body ">
                            {InStock ? <p className='text-center  mt-3 activeModalTitle'>are you Sure to {activeData.inStock ? 'Out of Stock Product':'In Stock Product'  } <span>{titleData}</span> </p> :
                            <p className='text-center  mt-3 activeModalTitle'>are you Sure to {activeData.isActive ? 'deactivate' : 'active'} <span>{titleData}</span> </p>}
                        </div>
                        <div className="modal-footer d-flex justify-content-center">
                            <Button type="button" buttonClass="themButtonBorder me-2 " data-bs-dismiss="modal" ref={closeBtnRef} onClick={(e)=>{dispatch(cleanAllData())}} >Discard</Button>
                            <Button type="submit" buttonClass="themButtonFill " onClick={(e) => { onClickHandler(activeData._id) }} >
                                {InStock ? (activeData.inStock ? 'Out Of Stock' : 'In Stock') :(activeData.isActive ? 'deactivate' : 'active')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Active
