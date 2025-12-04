import axiosInstance from "./axios.instance";

const registration = async (data) => {
    try {
        const response = await axiosInstance.post("/auth/registration", data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};
const login = async (data) => {
    try {
        const response = await axiosInstance.post("/auth/login", data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

const refreshToken = async () => {
    try {
        const response = await axiosInstance.post(`/auth/refresh`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export default { registration, login, refreshToken };
