import postService from "../services/post.service.js";
import HttpError from "../utils/HttpError.js";

const create = async (req, res, next) => {
	const { userId, title, content } = req.body;
	try {
		const newPost = await postService.create({ authorId: userId, title, content });
		if (!newPost) throw new HttpError("Error during post creation!", 405);
		res.status(200).send(newPost);
	} catch (error) {
		next(error);
	}
};

const list = async (req, res, next) => {
	try {
		const list = await postService.list();
		console.log("lsit  ", list);
		if (!list) throw new HttpError("Error during post query!", 405);
		res.status(200).send(list);
	} catch (error) {
		nest(error);
	}
};

export default { create, list };
