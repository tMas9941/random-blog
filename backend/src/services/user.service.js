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

const verifyById = async (id) => await prisma.users.findUnique({ where: { id }, select: { username: true } });

const findByEmail = async (email) => await prisma.users.findFirst({ where: { email } });

const findByUsername = async (username) =>
    await prisma.users.findFirst({ where: { username }, include: { profile: true } });

const changePassword = async (id, password) => await prisma.users.update({ where: { id }, data: { password } });

const getHashedPassword = async (id) => await prisma.users.findUnique({ where: { id }, select: { password: true } });

const updateUserData = async (id, { username, email }) =>
    await prisma.users.update({ where: { id }, data: { username, email } });

export default {
    list,
    create,
    findByEmail,
    findByUsername,
    getById,
    verifyById,
    changePassword,
    getHashedPassword,
    updateUserData,
};
