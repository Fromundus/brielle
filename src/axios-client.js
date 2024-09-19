import axios from "axios";
import ipconfig from "./ipconfig";

const axiosClient = axios.create({
    baseURL: `${ipconfig}/api`
});

axiosClient.interceptors.request.use( (config) => {
    const token = localStorage.getItem("auth_token");
    config.headers.Authorization = `Bearer ${token}`

    return config;
});

axiosClient.interceptors.response.use( (response) => {
    return response
}, (error) => {
    if(error.response.status === 401){
        localStorage.removeItem("auth_token")
        localStorage.removeItem("auth_role")
        localStorage.removeItem("auth_name")
        localStorage.removeItem("auth_id")
    }
    throw error;
})

export default axiosClient;