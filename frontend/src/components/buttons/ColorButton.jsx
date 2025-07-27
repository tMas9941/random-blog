import React from "react";
import Button from "./Button";

export default function ColorButton({ text, className = "", onClick, disabled, title }) {
	const newClass = "bg-primary rounded text-n-text text-xl px-5 py-2 " + className;
	return <Button text={text} className={newClass} onClick={onClick} disabled={disabled} title={title} />;
}
