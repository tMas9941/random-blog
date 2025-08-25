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

export default { updateAvatar, updateIntroduction };
