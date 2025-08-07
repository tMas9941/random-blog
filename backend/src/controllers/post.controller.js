import postTagService from "../services/post-tag.service.js";
import postService from "../services/post.service.js";
import tagService from "../services/tag.service.js";
import HttpError from "../utils/HttpError.js";

const create = async (req, res, next) => {
	const { userId, title, content, tags } = req.body;

	try {
		const addTag = await tagService.create({ tags });
		if (!addTag) throw new HttpError("Error during tag creation!", 405);

		const newPost = await postService.create({ authorId: userId, title, content });
		if (!newPost) throw new HttpError("Error during post creation!", 405);

		const postTag = await postTagService.create({ postId: newPost.id, tags });
		if (!postTag) throw new HttpError("Error during post creation!", 405);

		res.status(200).send(newPost);
	} catch (error) {
		next(error);
	}
};

const list = async (req, res, next) => {
	const { limit, page } = req.query;
	console.log("limit ", req.query, "req.data: ", req.data, req.params, req.body, req.limit, { limit, page });
	try {
		const list = await postService.list({ limit, page });
		if (!list) throw new HttpError("Error during post query!", 405);
		res.status(200).send(list);
	} catch (error) {
		next(error);
	}
};

export default { create, list };
