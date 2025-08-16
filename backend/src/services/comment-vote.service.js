import prisma from "../models/prisma-client.js";

const create = async ({ vote, userId, commentId }) => {
	const result = await prisma.commentVotes.create({ data: { vote, userId, commentId } });
	return result;
};

const destroy = async ({ userId, commentId }) => {
	const result = await prisma.commentVotes.delete({ where: { userId_commentId: { userId, commentId } } });
	return result;
};

const update = async ({ vote, userId, commentId }) => {
	const result = await prisma.commentVotes.update({
		where: { userId_commentId: { userId, commentId } },
		data: { vote },
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

export async function getEvaluatedCommentCount(commentId) {
	const res = await prisma.commentVotes.findMany({ where: { commentId } });
	// vote => positive votes
	const evaluatedVoteCount = { vote: res.filter((vote) => vote.vote > 0).length, total: res.length };
	return evaluatedVoteCount;
}

export default { create, list, destroy, update };
