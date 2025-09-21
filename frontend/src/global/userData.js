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
    // load token from localstorage
    let token = localStorage.getItem("token");
    if (hasToken(token)) {
        try {
            const decodedToken = jwtDecode(token);
            return decodedToken;
        } catch (error) {
            console.log("Invalid token", error); // TODO modify to popup - which is not ready
            localStorage.setItem("token", undefined);
            return undefined;
        }
    }
}

function hasToken(token) {
    return token && token !== "null" && token !== "undefined";
}

export async function login(data) {
    // get token from backend and decode it, then save user
    const token = await authService.login(data);
    localStorage.setItem("token", token);
    const decodedToken = jwtDecode(token);
    userSignal.changeValue(decodedToken);
    return decodedToken;
}

export const registration = async (data) => {
    // register and login
    await authService.registration(data);
    const newUser = await login(data);
    return newUser;
};

export function logout() {
    userSignal.changeValue(undefined);
    localStorage.setItem("token", undefined);
}

export const toggleDarkMode = () => {
    darkModeSignal.changeValue(!darkModeSignal.value);
    localStorage.setItem("darkMode", darkModeSignal.value);
};
