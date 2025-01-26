import React from 'react'
import { getAdmin, getToken } from '../../common'
import { Outlet, Navigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { login } from '../../store/authSlice';
export default function Private() {

    const adminData = getAdmin();
    const adminToken = getToken();
    const dispatch = useDispatch();

    if (adminToken && adminData) {
        dispatch(login(adminData));
        return <Outlet />
    }
    return <Navigate to='/login' />

}
