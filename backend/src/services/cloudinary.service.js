import { v2 as cloudinary } from "cloudinary";
import { CLOUD_API_KEY, CLOUD_NAME, CLOUD_SECRET } from "../constants/constants.js";

cloudinary.config({
	cloud_name: CLOUD_NAME,
	api_key: CLOUD_API_KEY,
	api_secret: CLOUD_SECRET,
});

const uploadFile = async ({ img, preset, publicId }) => {
	try {
		const uploadResult = await new Promise((resolve, reject) => {
			cloudinary.uploader
				.upload_stream({ upload_preset: preset, public_id: publicId }, (error, uploadResult) => {
					if (error) {
						return reject(error);
					}
					return resolve(uploadResult);
				})
				.end(img.buffer);
		});
		return uploadResult;
	} catch (error) {
		throw error;
	}
};

const getFolderData = async (folder) => {
	const result = await cloudinary.api.resources_by_asset_folder(
		folder,
		{ max_results: 30 },
		(error, result) => error || result
	);
	return result;
};
export default { uploadFile, getFolderData };
