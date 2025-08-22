import userService from "../services/user.service.js";
import HttpError from "../utils/HttpError.js";

const list = async (req, res, next) => {
	try {
		const users = await userService.list();
		if (!users) throw new HttpError("Users not found!", 404);
		res.status(200).send(users);
	} catch (error) {
		next(error);
	}
};

const getById = async (req, res, next) => {
	const { id } = req.params;

	try {
		const user = await userService.getById(id);
		if (!user) throw new HttpError("User not found!", 404);
		res.status(200).send(user);
	} catch (error) {
		next(error);
	}
};

export default { list, getById };
