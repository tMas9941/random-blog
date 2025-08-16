import React from "react";

export default function ButtonContainer({ className, children }) {
	return (
		<div
			className={
				"flex gap-4 [&>*]:hover:bg-primary/20 [&>*]:hover:brightness-110 [&>*]:rounded-md [&>*]:px-1 [&>*]:py-1 " +
				className
			}
		>
			{children}
		</div>
	);
}
