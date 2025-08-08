import voteService from "../services/vote.service.js";
import HttpError from "../utils/HttpError.js";

const create = async (req, res, next) => {
	// const { postId, tagId } = req.body;
	try {
		const create = await voteService.create();
		if (!create) throw new HttpError("Error during voting!", 405);

		res.status(200).send(newPost);
	} catch (error) {
		next(error);
	}
};

const list = async (req, res, next) => {
	try {
		const list = await voteService.list();
		if (!list) throw new HttpError("Error during list query!", 405);
		res.status(200).send(list);
	} catch (error) {
		next(error);
	}
};

export default { create, list };
