import prisma from "../models/prisma-client.js";

const list = () => prisma.users.findMany();

const create = ({ username, email, password }) => {
	// if (emailExists) throw new HttpError("Email already exists!", 403);
	// const hashedPassword = await bcrypt.hash(password, 5);

	const newUser = prisma.users.create({
		data: {
			username,
			email,
			// password: hashedPassword,
			password,
		},
	});

	return newUser;
};

const findByEmail = (email) => prisma.users.findFirst({ where: { email } });

const findByUsername = (username) => prisma.users.findFirst({ where: { username } });

export default { list, create, findByEmail, findByUsername };
