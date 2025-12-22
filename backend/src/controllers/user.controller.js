import { BCRYPT_COST } from "../constants/constants.js";
import userService from "../services/user.service.js";
import HttpError from "../utils/HttpError.js";
import bcrypt from "bcrypt";
import textLimiter from "../utils/textLimiter.js";

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

const changePassword = async (req, res, next) => {
    const { password, newPassword } = req.body;
    const { id } = req.params;

    try {
        const user = await userService.getById(id);
        const hashedDbPassword = user.password;

        const passwordValid = await bcrypt.compare(password, hashedDbPassword);
        if (!passwordValid) throw new HttpError("Invalid password!", 403);

        const passwordsMatch = await bcrypt.compare(newPassword, hashedDbPassword);
        if (passwordsMatch) throw new HttpError("New password can't be the same!", 403);

        const newHashedPassword = await bcrypt.hash(newPassword, BCRYPT_COST);
        const response = await userService.changePassword(id, newHashedPassword);

        res.status(200).send("Password cahnged!");
    } catch (error) {
        next(error);
    }
};

const updateUserData = async (req, res, next) => {
    const data = textLimiter(req.body, null, "Users");
    const id = req.userId;

    try {
        const response = await userService.updateUserData(id, data);
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
};

export default { list, getById, changePassword, updateUserData };
