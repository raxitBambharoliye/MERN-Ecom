import { Link, NavLink } from 'react-router-dom'
import '../../assets/css/style.css'
import Login from '../Login/Login'
import { useSelector } from 'react-redux'
import { logOut } from '../../store/auth.slice';
import { useDispatch } from 'react-redux';
import '../../assets/css/header.css'
import { useState } from 'react';
import { APP_URL } from '../constant';
function Header() {
  const auth = useSelector((state) => state.AuthReducer);
  const Menu = [{ title: "home", path: APP_URL.FE_HOME }, { title: "products", path: APP_URL.FE_PRODUCTS }, { title: "Sale", path: APP_URL.FE_SALE }, { title: "About", path: APP_URL.FE_ABOUT }, { title: "concat", path: APP_URL.FE_CONTACT },]
  const dispatch = useDispatch();
  const logOutHandler = () => {
    dispatch(logOut());
  }
  const [showHeader, setShowHeader] = useState(false);
  return (
    <>
      <header>
        <div className="container container-fluid">
          <div className="d-flex justify-content-between align-items-center">
              <Link to="/" className="logo  ">light store</Link>
              <ul className={`m-0 menuInner p-0 ${showHeader ? "show" : "hide"} ps-3 pt-4 ps-lg-0 pt-lg-0`}>
                <li className='toggleCloseButton d-lg-none ' onClick={(e) => { setShowHeader((value) => !value) }}><i className="fa-solid fa-xmark"></i></li>
                {Menu.map((element, index) => (
                  <li key={index}>
                    <NavLink to={element.path}>{element.title}</NavLink>
                  </li>
                ))}
              </ul>
              <ul className="d-flex header-icon m-0 p-0">
                <li>
                  <Link to="/">
                    <i className="fa-solid fa-magnifying-glass" />
                  </Link>
                </li>
                <li>
                  {auth.isAuth ? (
                    <div className="dropdown">
                      <div className="profileButton btn-secondary dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <img src={auth.userData.profile ??'/image/userPro.png' } className='headerProfile me-2' alt="userProfile" />
                      </div>
                      <ul className="dropdown-menu">
                        <li>
                          <button className="dropdown-item" onClick={logOutHandler} >
                            < i className="fa-solid fa-right-from-bracket m-0 me-2" /> Logo Out
                          </button>
                        </li>
                        <li>
                          <Link className="dropdown-item" to={APP_URL.FE_PROFILE}>
                            <i className="fa-solid fa-user m-0 me-2" />
                            Edit Profile
                          </Link>
                        </li>
                      </ul>
                    </div>) : (<Link to="/" data-bs-toggle="modal" data-bs-target="#login">
                      <i className="fa-solid fa-user" />
                    </Link>)}

                </li>
                <li>
                  <Link to="/">
                    {" "}
                    <i className="fa-solid fa-cart-shopping" />
                  </Link>
                </li>
                <button className='toggle-button btn d-lg-none' onClick={(e) => { setShowHeader((value) => !value) }}><i className="fa-solid fa-bars"></i></button>
                <li>
                </li>
              </ul>
          </div>
        </div>
      </header>
      <Login />


    </>

  )
}
export default Header