import axios from "axios";

import { VITE_API_URL } from "../constants/environment";

const axiosInstance = axios.create({
    baseURL: VITE_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    config.timeout = 3000;
    if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
    } else if (config.data !== null && typeof config.data === "object") {
        config.headers["Content-Type"] = "application/json";
    }
    return config;
});

export default axiosInstance;
