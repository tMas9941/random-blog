import prisma from "../models/prisma-client.js";

const create = async ({ userId, postId, commentId, content }) => {
	let newData = { userId, postId, commentId, content };
	const response = await prisma.comments.create({ data: newData });
	return response;
};

const list = async () => {
	const response = await prisma.comments.findMany({ include: { user: { select: { username: true } } } });
	return response;
};
export default { create, list };
