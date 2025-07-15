import userService from "../services/user.service.js";
import HttpError from "../utils/HttpError.js";

// security
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/constants.js";

const BCRYPT_COST = 12;

const registration = async (req, res, next) => {
	const { username, email, password } = req.body;
	console.log(" req.body ", req.body);
	const hashedPassword = await bcrypt.hash(password, BCRYPT_COST);
	try {
		const newUser = await userService.create({
			username,
			email,
			password: hashedPassword,
		});
		if (!newUser) throw new HttpError("Error during registration!", 405);
		res.status(200).json(newUser);
	} catch (error) {
		next(error);
	}
};

const login = async (req, res, next) => {
	const { username, password } = req.body;
	try {
		const user = await userService.findByUsername(username);
		if (!user) throw new HttpError("Invalid e-mail or password!", 405);
		const passwordValid = await bcrypt.compare(password, user.password);
		if (!passwordValid) throw new HttpError("Invalid e-mail or password!", 405);
		const token = jwt.sign(user, JWT_SECRET);
		res.status(200).json(token);
	} catch (error) {
		next(error);
	}
};
export default { registration, login };
