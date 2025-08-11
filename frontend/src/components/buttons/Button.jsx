import React from "react";

export default function Button({ children, text, className, onClick, type = "button", disabled, title }) {
	return (
		<button
			disabled={disabled}
			className={`py-1 px-3 h-fit text-center font-semibold text-md flex justify-center items-center ${
				disabled ? "!bg-gray-400 !text-white !fill-white" : "cursor-pointer hover:brightness-110 active:brightness-95 "
			} ${className}`}
			onClick={onClick}
			type={type}
			title={title}
		>
			{children}
			{text}
		</button>
	);
}
