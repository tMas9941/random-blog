import postTagService from "../services/post-tag.service.js";
import HttpError from "../utils/HttpError.js";

const create = async (req, res, next) => {
	const { postId, tagId } = req.body;
	try {
		const addTag = await postTagService.create({ postId, tagId });
		if (!addTag) throw new HttpError("Error during post-tag creation!", 405);

		res.status(200).send(newPost);
	} catch (error) {
		next(error);
	}
};

const list = async (req, res, next) => {
	try {
		const list = await postTagService.list();
		if (!list) throw new HttpError("Error during list query!", 405);
		res.status(200).send(list);
	} catch (error) {
		next(error);
	}
};

export default { create, list };
