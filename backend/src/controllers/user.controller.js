import userService from "../services/user.service.js";
import HttpError from "../utils/HttpError.js";

const list = async (req, res, next) => {
	try {
		const users = await userService.list();
		if (!users) throw HttpError("Users not found!", 404);
		res.status(200).send(users);
	} catch (error) {
		next(error);
	}
};

const create = async (req, res, next) => {
	const { name, email, password } = req.body;
	try {
		const newUser = await userService.create({
			name,
			email,
			password,
		});
		res.status(200).json(newUser);
	} catch (error) {
		next(error);
	}
};

export default { list, create };
