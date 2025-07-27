import axiosInstance from "./axios.instance";

const list = async (data) => {
	try {
		const response = await axiosInstance.get("/post/list", data);
		return response.data;
	} catch (error) {
		throw error.response ? error.response.data : error;
	}
};

export default { list };
