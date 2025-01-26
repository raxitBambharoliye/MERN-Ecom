import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EditProfile } from '../../components';
import { Link } from 'react-router-dom';
import { logOut } from '../../store/auth.slice';

function Profile() {
    const [image, setImage] = useState('./image/userPro.png')
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.AuthReducer);


    const time = getTime();
    const logOutHandler = () => {
        console.log("test run")
        dispatch(logOut())
    }

    return (
        <>
            <section className='ProfileView'>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-4">
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
                        <div className="col-7">
                            <div className="profileRight">
                                <h2 className='profileTitle'>{time} {auth.userData.userName}</h2>
                                <div className="addresses">
                                    <div className="addressesTitle">
                                        <h3>Your Addresses</h3>
                                    </div>
                                    <div className="addressesInner mt-2 ">
                                        <div className="row gx-2 spanRow">
                                            <div className="col-6 spanItem">
                                                <div className="addressesItem active">
                                                    <h4>raxit  patel</h4>
                                                    <h5>surat, gujarat, india</h5>
                                                    <p>142, dharma raj park so.,simada gam , nana vara ...</p>
                                                </div>
                                            </div>
                                            <div className="col-6 spanItem">
                                                <div className="addressesItem">
                                                    <h4>raxit  patel</h4>
                                                    <h5>surat, gujarat, india</h5>
                                                    <p>142, dharma raj park so.,simada gam , nana vara ...</p>
                                                </div>
                                            </div>
                                            <div className="col-6 spanItem">
                                                <div className="addressesItem">
                                                    <h4>raxit  patel</h4>
                                                    <h5>surat, gujarat, india</h5>
                                                    <p>142, dharma raj park so.,simada gam , nana var...</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="products">
                                    <div className="addressesTitle">
                                        <h3>Cart Products</h3>
                                    </div>
                                    <div className="productsInner mt-2 ">
                                        <div className="row gx-2 spanRow">
                                            <div className="col-3 spanItem">
                                                <div className="profileProductItem">
                                                    <img src="image/collection1.jpg" alt="leamp1" />
                                                    <div className="text">
                                                        <h5>className</h5>
                                                        <p>$44.40</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-3 spanItem">
                                                <div className="profileProductItem">
                                                    <img src="image/collection1.jpg" alt="leamp1" />
                                                    <div className="text">
                                                        <h5>className</h5>
                                                        <p>$44.40</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-3 spanItem">
                                                <div className="profileProductItem">
                                                    <img src="image/collection1.jpg" alt="leamp1" />
                                                    <div className="text">
                                                        <h5>className</h5>
                                                        <p>$44.40</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-3 spanItem">
                                                <div className="profileProductItem">
                                                    <img src="image/collection1.jpg" alt="leamp1" />
                                                    <div className="text">
                                                        <h5>className</h5>
                                                        <p>$44.40</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-3 spanItem">
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
