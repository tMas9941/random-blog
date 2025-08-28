import prisma from "../models/prisma-client.js";

const list = async () => await prisma.users.findMany();

const create = async ({ username, email, password }) => {
	const newUser = await prisma.users.create({
		data: {
			username,
			email,
			password,
		},
	});
	return newUser;
};
const getById = async (id) => await prisma.users.findUnique({ where: { id }, include: { profile: true } });

const getPermissionsById = async (id) => await prisma.users.findUnique({ where: { id }, include: { profile: true } });

const findByEmail = async (email) => await prisma.users.findFirst({ where: { email } });

const findByUsername = async (username) =>
	await prisma.users.findFirst({ where: { username }, include: { profile: true } });

export default { list, create, findByEmail, findByUsername, getById };
