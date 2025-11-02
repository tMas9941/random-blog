import prisma from "../models/prisma-client.js";

const create = async (data) => {
    const response = await prisma.comments.create({ data });
    return response;
};

const list = async ({ limit, page, where, userId }) => {
    const response = await prisma.comments.findMany({
        skip: limit && page && (page - 1) * limit,
        take: limit && Number(limit),
        include: {
            user: { select: { username: true, profile: { select: { avatarUrl: true } } } },
            votes: true,
            _count: {
                select: {
                    comments: true,
                },
            },
        },
        where: where,
        orderBy: { created: "desc" },
    });
    return response;
};

const destroy = async ({ id }) => {
    const response = await prisma.comments.delete({ where: { id } });
    return response;
};

const getByUserId = async ({ userId }) => {
    const response = await prisma.comments.findMany({ where: { userId } });
    return response;
};

export default { create, list, getByUserId, destroy };
