import userService from "../services/user.service.js";
import HttpError from "../utils/HttpError.js";

// security
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/constants.js";
import profileService from "../services/profile.service.js";

const BCRYPT_COST = 12;
const DEFAULT_AVATAR_URL = "https://res.cloudinary.com/dq8pa0opv/image/upload/v1755891085/jmlg25spfwlyxqop3ubm.jpg";

const registration = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        if (await userService.findByUsername(username)) throw new HttpError("Username already used!", 403);
        if (await userService.findByEmail(email)) throw new HttpError("E-mail already used!", 403);
        const hashedPassword = await bcrypt.hash(password, BCRYPT_COST);
        const newUser = await userService.create({
            username,
            email,
            password: hashedPassword,
        });
        newUser.profile = await profileService.create({
            data: {
                userId: newUser.id,
                avatarUrl: DEFAULT_AVATAR_URL,
                introduction: "",
            },
        });

        if (!newUser) throw new HttpError("Error during registration!", 405);
        res.status(200).json();
    } catch (error) {
        next(error);
    }
};

// const profiles = await prisma.profiles.createManyAndReturn({
// 	data: users.map((user) => {
// 		const randomNumber = rand(0, countAvatar - 1);

// 		return {
// 			userId: user.id,
// 			avatarUrl: cloudDefaultAvatars.resources[randomNumber].secure_url,
// 			introduction: paragraphs[rand(0, paragraphs.length - 1)].slice(0, MAX_COMMENT_LENGTH),
// 		};
// 	}),
// });

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
