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
	try {
		const response = await commentService.list();
		res.status(200).send(response);
	} catch (error) {
		next(error);
	}
};
export default { create, list };
