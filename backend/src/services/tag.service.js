import prisma from "../models/prisma-client.js";

const create = async ({ tags }) => {
	const newTags = [];
	for (const tag of tags) {
		if (!(await isTagValid(tag))) {
			await prisma.tags.create({ data: { name: tag } });
			newTags.push(tag);
		}
	}
	return newTags;
};

const list = () => prisma.tags.findMany({ include: { posts: true } });

async function isTagValid(tagName) {
	const result = await prisma.tags.findUnique({ where: { name: tagName } });
	return result;
}

export default { create, list };
