import postVoteService, { findVote } from "../services/post-vote.service.js";
import HttpError from "../utils/HttpError.js";

const create = async (req, res, next) => {
	const { positive, userId, postId } = req.body;
	try {
		const create = await postVoteService.create({ positive, userId, postId });
		if (!create) throw new HttpError("Error during voting!", 405);

		res.status(200).send(create);
	} catch (error) {
		next(error);
	}
};

const destroy = async (req, res, next) => {
	const { userId, postId } = req.body;
	try {
		const create = await postVoteService.destroy({ userId, postId });
		if (!create) throw new HttpError("Error during voting!", 405);

		res.status(200).send(create);
	} catch (error) {
		next(error);
	}
};

const update = async (req, res, next) => {
	const { userId, postId, positive } = req.body;
	try {
		const create = await postVoteService.update({ userId, postId, positive });
		if (!create) throw new HttpError("Error during voting!", 405);

		res.status(200).send(create);
	} catch (error) {
		next(error);
	}
};
const list = async (req, res, next) => {
	try {
		const list = await postVoteService.list();
		if (!list) throw new HttpError("Error during list query!", 405);
		res.status(200).send(list);
	} catch (error) {
		next(error);
	}
};

export default { create, list, destroy, update };
