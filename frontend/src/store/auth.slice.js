import { createSlice } from "@reduxjs/toolkit"
import cookies from 'js-cookies'
import { Navigate } from "react-router-dom";
const init = {
    isAuth: false,
    userData: null,
}



const AuthSlice = createSlice({
    name:"auth",
    initialState: init,
    reducers: {
        setLogin:setLoginFan,
        changeLogin: (state,action) => { },
        logOut:logOutFan,
    }
})

function setLoginFan(state, action) {
    state.isAuth = true;
    if (action.payload.profile) {
        action.payload.profile=`${import.meta.env.VITE_BASE_URL}${action.payload.profile}`;
    }
    state.userData = action.payload;
}
function logOutFan(state,action) {
    state.isAuth = false;
    state.userData = null;
    cookies.removeItem('userToken');
    cookies.removeItem('user');
    window.location.reload()
}
export const { changeLogin, logOut,setLogin } = AuthSlice.actions;
export const AuthReducer = AuthSlice.reducer;