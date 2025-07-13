import React from "react";

export default function Button({ children, text, className, onClick, type = "button", disabled }) {
	return (
		<button
			disabled={disabled}
			className={`py-1 px-3 h-fit text-center font-semibold ${
				disabled
					? "!bg-gray-400"
					: "text-md cursor-pointer hover:brightness-110 active:brightness-95 flex justify-center items-center"
			} ${className}`}
			onClick={onClick}
			type={type}
		>
			{children}
			{text}
		</button>
	);
}
