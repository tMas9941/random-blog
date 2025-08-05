import prisma from "../models/prisma-client.js";

const list = () => prisma.users.findMany();

const create = ({ username, email, password }) => {
	const newUser = prisma.users.create({
		data: {
			username,
			email,
			password,
		},
	});

	return newUser;
};

const findByEmail = (email) => prisma.users.findFirst({ where: { email } });

const findByUsername = (username) => prisma.users.findFirst({ where: { username } });

export default { list, create, findByEmail, findByUsername };
