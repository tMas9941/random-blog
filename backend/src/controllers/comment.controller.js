import { getEvaluatedCommentCount } from "../services/comment-vote.service.js";
import commentService from "../services/comment.service.js";

const create = async (req, res, next) => {
	const { userId, postId, commentId, content } = req.body;

	try {
		const response = await commentService.create({ userId, postId, commentId, content });
		res.status(200).send(response);
	} catch (error) {
		next(error);
	}
};

const list = async (req, res, next) => {
	let { limit, page, where, userId = "" } = req.query;

	if (where) where = JSON.parse(where);
	try {
		const list = await commentService.list({ limit, page, where, userId });

		const newList = await Promise.all(
			list.map(async (post) => {
				return { ...post, voteResult: await getEvaluatedCommentCount(post.id) };
			})
		);

		res.status(200).send(newList);
	} catch (error) {
		next(error);
	}
};
export default { create, list };
