import React from "react";

import "./round-loader.css";
import "./line-loader.css";

export default function Loader({ className }) {
	return (
		<div className="flex items-center justify-center w-full min-h-[200px] rounded-lg bg-secondary/10 ">
			<div className={"h-10 !text-accent brightness-120 " + className}>Loader</div>
		</div>
	);
}
