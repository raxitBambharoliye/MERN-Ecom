import crypto from 'crypto-js'
import cookie from 'js-cookies'
const secret = import.meta.env.VITE_SECRET;
const setToken = (token) => {
    const enToken = crypto.AES.encrypt(token, secret).toString();
    return cookie.setItem('adminToken', JSON.stringify(enToken));
}

const getToken = () => {
    const token = cookie.getItem('adminToken');
    if (!token) {
        return false;
    }
    const deToken = crypto.AES.decrypt(JSON.parse(token), secret).toString(crypto.enc.Utf8);
    return deToken;
}

const setAdmin = (user) => {
    console.log('user', user)
    const enUser = crypto.AES.encrypt(JSON.stringify(user), secret).toString();
    return cookie.setItem('adminData', JSON.stringify(enUser));
}
const getAdmin = () => {
    const admin = cookie.getItem('adminData');
    if (!admin) {
        return false;
    }
    const enAdmin = crypto.AES.decrypt(JSON.parse(admin), secret).toString(crypto.enc.Utf8);

    return JSON.parse(enAdmin);
}


const logOutHandler = ()=>{
    cookie.removeItem("adminData");
    cookie.removeItem("adminToken")
    window.location.reload();
}
const shortString = (a,length) => {
    return (a.slice(0, length))+"...";
}
export { getToken, setToken, setAdmin, getAdmin,logOutHandler,shortString }