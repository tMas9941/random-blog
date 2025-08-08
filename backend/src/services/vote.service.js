import prisma from "../models/prisma-client.js";

const create = async () => {
	console.log("votes service CREATE");
	// for (const tag of tags) {
	// 	const newPostTag = await prisma.votes.create({ data: { postId, tagName: tag } });
	// 	postTags.push(newPostTag);
	// }
	return postTags;
};

const list = () => {
	const list = prisma.votes.findMany();
	return list;
};

export default { create, list };
