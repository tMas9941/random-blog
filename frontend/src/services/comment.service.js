import axiosInstance from "./axios.instance";

const list = async (data) => {
    try {
        const response = await axiosInstance.get("/comment/list", { params: data });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

const create = async (data) => {
    try {
        const response = await axiosInstance.post("/comment/create", data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

const destroy = async (data) => {
    try {
        const response = await axiosInstance.delete("/comment/delete", { data });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// const update = async (data) => {
// 	try {
// 		const response = await axiosInstance.put("/post-vote/update", data);
// 		return response.data;
// 	} catch (error) {
// 		throw error.response ? error.response.data : error;
// 	}
// };

export default { create, list, destroy };
