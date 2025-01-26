import axios from "axios";
import cookies from 'js-cookies'




const axiosClient= axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
})

axiosClient.interceptors.request.use(
    (config)=>{
        const token=localStorage.getItem('token')
        if(token){
            config.headers.Authorization=token
        }
        return config;
    }
)
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status == 401) {
            cookies.removeItem('userToken');
            cookies.removeItem('user');
            window.location.reload()
        }
        
    }
)

export default axiosClient;