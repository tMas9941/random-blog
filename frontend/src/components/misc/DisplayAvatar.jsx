import React, { useState } from "react";

// Components
import SvgComponent from "./SvgComponent";

import objToFormData from "../../utils/objToFormData";
import cloudinaryService from "../../services/cloudinary.service";
import { CLOUD_NAME } from "../../constants/constants";
import profileService from "../../services/profile.service";
import Loader from "./loader/Loader";
import { userSignal } from "../../global/userData";

const DisplayAvatar = ({ url, profileId }) => {
	const [selectedImage, setSelectedImage] = useState(url);
	const [loading, setLoading] = useState(false);

	const handleUpload = async (e) => {
		e.stopPropagation();
		if (!e.target.files[0]) return;

		const data = objToFormData({
			file: e.target.files[0],
			upload_preset: "avatar_upload",
			cloudName: CLOUD_NAME,
		});
		setLoading(true);
		// Upload img to Cloudinary
		const resFile = await cloudinaryService.uploadFile(data);

		// Refresh Cloudonary URL in database
		const changeDB = await profileService.updateAvatarUrl({ url: resFile.url, profileId });

		// Change Cloudonary URL in local user
		userSignal.changeValue({ ...userSignal.value, profile: { ...userSignal.value.profile, avatarUrl: resFile.url } });

		// Change component states
		setSelectedImage(resFile.url);
		setLoading(false);
	};

	const handleSubmit = (e) => {
		console.log(e.target);
	};
	return (
		<div className="flex flex-col  ">
			<div className="relative group w-[200px] h-[200px] overflow-hidden max-w-[200px] max-h-[200px] rounded-[15%] border-6 border-primary  [&>*]:transition-all [&>*]:duration-150 [&>*]:ease-out">
				{selectedImage && (
					<img className="z-2 absolute w-full h-full scale-105 pointer-events-none" src={selectedImage} />
				)}
				{loading ? (
					<div className="absolute z-3 w-full h-full backdrop-blur-[2px] bg-black/50">
						<Loader className={"round-loader"} />
					</div>
				) : (
					<>
						<input
							type="file"
							title="Change picture..."
							className="absolute -left-[5%] -top-[15%] z-3 w-[110%] h-[120%] cursor-pointer hover:bg-[black]/50 group-hover:backdrop-blur-[2px]"
							onChange={handleUpload}
						/>
						<SvgComponent
							name={"uploadImg"}
							size={100}
							className={
								"z-4 stroke-primary pointer-events-none absolute opacity-0 left-0 right-0 top-0 bottom-0 m-auto w-fit h-fit group-hover:opacity-100 brightness-120 "
							}
						/>
					</>
				)}
			</div>
		</div>
	);
};

// Export the UploadAndDisplayImage component as default
export default DisplayAvatar;
