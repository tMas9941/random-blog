import cloudinaryService from "../services/cloudinary.service.js";
import profileService from "../services/profile.service.js";

const updateAvatar = async (req, res, next) => {
    const { profileId } = req.body;

    try {
        const cloudinaryResponse = await cloudinaryService.uploadFile({
            img: req.file,
            publicId: profileId,
            preset: "avatar_upload",
        });
        const dbResponse = await profileService.updateAvatarUrl({ url: cloudinaryResponse.url, profileId });
        res.status(200).send(dbResponse);
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

export default { updateAvatar, updateIntroduction };
