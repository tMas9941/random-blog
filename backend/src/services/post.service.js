import prisma from "../models/prisma-client.js";

const create = async ({ authorId, title, content }) => {
	const newPost = await prisma.posts.create({ data: { authorId, title, content } });
	return newPost;
};

const list = async ({ limit, page, where, userId }) => {
	const list = await prisma.posts.findMany({
		skip: limit && page && (page - 1) * limit,
		take: limit && Number(limit),
		include: {
			author: { select: { username: true } },
			tags: { select: { tagName: true } },
			votes: { where: { userId } },
		},
		where: where,
		orderBy: { created: "desc" },
	});
	return list;
};

const getById = async ({ id, userId = "" }) => {
	const post = await prisma.posts.findUnique({
		where: { id },
		include: {
			author: { select: { username: true } },
			tags: { select: { tagName: true } },
			votes: { where: { userId } },
		},
	});
	return post;
};

export default { create, list, getById };
