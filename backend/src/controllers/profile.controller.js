import cloudinaryService from "../services/cloudinary.service.js";
import profileService from "../services/profile.service.js";
import textLimiter from "../utils/textLimiter.js";

const updateProfile = async (req, res, next) => {
    const data = textLimiter(req.body, null, "Profiles");
    const userId = req.params.id; // userId
    const img = req.file;

    try {
        if (img) {
            const cloudinaryResponse = await cloudinaryService.uploadFile({
                img,
                publicId: userId,
                preset: "avatar_upload",
            });
            data.avatarUrl = cloudinaryResponse.url;
        }

        const response = await profileService.updateProfile(data, userId);
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
};

export default { updateProfile };
