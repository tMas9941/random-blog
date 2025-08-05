import tagService from "../services/tag.service.js";
import HttpError from "../utils/HttpError.js";

const list = async (req, res, next) => {
	try {
		const list = await tagService.list();
		if (!list) throw new HttpError("Error during get tag query!", 405);
		res.status(200).send(list);
	} catch (error) {
		next(error);
	}
};

export default { list };
