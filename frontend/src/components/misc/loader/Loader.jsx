import React from "react";

import "./round-loader.css";
import "./line-loader.css";

export default function Loader({ className }) {
	return <div className={"h-10 " + className}>Loader</div>;
}
