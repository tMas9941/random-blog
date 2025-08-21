import React, { useState } from "react";
import ColorButton from "../buttons/ColorButton";
import SvgComponent from "./SvgComponent";

const UploadAndDisplayImage = () => {
	const [selectedImage, setSelectedImage] = useState(null);

	return (
		<div className=" flex flex-col ">
			<div className="relative w-[200px] h-[200px] max-w-[200px] max-h-[200px] overflow-hidden rounded-full border-5 border-primary [&>*]:transition-all [&>*]:duration-150 [&>*]:ease-out">
				{selectedImage && (
					<img
						alt="Image not found!"
						className="z-2 w-full h-full pointer-events-none "
						src={URL.createObjectURL(selectedImage)}
					/>
				)}

				<ColorButton
					className="absolute top-0 right-0 !p-1 bg-primary/80 hover:bg-primary "
					onClick={() => setSelectedImage(null)}
				>
					<SvgComponent name={"close"} size={20} />
				</ColorButton>
				<input
					type="file"
					title="Change picture..."
					className="absolute peer left-0 -top-[15%] z-1 w-full h-[115%] cursor-pointer hover:bg-primary/30"
					onChange={(event) => {
						event.stopPropagation();
						setSelectedImage(event.target.files[0]);
					}}
				/>

				<SvgComponent
					name={"uploadImg"}
					size={100}
					className={
						"z-2 stroke-primary absolute opacity-0 left-0 right-0 top-0 bottom-0 m-auto w-fit h-fit peer-hover:opacity-100 pointer-events-none brightness-120 "
					}
				/>
			</div>
		</div>
	);
};

// Export the UploadAndDisplayImage component as default
export default UploadAndDisplayImage;
