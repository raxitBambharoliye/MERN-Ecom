import React, { useEffect, useRef, useState } from 'react'
import axiosClient from '../../utility/axiosClient';
import { useSelector, useDispatch } from 'react-redux'
// import EditAdmin from './EditAdmin';
import { setViewData, setEditData} from '../../store/dataSlice';
import { APP_URL } from '../../constant/'
import Active from '../../components/Active/Active';
import Delete from '../../components/Delete/Delete';
import Search from '../../components/Search/Search';
import Pagination from '../../components/Pagination/Pagination';
import Limit from '../../components/Limit/Limit';
import EditCategory from './EditCategory';

export default function ViewCategory() {
  const adminData = useSelector((state) => state.authReducer.admin);
  let viewSt = useSelector((state) => state.dataReducer.allAdmin);

  const dispatch = useDispatch();

  const [viewData, setViewDataLocal] = useState([]);
  const [admin, setAdmin] = useState(adminData);
  const [page, setPage] = useState(1);
  const [maxLimit, setMaxLimit] = useState();
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState(" ");


  const activeCloseRef= useRef();
  const deleteCloseRef = useRef();
  useEffect(() => {
    console.log('check ')
  },[search])
  useEffect(() => {
    (async () => {
      console.log("hello ",search)
      const response = await axiosClient.get(`${APP_URL.BE_ALL_CATEGORY}/${page}/${limit}/?search=${search}`);
      console.log('response', response)
      setMaxLimit(response.data.maxLimit);
      dispatch(setViewData(response.data.allCategory));
      setViewDataLocal(response.data.allCategory)
      if (page != maxLimit) {
        $(`#p${maxLimit}`).removeClass('active');
      }
      if (page != 1) {
        $(`#p1`).removeClass('active');
      }
    
      $(`#p${page}`).addClass('active');
    })()

  }, [page, limit, search,])
  useEffect(() => {
    console.log('viewSt', viewSt)
    setViewDataLocal(viewSt)
  },[viewSt])


  const deleteHandler = async (id) => {
    try {
      const response = await axiosClient.delete(`${APP_URL.BE_DELETE_CATEGORY}/${id}/${page}/${limit}`)
      setViewDataLocal(response.data.allCategory);
      setMaxLimit(response.data.maxLimit);
      deleteCloseRef.current.click();

    } catch (error) {
      console.log(`CATCH ERROR :: IN :: deleteAdmin :: delete :: API :: 💀💀💀 :: \n ${error} `)
    }

  }
  const activeHandler = async (id) => {
    try {
      const response = await axiosClient.get(`${APP_URL.BE_ACTIVE_CATEGORY}/${id}/${page}/${limit}`)
      setViewDataLocal(response.data.allCategory);
      activeCloseRef.current.click();
    } catch (error) {
      console.log(`CATCH ERROR :: IN :: deleteAdmin :: delete :: API :: 💀💀💀 :: \n ${error} `)
    }

  }
  return (
    <>
      <div className="container">
        <h2 className='pageTitle'>All Category</h2>
        <Search placeholder='Search Category here ...'
        onChange={(e)=>{setSearch(e.target.value)}}
        />
        <div className=" dataViewTable addDataFrom">
          <div className=" table-responsive">
            <table className=' table align-middle table-hover'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>CategoryName</th>
                  <th>creator</th>
                  <th>Active</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {viewData.map((element, index) => (
                  <tr key={index} className={`${element.creator != admin._id ? 'active' : ''}`}>
                    <th >{index + 1}</th>
                    <td><div className='d-flex align-items-center'><div className='tableViewImage'><img src={element.categoryImage ? `${import.meta.env.VITE_BASE_URL}${element.categoryImage}` : './image/dummy.jpg'} /></div><p className='m-0'>{element.categoryName}</p></div></td>
                    <td>{element.creator}</td>  
                    <td>
                      {
                        (admin._id == element.creator || admin.role == 'admin') ?
                          (<button className='tableViewActionButton active'  data-bs-toggle="modal" data-bs-target="#activeModal" onClick={(e) => { dispatch(setEditData(element)) }} ><i className={element.isActive ? "fa-solid fa-circle-check text-success" : "fa-regular fa-circle-check text-danger"} /></button>) :
                          (<p className='m-0 text-center'> -</p>)
                      }
                    </td>
                    <td >
                      {(admin._id == element.creator || admin.role == 'admin') ? (<div className="d-flex">
                        <button className='tableViewActionButton delete' data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={(e) => { dispatch(setEditData(element)) }}><i className="fa-solid fa-trash" /></button>
                        <button className='tableViewActionButton edit' data-bs-toggle="modal" data-bs-target="#editCategory" onClick={(e) => { dispatch(setEditData(element)) }} ><i className="fa-solid fa-user-pen" /></button>

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

        <div className="cuPagination d-flex justify-content-between">
          <Limit limit={limit} onChangeHandler={setLimit} />
          {maxLimit > 0 &&
            <Pagination page={page} maxLimit={maxLimit} onClickHandler={setPage}/>
          }
        </div>
        {/* <EditAdmin id="editAdmin" page={page} totalLimit={limit} /> */}
        <EditCategory id="editCategory" page={ page} totalLimit={limit}  search={search}/>
        <Active type={'category'} onClickHandler={activeHandler} closeBtnRef={activeCloseRef}/>
        <Delete type={'category'} onClickHandler={deleteHandler} closeBtnRef={deleteCloseRef}/>
      </div>

    </>
  )
}
