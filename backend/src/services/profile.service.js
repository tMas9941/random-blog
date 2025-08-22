import prisma from "../models/prisma-client.js";

const updateAvatarUrl = async ({ url, profileId }) => {
	try {
		const newUrl = await prisma.profiles.update({ where: { id: profileId }, data: { avatarUrl: url } });
		return newUrl;
	} catch (error) {
		throw error;
	}
};

const updateIntroduction = async ({ data, profileId }) => {
	const newIntro = await prisma.profiles.update({ where: profileId });
	return newIntro;
};

export default { updateAvatarUrl, updateIntroduction };
