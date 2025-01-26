import React, { useState } from 'react'
import Search from '../Search/Search'
import { useSelector } from 'react-redux';

export default function ViewTable({
    indexing=true,
    headData,
    viewData=[],
}) {
    const adminData = useSelector((state) => state.authReducer.admin);
    const [admin, setAdmin] = useState(adminData);
  
    return (

        <>
            <div className="container">
                <h2 className='pageTitle'>All Category</h2>
                <Search placeholder='Search Category here ...'
                    onChange={(e) => { setSearch(e.target.value) }}
                />
                <div className=" dataViewTable addDataFrom">
                    <div className=" table-responsive">
                        <table className=' table align-middle table-hover'>
                            <thead>
                                <tr>
                                    {indexing&&<th>#</th>}
                                    
                                    {headData.map((data) => (<th>{data}</th>))}
                                </tr>
                            </thead>
                            <tbody>
                                {viewData.map((element, index) => (
                                    <tr key={index} >
                                        <th >{index + 1}</th>
                                        <td><div className='d-flex align-items-center'><div className='tableViewImage'><img src={element.bannerImage ? `${import.meta.env.VITE_BASE_URL}${element.bannerImage}` : './image/dummy.jpg'} /></div><p className='m-0'>{element.name}</p></div></td>
                                        <td>{element.categoryId}</td>
                                        <td>{element.stock}</td>
                                        <td>{element.price}</td>
                                        <td>{element.discount}%</td>
                                        <td>
                                            {
                                                (admin._id == element.creator || admin.role == 'admin') ?
                                                    (<button className='tableViewActionButton active' data-bs-toggle="modal" data-bs-target="#stock" onClick={(e) => { dispatch(setEditData(element)) }} ><i className={element.inStock ? "fa-solid fa-circle-check text-success" : "fa-regular fa-circle-check text-danger"} /></button>) :
                                                    (<p className='m-0 text-center'> -</p>)
                                            }
                                        </td>
                                        <td>
                                            {
                                                (admin._id == element.creator || admin.role == 'admin') ?
                                                    (<button className='tableViewActionButton active' data-bs-toggle="modal" data-bs-target="#activeModal" onClick={(e) => { dispatch(setEditData(element)) }} ><i className={element.isActive ? "fa-solid fa-circle-check text-success" : "fa-regular fa-circle-check text-danger"} /></button>) :
                                                    (<p className='m-0 text-center'> -</p>)
                                            }
                                        </td>
                                        <td >
                                            {(admin._id == element.creator || admin.role == 'admin') ? (<div className="d-flex">
                                                <button className='tableViewActionButton delete' data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={(e) => { dispatch(setEditData(element)) }}><i className="fa-solid fa-trash" /></button>
                                                <button className='tableViewActionButton edit' data-bs-toggle="modal" data-bs-target="#editProduct" onClick={(e) => { dispatch(setEditData(element)) }} ><i className="fa-solid fa-user-pen" /></button>

                                            </div>) : (
                                                <p className='text-center m-0'> - </p>
                                            )}
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>

                </div>
                {/* pagination */}
{/* 
                <div className="cuPagination d-flex justify-content-between">
                    <Limit limit={limit} onChangeHandler={setLimit} />
                    {maxLimit > 0 &&
                        <Pagination page={page} maxLimit={maxLimit} onClickHandler={setPage} />
                    }
                </div>
                <EditProduct id="editProduct" page={page} totalLimit={limit} search={search} />
                <Active type={'product'} onClickHandler={activeHandler} closeBtnRef={activeCloseRef} />
                <Active InStock={true} type={'product'} onClickHandler={stockHandler} closeBtnRef={activeCloseRef} />
                <Delete type={'product'} onClickHandler={deleteHandler} closeBtnRef={deleteCloseRef} /> */}
            </div>
        </>
    )
}
