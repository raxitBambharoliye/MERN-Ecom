import crypto from 'crypto-js'
import Cookies from 'js-cookies'
const secret = import.meta.env.VITE_SECRET;
const setToken = (token) => {
    const enToken = crypto.AES.encrypt(token, secret).toString();
    return Cookies.setItem('userToken', JSON.stringify(enToken));
}
const getToken = () => {
    const token = JSON.parse(Cookies.getItem('userToken'));
    if(!token){
        return false;
    }
    const enToken = crypto.AES.decrypt(token, secret).toString(crypto.enc.Utf8);
    return enToken;
}

const setUser = (user) => {
    const enUser = crypto.AES.encrypt(JSON.stringify(user), secret).toString();
    return Cookies.setItem("user", JSON.stringify(enUser))
}
const setDataInCookie = (key, value) => {
    if (typeof value != "string") {
        value= JSON.stringify(value)
    }
    const enUser = crypto.AES.encrypt(value, secret).toString();
    return Cookies.setItem(key, JSON.stringify(enUser))
}
const getDataFromCookie = (key) => {
    const enData = JSON.parse(Cookies.getItem(key));
    if (!enData) { return false; }
    
    const data = crypto.AES.decrypt(enData, secret).toString(crypto.enc.Utf8);
    if (data) {
        return JSON.parse(data);
    }
    return false;
}

const getUser = () => {
    const enUser = JSON.parse(Cookies.getItem("user"));
    if (!enUser) { return false; }
    
    const user = crypto.AES.decrypt(enUser, secret).toString(crypto.enc.Utf8);
    if (user) {
        return JSON.parse(user);
    }
    return false;
}
const shortString = (a,length) => {
    return (a.slice(0, length))+"...";
}
function shallowEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
  
    if (keys1.length !== keys2.length) {
      return false;
    }
  
    for (let key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
  
    return true;
  }
  
export { setToken, getToken, setUser, getUser,shortString,setDataInCookie,getDataFromCookie,shallowEqual };