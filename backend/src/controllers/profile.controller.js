import profileService from "../services/profile.service.js";

const updateAvatarUrl = async (req, res, next) => {
	const { url, profileId } = req.body;

	try {
		const response = await profileService.updateAvatarUrl({ url, profileId });
		res.status(200).send(response);
	} catch (error) {
		next(error);
	}
};

const updateIntroduction = async (req, res, next) => {
	try {
		const response = await profileService.updateIntroduction({ data, profileId });
		res.status(200).send(response);
	} catch (error) {
		next(error);
	}
};

export default { updateAvatarUrl, updateIntroduction };
