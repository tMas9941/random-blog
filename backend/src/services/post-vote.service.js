import prisma from "../models/prisma-client.js";

const create = async ({ positive, userId, postId }) => {
	const result = await prisma.postVotes.create({ data: { positive, userId, postId } });
	return result;
};

const destroy = async ({ userId, postId }) => {
	const result = await prisma.postVotes.delete({ where: { userId_postId: { userId, postId } } });
	return result;
};

const update = async ({ positive, userId, postId }) => {
	const result = await prisma.postVotes.update({ where: { userId_postId: { userId, postId } }, data: { positive } });
	return result;
};

const list = async () => {
	const list = await prisma.postVotes.findMany();
	return list;
};

export async function findVote(where) {
	const res = await prisma.postVotes.findFirst({ where });
	return res.id;
}

export default { create, list, destroy, update };
