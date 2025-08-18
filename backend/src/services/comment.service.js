import prisma from "../models/prisma-client.js";

const create = async ({ userId, postId, commentId, content }) => {
	let newData = { userId, postId, commentId, content };
	const response = await prisma.comments.create({ data: newData });
	return response;
};

const list = async ({ limit, page, where, userId }) => {
	const response = await prisma.comments.findMany({
		skip: limit && page && (page - 1) * limit,
		take: limit && Number(limit),
		include: { user: { select: { username: true } }, votes: { where: { userId } } },
		where: where,
		orderBy: { created: "desc" },
	});

	return response;
};
export default { create, list };
