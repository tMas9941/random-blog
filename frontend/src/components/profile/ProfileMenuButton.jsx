import React from "react";
import Button from "../buttons/Button";

export default function ProfileMenuButton({ text, onClick, location }) {
	const underLine = ` after:bg-secondary ${
		location.pathname.split("/")[2] === text.toLowerCase() && " after:h-[3px] "
	}  after:w-full after:absolute after:left-0 after:bottom-0 `;
	const className =
		"relative bg-transparent text-n-text font-bold hover:bg-secondary/30 rounded-none min-h-full " + underLine;
	return <Button text={text.toUpperCase()} className={className} onClick={onClick} />;
}
