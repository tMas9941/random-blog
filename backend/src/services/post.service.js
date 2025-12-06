import prisma from "../models/prisma-client.js";
import HttpError from "../utils/HttpError.js";

const create = async ({ userId, title, content }) => {
    const newPost = await prisma.posts.create({ data: { userId, title, content } });
    return newPost;
};

const changeImgUrl = async ({ id, url }) => {
    try {
        const result = await prisma.posts.update({ where: { id }, data: { imgUrl: url } });
        return result;
    } catch (error) {
        throw new HttpError("Database error! (change post img)" + error, 403);
    }
};

const list = async ({ limit, page, where }) => {
    const list = await prisma.posts.findMany({
        skip: limit && page && (page - 1) * limit,
        take: limit && Number(limit),
        include: {
            user: { select: { username: true, profile: { select: { avatarUrl: true } } } },
            tags: { select: { tagName: true } },
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
    return list;
};

const destroy = async (id) => {
    const post = await prisma.posts.delete({ where: { id } });
    return post;
};

const getById = async ({ id }) => {
    const post = await prisma.posts.findUnique({
        where: { id },
        include: {
            user: { select: { username: true, profile: { select: { avatarUrl: true } } } },
            tags: { select: { tagName: true } },
            votes: true,
        },
    });

    return post;
};

const getPostOwner = async (id) => {
    const userId = await prisma.posts.findUnique({
        where: { id },
        select: { userId: true },
    });

    return userId;
};

export default { create, list, destroy, getById, getPostOwner, changeImgUrl };
