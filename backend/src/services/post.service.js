import prisma from "../models/prisma-client.js";

const create = async ({ authorId, title, content }) => {
	const newPost = await prisma.posts.create({ data: { authorId, title, content } });
	return newPost;
};

const list = async ({ limit, page, where }) => {
	console.log({ limit, page, where });
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

const getUserIdByPost = async (id) => {
	console.log("getUserIdByPost start ");
	const userId = await prisma.posts.findUnique({
		where: { id },
		select: { userId: true },
	});

	return userId;
};

export default { create, list, getById, getUserIdByPost };
