import React from "react";
import SvgComponent from "../misc/SvgComponent";

export default function TagBlock({ name = "Default", remove }) {
	return (
		<div className=" p-2  py-[1px] bg-secondary/30 border border-secondary/60 flex gap-2 items-center rounded-[3px] text-md font-semibold ">
			{name}
			{remove && (
				<SvgComponent name={"close"} size={18} className={"fill-accent cursor-pointer"} onClick={() => remove(name)} />
			)}
		</div>
	);
}
