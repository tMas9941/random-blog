import prisma from "../models/prisma-client.js";

const create = async ({ authorId, title, content }) => {
	const newPost = await prisma.posts.create({ data: { authorId, title, content } });
	return newPost;
};

const list = async () => {
	const list = await prisma.posts.findMany({ include: { author: { select: { username: true } } } });
	return list;
};

export default { create, list };
