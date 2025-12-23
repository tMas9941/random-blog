import prisma from "../models/prisma-client.js";

const create = async ({ data }) => {
    const response = await prisma.profiles.create({ data });
    return response;
};

const updateProfile = async (data, userId) => {
    const response = await prisma.profiles.update({ where: { userId }, data });
    return response;
};
export default { create, updateProfile };
