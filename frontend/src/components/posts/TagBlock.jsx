import React from "react";
import SvgComponent from "../misc/SvgComponent";

export default function TagBlock({ name = "Default", remove }) {
	return (
		<div className="px-2  bg-secondary/10 border border-secondary/50 flex gap-2 items-center rounded  text-md font-semibold ">
			{name}
			{remove && (
				<SvgComponent name={"close"} size={18} className={"fill-accent cursor-pointer"} onClick={() => remove(name)} />
			)}
		</div>
	);
}
