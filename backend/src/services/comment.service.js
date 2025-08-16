import prisma from "../models/prisma-client.js";

const create = async ({ userId, postId, commentId, content }) => {
	let newData = { userId, postId, commentId, content };
	// Object.keys(newData).forEach((key) => !newData[key] && delete newData[key]);
	console.log("newData ", newData);
	const response = await prisma.comments.create({ data: newData });
	return response;
};

const list = async () => {
	const response = await prisma.comments.findMany({ include: { user: { select: { username: true } } } });
	console.log("comments list  ", response);
	return response;
};
export default { create, list };
