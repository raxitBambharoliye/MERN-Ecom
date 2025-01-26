import React, { useEffect } from 'react'
import $ from 'jquery'
import Logo from '../Logo/Logo'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import {  asideMenu } from '../../constant';
export default function Aside() {
    const adminData = useSelector((state) => state.authReducer.admin);
    const toggleMenu = () => {
        const aside = document.getElementById("aside");
        aside.classList.toggle('hide');
    }
    useEffect(() => {
        $('.sideMenu').on('click', function () {
            $(this).siblings().children('.subMenuList').slideUp();
            $(this).children('.subMenuList').slideToggle();
        })
    }, [])



    return (
        <>
            <aside id='aside' >
                <div className=" aside-inner d-flex flex-column ">
                    <div className="closeIcon iconButton position-absolute top-0 end-0 mt-2 d-lg-none" onClick={toggleMenu}>
                        <i className="fa-solid fa-xmark" />
                    </div>
                    <nav>
                        <div className='asideLogo text-lg-center d-lg-none  ms-2 ms-lg-0 my-3'>
                            <Logo />
                        </div>
                        <ul className='sideMenuList p-0 mt-lg-4'>
                            {asideMenu.map((element,index) => (
                                <li className='sideMenu' key={index} >

                                    <Link to={element.to}>
                                        <i className={` ${element.icon} menuIcon`} /> {element.title}
                                    </Link>
                                    <ul className='subMenuList p-0' >
                                        {element.subMenu.map((subM,indexSub) => (
                                            <React.Fragment key={index+'-'+indexSub}>
                                                {(subM.title != "Admin List" || (adminData.role == 'admin')) && <li className='subMenu' key={`${index}-${indexSub}`}><Link to={subM.to}><i className={`${subM.icon} subMenuIcon`} />{subM.title}</Link> </li>}
                                            </React.Fragment>
                                        ))}


                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="copyRight">
                        <p>Copyright © 2024 RADHE </p>
                    </div>
                </div>

            </aside>

        </>
    )
}
/* 
         <li className='sideMenu' >

                                <Link to='#'>
                                    <i className="fa-solid fa-user menuIcon" /> Admin
                                </Link>
                                <ul className='subMenuList p-0'>
                                    {adminData.role == 'admin' && <li className='subMenu'><Link to={APP_URL.RE_ADD_ADMIN_PAGE}><i className="fa-solid fa-user-plus subMenuIcon" />Add Admin</Link> </li>}
                                    <li className='subMenu'><Link to={APP_URL.RE_VIEW_ADMIN_PAGE}><i className="fa-solid fa-address-book subMenuIcon" /> Admin List</Link> </li>
                                </ul>
                            </li>
                            
*/
