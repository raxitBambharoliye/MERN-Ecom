import { createSlice } from "@reduxjs/toolkit"
import cookie from 'js-cookies'

import { Navigate } from "react-router-dom";
import { setDataInCookie } from "../utility/common";
import { COOKIE_KEY } from "../components/constant";
const init = {
    isAuth: false,
    userData: null,
    address: null,
}



const AuthSlice = createSlice({
    name: "auth",
    initialState: init,
    reducers: {
        setLogin: setLoginFan,
        changeLogin: (state, action) => { },
        logOut: logOutFan,
        setAddress: setAddressFun
    }
})

function setLoginFan(state, action) {
    state.isAuth = true;
    if (action.payload.profile) {
        action.payload.profile = `${import.meta.env.VITE_BASE_URL}${action.payload.profile}`;
    }
    state.userData = action.payload;
}
function setAddressFun(state, action) {
    setDataInCookie(COOKIE_KEY.ADDRESS, action.payload);
    state.address = action.payload;
}
function logOutFan(state, action) {
    state.isAuth = false;
    state.userData = null;
    state.address = null;
    cookie.removeItem('userToken');
    cookie.removeItem('user');
    window.location.reload()
}
export const { changeLogin, logOut, setLogin, setAddress } = AuthSlice.actions;
export const AuthReducer = AuthSlice.reducer;