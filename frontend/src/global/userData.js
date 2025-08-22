import authService from "../services/auth.service.js";

import Signal from "../utils/signal.js";
import { jwtDecode } from "jwt-decode";

// localStorage.setItem("user", "");

export const userSignal = new Signal(await loadUserData());
export const darkModeSignal = new Signal(
	(localStorage.getItem("darkMode") && Boolean(JSON.parse(localStorage.getItem("darkMode")))) || false
);
async function loadUserData() {
	const userId = localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).id;
	const user = await authService.validateUser(userId);
	if (!user) Logout;
	return user;
}

export async function Login(data) {
	// login and get token from backend and decode it
	try {
		const token = await authService.login(data);
		const decodedToken = jwtDecode(token);
		userSignal.changeValue(decodedToken);
		localStorage.setItem("userId", JSON.stringify(decodedToken).id);
		return decodedToken;
	} catch (error) {
		throw error;
	}
}
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

export const Logout = () => {
	userSignal.changeValue(null);
	localStorage.setItem("user", null);
};

export const toggleDarkMode = () => {
	darkModeSignal.changeValue(!darkModeSignal.value);
	localStorage.setItem("darkMode", darkModeSignal.value);
};
