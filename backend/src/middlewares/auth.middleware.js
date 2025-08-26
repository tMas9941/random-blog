import { JWT_SECRET } from "../constants/constants.js";
import HttpError from "../utils/HttpError.js";
import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];
	if (!token || token === "undefined") {
		next(new HttpError("Token is missing", 401));
	}
	try {
		const userDecoded = jwt.verify(token, JWT_SECRET);
		console.log(userDecoded);
		req.user = userDecoded;
		console.log(req);
		next();
	} catch (error) {
		next(error);
	}
};

export const authorize = (req, res, next) => {
	const { id, isAdmin } = req.user;
	const { userId } = req.params;

	if (userId && userId == id) {
		next();
	} else if (isAdmin) {
		next();
	} else {
		next(new HttpError("Unathorized", 403));
	}
};
