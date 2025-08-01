import prisma from "../models/prisma-client.js";

const create = ({ authorId, title, content }) => {
	const newPost = prisma.post.create({ data: { authorId, title, content } });
	return newPost;
};
const list = () => {
	const list = prisma.post.findMany({ include: { author: { select: { username: true } } } });
	console.log("lsit  ", list);
	return list;
};

export default { create, list };
