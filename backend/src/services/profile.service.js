import prisma from "../models/prisma-client.js";
import HttpError from "../utils/HttpError.js";

const create = async ({ data }) => {
	const response = await prisma.profiles.create({ data });
	return response;
};

const updateAvatarUrl = async ({ url, profileId }) => {
	const newUrl = await prisma.profiles.update({ where: { id: profileId }, data: { avatarUrl: url } });
	return newUrl;
};

const updateIntroduction = async ({ data, profileId }) => {
	const newIntro = await prisma.profiles.update({ where: profileId });
	return newIntro;
};

export default { updateAvatarUrl, updateIntroduction, create };
