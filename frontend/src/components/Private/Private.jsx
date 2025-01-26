import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
import { getToken, getUser } from '../../utility/common';
import { setLogin } from '../../store/auth.slice';
function Private() {
    const user = getUser();
    const token = getToken();
    const dispatch=useDispatch()
    if (user && token) {
        dispatch(setLogin(user))
        return<Outlet/>
    }else{
     return <Navigate to='/'/>
    }

}

export default Private
