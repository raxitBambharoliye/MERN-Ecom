import React, { useEffect, useState } from 'react'
import axiosClient from '../../utility/axiosClient'
import { APP_URL } from '../../constant'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import EditUser from './EditUser'
import Active from '../../components/Active/Active'
import Delete from '../../components/Delete/Delete'

function SingleUser() {
    const admin = useSelector((state) => state.authReducer.admin);

    const { id } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState();
    if (!id) {
        navigate(APP_URL.RE_VIEW_USER_PAGE);
        return;
    }
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const response = await axiosClient.get(`${APP_URL.BE_SINGLE_USER_PROFILE}/${id}`);
                console.log('response::: single user profile ', response)
                if (response.status === 200) {
                    setUserData(response.data.userData);
                }
                setLoading(false);
            } catch (error) {
                console.log('error', error)

            }
        })()
    }, [])
    if (loading || !userData) {
        return <div>Loading...</div>
    }
    return (
        <>
            <div className='w-100 '>
                <div className="singleUserProfileInner">
                    <div className="row align-items-center">
                        <div className="col-12   col-xl-2">
                            <div className="profile">
                                <img src={userData.profile ? `${import.meta.env.VITE_BASE_URL}${userData.profile}` : "/image/dummyImage.jpg"} alt="" />
                                <h3>{userData.userName}</h3>
                            </div>
                        </div>
                        <div className="col-12   col-xl-10">
                            <div className="d-xl-flex   justify-content-between">
                                <ul className="userData mb-0">
                                    <li><span>Email:</span>{userData.email}</li>
                                    <li><span>Phone Number: </span>{userData.phone ?? "----- -----"}</li>
                                    <li><span>Role: </span>{userData.role}</li>
                                </ul>
                                <ul className="userData mb-0">
                                    <li><span>Joined At: </span>{userData.createdAt}</li>
                                    <li><span>userId: </span>{userData._id}</li>
                                    <li><span>status: </span>{userData.isActive ? "Active" : "Block"}</li>
                                </ul>
                                <div className="actionsButtons ms-4 ms-xl-0">
                                    {(admin._id == userData.creator || admin.role == 'admin') ? (<div className="d-flex">
                                        <button className='tableViewActionButton delete' data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={(e) => { dispatch(setEditData(userData)) }}><i className="fa-solid fa-trash" /></button>
                                        <button className='tableViewActionButton edit' data-bs-toggle="modal" data-bs-target="#editUser" onClick={(e) => { dispatch(setEditData(userData)) }} ><i className="fa-solid fa-user-pen" /></button>

                                    </div>) : (
                                        <p className='text-center m-0'> - </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <EditUser id="editUser" page={page} totalLimit={limit} search={search} />
            <Active type={'admin'} onClickHandler={activeHandler} closeBtnRef={activeCloseRef} />
            <Delete type={'admin'} onClickHandler={deleteHandler} closeBtnRef={deleteCloseRef} /> */}
        </>
    )
}

export default SingleUser
