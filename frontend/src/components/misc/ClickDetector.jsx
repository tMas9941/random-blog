import React from "react";

// use for hiding pupups or dropdown menus
export default function ClickDetector({ onClick, hidden }) {
	return <a className="fixed z-19 left-0 top-0 min-h-full min-w-full " onClick={onClick} hidden={hidden}></a>;
}
