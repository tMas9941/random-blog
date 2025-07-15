import authService from "../services/auth.service.js";
import Signal from "../utils/signal.js";
import { jwtDecode } from "jwt-decode";

// localStorage.setItem("user", "");

export const userSignal = new Signal(localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")));

export const Login = async (data) => {
	// login and get token from backend and decode it
	try {
		const token = await authService.login(data);
		const decodedToken = jwtDecode(token);
		userSignal.changeValue(decodedToken);
		console.log("new user ____________: ", decodedToken);
		localStorage.setItem("user", JSON.stringify(decodedToken));
		return decodedToken;
	} catch (error) {
		console.log("error");
		throw error;
	}
};
export const Registration = async (data) => {
	// register and login
	try {
		await authService.registration(data);
		const newUser = await Login(data);
		return newUser;
	} catch (error) {
		throw error;
	}
};
