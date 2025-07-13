import React, { useRef } from "react";

export default function PopupWindow({ children, className, hidden, arrowRight = 0 }) {
	return (
		<div hidden={hidden} className={`z-10 origin-right absolute min-h-50 min-w-50 bg-text/50 rounded-md ${className} `}>
			{/* ARROW */}
			<div
				style={{ right: arrowRight }}
				className="absolute border-10 border-transparent border-b-text/50 -mt-[20px]"
			></div>
			{/* CLICK DETECTOR */}
			<div
				className="fixed -z-1 left-0 top-0  w-full h-full"
				onClick={() => (document.getElementById(id).hidden = true)}
			></div>
			{children}
		</div>
	);
}
