import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
import { getDataFromCookie, getToken, getUser } from '../../utility/common';
import { setAddress, setLogin } from '../../store/auth.slice';
import { APP_URL, COOKIE_KEY } from '../constant';
function Private() {
    const user = getUser();
    const token = getToken();
    const dispatch=useDispatch()
    if (user && token) {
        const address = getDataFromCookie(COOKIE_KEY.ADDRESS);
        dispatch(setLogin(user))
        dispatch(setAddress(address))
        return<Outlet/>
    }else{
        return <Navigate to={APP_URL.FE_HOME } />
    }

}

export default Private
