import prisma from "../models/prisma-client.js";

const create = async ({ authorId, title, content }) => {
	const newPost = await prisma.posts.create({ data: { authorId, title, content } });
	return newPost;
};

const list = async ({ limit, page }) => {
	const list = await prisma.posts.findMany({
		skip: (page - 1) * limit,
		take: Number(limit),
		include: { author: { select: { username: true } }, tags: { select: { tagName: true } } },
		orderBy: { created: "desc" },
	});
	return list;
};

export default { create, list };
