import { JWT_SECRET } from "../constants/constants.js";
import userController from "../controllers/user.controller.js";
import userService from "../services/user.service.js";
import HttpError from "../utils/HttpError.js";
import jwt from "jsonwebtoken";

export const auth = async ({ authData }) => {
	return async (req, res, next) => {
		console.log(authData);
		const token = req.headers.authorization?.split(" ")[1];
		if (hasToken(token)) next(new HttpError("Token is missing", 401));

		try {
			const userData = jwt.verify(token, JWT_SECRET);
			console.log(userData.id);
			// await authorization(authData, userData);
			const gotUser = await userService.getById(userData.id);
			console.log("gotUser", gotUser);
			req.user = userData;
			console.log("___________NEXT");
			next();
		} catch (error) {
			next(error);
		}
	};
};

async function authorization(authData, userData) {
	console.log("authorization");
	const timer = setTimeout(() => console.log("finished"), 1000);
	console.log("after timer");
}

function hasToken(token) {
	return !token || token === "undefined" || token === "null";
}
