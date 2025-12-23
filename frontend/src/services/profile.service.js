import axiosInstance from "./axios.instance";

const updateAvatar = async (data) => {
    try {
        const response = await axiosInstance.put("/profile/avatar", data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

const updateIntroduction = async (data) => {
    try {
        const response = await axiosInstance.put("/profile/introduction", data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

const updateProfile = async (data, profileId) => {
    try {
        const response = await axiosInstance.patch(`/profile/${profileId}`, data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};
export default { updateAvatar, updateIntroduction, updateProfile };
