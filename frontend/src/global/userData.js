import authService from "../services/auth.service.js";

import Signal from "../utils/signal.js";
import { jwtDecode } from "jwt-decode";
import { changePopupData, popupResults } from "./popupHandler.js";

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
        const decodedToken = jwtDecode(token);
        if (decodedToken) {
            return decodedToken;
        } else {
            changePopupData("Invalid token!", popupResults.warning);
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
    changePopupData("Successfull login!", popupResults.success);
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
    changePopupData("Bye bye!", popupResults.warning);
}

export const toggleDarkMode = () => {
    darkModeSignal.changeValue(!darkModeSignal.value);
    localStorage.setItem("darkMode", darkModeSignal.value);
};
