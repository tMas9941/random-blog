import authService from "../services/auth.service.js";

import Signal from "../utils/signal.js";
import { jwtDecode } from "jwt-decode";

// localStorage.setItem("userId", "");

export const userSignal = new Signal(await loadUserData());
export const darkModeSignal = new Signal(loadDarkMode());

function loadDarkMode() {
	return (localStorage.getItem("darkMode") && Boolean(JSON.parse(localStorage.getItem("darkMode")))) || false;
}

async function loadUserData() {
	// load userId from localstorage and validates it
	let userId = localStorage.getItem("userId");
	if (isUserNull(userId)) {
		Logout;
		return;
	}

	const user = await authService.validateUser(userId);
	return user;

	function isUserNull(userId) {
		return !userId || userId === "undefined" || userId === "null";
	}
}

export async function Login(data) {
	// get token from backend and decode it, then save user
	try {
		const token = await authService.login(data);
		const decodedToken = jwtDecode(token);
		userSignal.changeValue(decodedToken);
		localStorage.setItem("userId", decodedToken.id);
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

export function Logout() {
	userSignal.changeValue(undefined);
	localStorage.setItem("userId", undefined);
}

export const toggleDarkMode = () => {
	darkModeSignal.changeValue(!darkModeSignal.value);
	localStorage.setItem("darkMode", darkModeSignal.value);
};
