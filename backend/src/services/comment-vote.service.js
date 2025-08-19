import prisma from "../models/prisma-client.js";

const create = async ({ value, userId, commentId }) => {
	const result = await prisma.commentVotes.create({ data: { value, userId, commentId } });
	return result;
};

const destroy = async ({ userId, commentId }) => {
	const result = await prisma.commentVotes.delete({ where: { userId_commentId: { userId, commentId } } });
	return result;
};

const update = async ({ value, userId, commentId }) => {
	const result = await prisma.commentVotes.update({
		where: { userId_commentId: { userId, commentId } },
		data: { value },
	});
	return result;
};

const list = async () => {
	const list = await prisma.commentVotes.findMany();
	return list;
};

export async function fundComment(where) {
	const res = await prisma.commentVotes.findFirst({ where });
	return res.id;
}

export default { create, list, destroy, update };
