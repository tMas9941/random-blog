import React, { useRef } from "react";

function AddExtraProps(Component, extraProps) {
	return <Component.type {...Component.props} {...extraProps} />;
}

export default function PopupWindow({ popupComponent, userMenu, text }) {
	const selfRef = useRef();
	// calculate popup arrow position
	const left = userMenu.value.pos - selfRef.current?.getBoundingClientRect().left || 0;

	return (
		<div
			ref={selfRef}
			className={`relative z-10  ${
				userMenu.value.active === text ? "opacity-100 " : "opacity-0 pointer-events-none"
			} transition-[opacity] duration-100  mt-11`}
		>
			{<div style={{ left: left }} className="absolute bot-0 border-10 border-transparent border-b-background "></div>}
			<div className="absolute right-4 bg-background p-5 w-fit h-fit mt-[20px] rounded-lg">
				{/* bind the  close popup  function to the passed component */}
				{AddExtraProps(popupComponent, { close: userMenu.reset })}

				{/* detect click out of popup */}
				<div
					className="fixed -z-1 left-0 top-0 h-full w-full bg-black/30 backdrop-blur-[1px]"
					onClick={() => userMenu.reset()}
				></div>
			</div>
		</div>
	);
}
