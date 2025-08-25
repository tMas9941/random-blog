import React, { useRef } from "react";
import useSignal from "../../hooks/useSignal";
import { darkModeSignal } from "../../global/userData";

function AddExtraProps(Component, extraProps) {
	return <Component.type {...Component.props} {...extraProps} />;
}

export default function PopupWindow({ popupComponent, userMenu, text }) {
	const selfRef = useRef();
	const darkMode = useSignal(darkModeSignal, "popupWindow" + text);
	// calculate popup arrow position
	const left = userMenu.value.pos - selfRef.current?.getBoundingClientRect().left || 0;

	return (
		<div
			ref={selfRef}
			className={`absolute z-10 top-0 right-0 ${
				userMenu.value.active === text ? "opacity-100 " : "opacity-0 pointer-events-none "
			}  transition-[opacity] duration-100  mt-11`}
		>
			{<div style={{ left: left }} className="absolute  border-10 border-transparent border-b-background "></div>}

			<div
				className={`p-5 w-fit h-fit mt-[20px] rounded-lg border-1 border-white/30 ${
					darkMode ? "bg-n-background text-n-text" : "bg-background text-text"
				}`}
			>
				{/* bind the  close popup  function to the passed component */}
				{AddExtraProps(popupComponent, { closePopup: userMenu.reset })}

				{/* detect click out of popup */}
				<div
					className="fixed -z-1 left-0 top-0 h-full w-full bg-black/30 backdrop-blur-[1px]"
					onClick={() => userMenu.reset()}
				></div>
			</div>
		</div>
	);
}
