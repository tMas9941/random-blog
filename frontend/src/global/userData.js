import authService from "../services/auth.service.js";
import Signal from "../utils/signal.js";
import { jwtDecode } from "jwt-decode";

export const userSignal = new Signal(localStorage.getItem("user"));

export const Login = async (data) => {
	// login and get token from backend and decode it
	try {
		const token = await authService.login(data);
		const decodedToken = jwtDecode(token);
		userSignal.changeValue(decodedToken);
		localStorage.setItem("user", decodedToken);
		return decodedToken;
	} catch (error) {
		throw error;
	}
};
export const Registration = async (data) => {
	// register and login
	try {
		await authService.registration(data);
		const newUser = await Login(data);
		console.log("new user  :", newUser);
		return newUser;
	} catch (error) {
		throw error;
	}
};
