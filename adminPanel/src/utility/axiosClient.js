import axios from "axios";
import cookie from 'js-cookies'
import { getToken } from "../common";




const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
})

axiosClient.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers["x-auth-token"] = token||'';
        }
        return config;
    }
)
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log('error', error)
        if (error.response.status == 401) {
            cookie.removeItem("adminData");
            cookie.removeItem("adminToken")
            window.location.reload()
        }
        return Promise.reject(error);
   

    }
)

export default axiosClient;