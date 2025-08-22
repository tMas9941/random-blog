import { v2 as cloudinary } from "cloudinary";
import { CLOUD_API_KEY, CLOUD_NAME, CLOUD_SECRET } from "../constants/constants.js";

const config = () => {
	cloudinary.config({
		cloud_name: CLOUD_NAME,
		api_key: CLOUD_API_KEY,
		api_secret: CLOUD_SECRET,
	});
};

const uploadImage = async () => {
	config();
	const uploadResult = await cloudinary.uploader
		.upload("./src/services/sky.jpg", {
			public_id: "shoes",
			transformation: [
				{
					fetch_format: "auto",
					quality: "auto",
				},
				{
					crop: "auto",
					gravity: "auto",
					width: 200,
					height: 200,
				},
			],
		})
		.catch((error) => {
			console.log(error);
		});
};

const getFolderData = async (folder) => {
	config();
	const result = await cloudinary.api.resources_by_asset_folder(
		folder,
		{ max_results: 30 },
		(error, result) => error || result
	);
	return result;
};
export default { uploadImage, getFolderData };
