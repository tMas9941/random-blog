import commentVoteService from "../services/comment-vote.service.js";
import HttpError from "../utils/HttpError.js";

const create = async (req, res, next) => {
	const { value, userId, commentId } = req.body;
	try {
		const create = await commentVoteService.create({ value, userId, commentId });
		if (!create) throw new HttpError("Error during voting!", 405);

		res.status(200).send(create);
	} catch (error) {
		next(error);
	}
};

const destroy = async (req, res, next) => {
	const { userId, commentId } = req.body;
	try {
		const create = await commentVoteService.destroy({ userId, commentId });
		if (!create) throw new HttpError("Error during voting!", 405);

		res.status(200).send(create);
	} catch (error) {
		next(error);
	}
};

const update = async (req, res, next) => {
	const { value, userId, commentId } = req.body;
	try {
		const create = await commentVoteService.update({ value, userId, commentId });
		if (!create) throw new HttpError("Error during voting!", 405);

		res.status(200).send(create);
	} catch (error) {
		next(error);
	}
};
const list = async (req, res, next) => {
	try {
		const list = await commentVoteService.list();
		if (!list) throw new HttpError("Error during list query!", 405);
		res.status(200).send(list);
	} catch (error) {
		next(error);
	}
};

export default { create, list, destroy, update };
