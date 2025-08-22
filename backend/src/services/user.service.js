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
const getById = (id) => prisma.users.findUnique({ where: { id }, include: { profile: true } });
const findByEmail = (email) => prisma.users.findFirst({ where: { email } });

const findByUsername = (username) => prisma.users.findFirst({ where: { username }, include: { profile: true } });

export default { list, create, findByEmail, findByUsername, getById };
