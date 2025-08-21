import React, { useState } from "react";

// Components
import SvgComponent from "./SvgComponent";

import objToFormData from "../../utils/objToFormData";
import cloudinaryService from "../../services/cloudinary.service";

const UploadAndDisplayImage = () => {
	const [selectedImage, setSelectedImage] = useState(
		"http://res.cloudinary.com/dq8pa0opv/image/upload/v1755794551/s2ukqq4y9ylu9k8w6e04.jpg"
	);

	const handleUpload = async (e) => {
		e.stopPropagation();
		if (!e.target.files[0]) return;

		const data = objToFormData({
			file: e.target.files[0],
			upload_preset: "avatar_upload",
			cloudName: "dq8pa0opv",
		});
		console.log(URL.createObjectURL(e.target.files[0]));
		setSelectedImage(URL.createObjectURL(e.target.files[0]));
		const resFile = await cloudinaryService.uploadFile(data);
		console.log(resFile.url);
		setSelectedImage(resFile.url);
	};

	const handleSubmit = (e) => {
		console.log(e.target);
	};
	return (
		<div className=" flex flex-col ">
			<div className="relative w-[200px] h-[200px] max-w-[200px] max-h-[200px]  overflow-hidden rounded-[15%] border-5 border-primary [&>*]:transition-all [&>*]:duration-150 [&>*]:ease-out">
				{selectedImage && <img className="z-2 w-full h-full scale-105 pointer-events-none " src={selectedImage} />}
				<input
					type="file"
					title="Change picture..."
					className="absolute peer -left-[5%] -top-[15%] z-1 w-[110%] h-[120%] cursor-pointer hover:bg-primary/40"
					onChange={handleUpload}
				/>
				<SvgComponent
					name={"uploadImg"}
					size={100}
					className={
						"z-2 stroke-primary pointer-events-none absolute opacity-0 left-0 right-0 top-0 bottom-0 m-auto w-fit h-fit peer-hover:opacity-100 pointer-es-none brightness-120 "
					}
				/>
				-
			</div>
		</div>
	);
};

// Export the UploadAndDisplayImage component as default
export default UploadAndDisplayImage;
