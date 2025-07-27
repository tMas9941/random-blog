import React from "react";
import Button from "./Button";

export default function HeaderButton({ text, onClick, location }) {
	const underLine = ` after:bg-primary ${
		location.pathname.split("/")[1] === text.toLowerCase() && " after:h-[4px] "
	}  after:w-full after:absolute after:left-0 after:bottom-0 `;
	const className =
		"relative  bg-transparent text-n-text font-bold hover:bg-secondary/30 h-full rounded-none my-0 min-h-12 " +
		underLine;
	return <Button text={text.toUpperCase()} className={className} onClick={onClick} />;
}
