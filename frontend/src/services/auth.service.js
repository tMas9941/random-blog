// import { VITE_API_URL } from "../constants/constants.js";
import axiosInstance from "./axios.instance";

// const registration = async (data) => {
// 	return await fetch(`${VITE_API_URL}/auth/registration`, {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(data),
// 	})
// 		.then((response) => (response.ok ? response.json() : null))
// 		.then((json) => {
// 			console.log("json  ", json);
// 			return json;
// 		})
// 		.catch((error) => (error.response ? error.response.data : error));
// };
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
// const login = async (data) => {
// 	return await fetch(`${VITE_API_URL}/auth/login`, {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(data),
// 	})
// 		.then((response) => (response.ok ? response.json() : null))
// 		.then((json) => json)
// 		.catch((error) => (error.response ? error.response.data : error));
// };
export default { registration, login };
