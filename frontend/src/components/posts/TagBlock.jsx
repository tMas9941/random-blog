import React from "react";
import SvgComponent from "../misc/SvgComponent";

export default function TagBlock({ name = "Default", remove }) {
	return (
		<div className="px-2 py-1  bg-secondary/20 border border-secondary/50 flex gap-2 items-center rounded-md text-lg font-semibold ">
			{name}
			{remove && (
				<SvgComponent name={"close"} size={18} className={"fill-accent cursor-pointer"} onClick={() => remove(name)} />
			)}
		</div>
	);
}
