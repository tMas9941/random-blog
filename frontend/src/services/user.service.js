import axiosInstance from "./axios.instance";

const changePassword = async (id, data) => {
    try {
        const response = await axiosInstance.patch(`/user/${id}/password`, data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

const updateUserData = async (id, data) => {
    try {
        const response = await axiosInstance.patch(`/user/${id}/data`, data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};
export default { changePassword, updateUserData };
