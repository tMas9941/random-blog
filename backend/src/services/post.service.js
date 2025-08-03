import prisma from "../models/prisma-client.js";

const create = ({ authorId, title, content }) => {
	const newPost = prisma.posts.create({ data: { authorId, title, content } });
	console.log("create  ", newPost);
	return newPost;
};
const list = () => {
	const list = prisma.posts.findMany({ include: { author: { select: { username: true } } } });

	return list;
};

export default { create, list };
