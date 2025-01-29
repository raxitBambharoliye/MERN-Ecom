import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, EditProfile } from '../../components';
import { Link } from 'react-router-dom';
import { logOut } from '../../store/auth.slice';
import AddAddress from '../../components/AddAddress/AddAddress';
import { shortString } from '../../utility/common';
import EditAddress from '../../components/AddAddress/EditAddress';
import { setEditAddress } from '../../store/data.slice';
import axiosClient from '../../utility/api/axiosClient';
import { APP_URL } from '../../components/constant';

function Profile() {
    const dispatch = useDispatch();
    const [userAddress, setUserAddress] = useState([]);
    const auth = useSelector((state) => state.AuthReducer);
    const time = getTime();
    const logOutHandler = () => {
        dispatch(logOut())
    }
    useEffect(() => {
        setUserAddress(auth.address)
    }, [auth.address])
    const deleteUserAddress =async (id) => { 
        try {
            const response = await axiosClient.get(`${APP_URL.BE_DELETE_ADDRESS}/${id}`);
            if (response && response.status === 200) {
                setUserAddress(response.data.address)
            }
        } catch (error) {
            console.log("test", error)
            console.log('error.response', error.response)
        }
    }
    return (
        <>
            <section className='ProfileView'>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12 col-lg-4">
                            <div className="profileLeft d-flex flex-column align-items-center justify-content-around">
                                {auth.userData.profile ? (
                                    <img src={auth.userData.profile} className='profilePic' alt="" />
                                ) : (
                                    <img src={'./image/userPro.png'} className='profilePic' alt="" />
                                )}
                                <h3 className='mt-2'>{auth.userData.userName}</h3>
                                <ul className='profileDataList w-100'>
                                    <li title={auth.userData.email}><i className="fa-solid fa-envelope" /> {truncateString(auth.userData.email, 28)}</li>
                                    <li><i className="fa-solid fa-id-badge" /> {truncateString(auth.userData._id, 28)}</li>
                                    <li><i className="fa-solid fa-phone" /> {auth.userData.phone && auth.userData.phone.length > 0 ? auth.userData.phone : "----"}</li>
                                </ul>
                                <ul className="profileMenu w-100">
                                    <li className="profileLinks"><Link className=" d-block  mt-1" data-bs-toggle="modal" data-bs-target="#EditProfile"   ><i className="fa-solid fa-user-pen m-0 me-2" /> Edit Profile</Link></li>
                                    <li className="profileLinks"><Link className=" d-block  mt-1" ><i className="fa-solid fa-truck-fast"></i> Your Order</Link></li>
                                    <li className="profileLinks"><Link className=" d-block  mt-1" onClick={logOutHandler} ><i className="fa-solid fa-right-from-bracket"></i> Sign Out </Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 col-lg-7">
                            <div className="profileRight">
                                <h2 className='profileTitle'>{time} {auth.userData.userName}</h2>
                                <div className="addresses">
                                    <div className="addressesTitle d-flex justify-content-between">
                                        <h3>Your Addresses</h3>
                                        <Button className={"iconButton"} data-bs-toggle="modal" data-bs-target="#AddAddressModal" ><i className="fa-solid fa-plus"></i></Button>
                                    </div>
                                    <div className="addressesInner mt-2 ">
                                        <div className="row gx-2 spanRow">

                                            {(userAddress && userAddress.length <= 0) &&
                                                <div className=" w-100 h-100 d-flex align-items-center justify-content-center"><h2 className='noReviewText'>No Address at</h2></div>}

                                            {userAddress && userAddress.map((address, index) => (
                                                <div className="col-9 col-md-6 col-lg-6 spanItem" key={`userAddress${index}`}>
                                                    <div className="addressesItem active">
                                                        <div className="buttons">
                                                            <button className='edit' data-bs-toggle="modal" data-bs-target="#EditAddressModal" onClick={(e)=>{dispatch(setEditAddress(address))}} ><i className="fa-solid fa-pen"></i></button>
                                                            <button className='delete' onClick={(e)=>{deleteUserAddress(address._id)}}><i className="fa-solid fa-trash-can"></i></button>
                                                        </div>
                                                        <h4>{address.title}</h4>
                                                        <h5>{address.city}, {address.state}, {address.country}</h5>
                                                        <p>{shortString(address.address1,50)}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                                <div className="products">
                                    <div className="addressesTitle">
                                        <h3>Cart Products</h3>
                                    </div>
                                    <div className="productsInner mt-2 ">
                                        <div className="row gx-1 spanRow">
                                            <div className="col-4 col-md-3 spanItem">
                                                <div className="profileProductItem">
                                                    <img src="image/collection1.jpg" alt="leamp1" />
                                                    <div className="text">
                                                        <h5>className</h5>
                                                        <p>$44.40</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-4 col-md-3 spanItem">
                                                <div className="profileProductItem">
                                                    <img src="image/collection1.jpg" alt="leamp1" />
                                                    <div className="text">
                                                        <h5>className</h5>
                                                        <p>$44.40</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-4 col-md-3 spanItem">
                                                <div className="profileProductItem">
                                                    <img src="image/collection1.jpg" alt="leamp1" />
                                                    <div className="text">
                                                        <h5>className</h5>
                                                        <p>$44.40</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-4 col-md-3 spanItem">
                                                <div className="profileProductItem">
                                                    <img src="image/collection1.jpg" alt="leamp1" />
                                                    <div className="text">
                                                        <h5>className</h5>
                                                        <p>$44.40</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-4 col-md-3 spanItem">
                                                <div className="profileProductItem">
                                                    <img src="image/collection1.jpg" alt="leamp1" />
                                                    <div className="text">
                                                        <h5>className</h5>
                                                        <p>$44.40</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <EditProfile />
            <AddAddress />
            <EditAddress/>
        </>
    )
}

function truncateString(text, maxLength) {
    return text.length > maxLength ? `${text.slice(0, maxLength - 3)}...` : text;
}
function getTime() {
    let date = new Date()
    if (date.getHours() < 12) {
        return "Good Morning!"
    } else if (date.getHours() >= 12 && date.getHours() < 15) {
        return "Good Afternoon!"
    } else if (date.getHours() >= 15 && date.getHours() < 19) {
        return "Good Afternoon!"
    } else {
        return "Good Night!"
    }
}
export default Profile
