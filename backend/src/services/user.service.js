import prisma from "../models/prisma-client.js";

const list = () => prisma.user.findMany();

const create = ({ name, email, password }) => {
	// if (emailExists) throw new HttpError("Email already exists!", 403);
	// const hashedPassword = await bcrypt.hash(password, 5);

	const newUser = prisma.user.create({
		data: {
			name,
			email,
			// password: hashedPassword,
			password,
		},
	});

	return newUser;
};

export default { list, create };
