import React from "react";
import Button from "./Button";

export default function ColorButton({ text, type = "button", className = "", onClick, disabled, title, children }) {
	const newClass = "bg-primary rounded text-n-text text-lg px-4 py-1 " + className + " disabled:text-white ";
	return (
		<Button
			text={text}
			type={type}
			className={newClass}
			onClick={onClick}
			disabled={disabled}
			title={title}
			children={children}
		/>
	);
}
