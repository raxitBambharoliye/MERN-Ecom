import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../../store/auth.slice';
import { Navigate } from 'react-router-dom';

function Logout() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logOut());
    }, [])
   return  Navigate('/');

}

export default Logout
