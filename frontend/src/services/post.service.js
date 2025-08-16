import axiosInstance from "./axios.instance";

const list = async (data) => {
	try {
		const response = await axiosInstance.get("/post/list", { params: data });
		return response.data;
	} catch (error) {
		throw error.response ? error.response.data : error;
	}
};

const create = async (data) => {
	try {
		const response = await axiosInstance.post("/post/create", data);
		return response.data;
	} catch (error) {
		throw error.response ? error.response.data : error;
	}
};

const getById = async (data) => {
	try {
		const response = await axiosInstance.get("/post/getById", { params: data });
		return response.data;
	} catch (error) {
		throw error.response ? error.response.data : error;
	}
};

export default { list, create, getById };
