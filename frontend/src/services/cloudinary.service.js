import axiosInstance from "./axios.instance";

const uploadFile = async (data) => {
	try {
		const response = await axiosInstance.post("/", data);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error.response ? error.response.data : error;
	}
};

const deleteFile = async (data) => {
	try {
		const response = await axiosInstance.delete(
			`https://api.cloudinary.com/v1_1/${data.get("cloudName")}/upload`,
			data
		);
	} catch (error) {
		console.error(error);
		throw error.response ? error.response.data : error;
	}
};

export default { uploadFile, deleteFile };
