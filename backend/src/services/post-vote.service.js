import prisma from "../models/prisma-client.js";

const create = async ({ vote, userId, postId }) => {
	console.log("POST create service : ", { vote, userId, postId });
	const result = await prisma.postVotes.create({ data: { vote, userId, postId } });
	return result;
};

const destroy = async ({ userId, postId }) => {
	const result = await prisma.postVotes.delete({ where: { userId_postId: { userId, postId } } });
	return result;
};

const update = async ({ vote, userId, postId }) => {
	const result = await prisma.postVotes.update({ where: { userId_postId: { userId, postId } }, data: { vote } });
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

export async function getEvaluatedVoteCount(postId) {
	const res = await prisma.postVotes.findMany({ where: { postId } });
	// vote => positive votes
	const evaluatedVoteCount = { vote: res.filter((vote) => vote.vote > 0).length, total: res.length };
	return evaluatedVoteCount;
}

export default { create, list, destroy, update };
