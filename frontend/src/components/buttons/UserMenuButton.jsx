import React, { useRef } from "react";

// Components
import Button from "./Button";
import SvgComponent from "../misc/SvgComponent";

export default function UserMenuButton({ text, userMenu }) {
	const svgRef = useRef();
	const className =
		" flex gap-2 hover:bg-secondary/30 min-h-12 items-center border border-transparent text-white hover:bg-primary hover:text-white text-sm";

	const handleClick = () => {
		userMenu.set({ active: text, pos: svgRef.current.getBoundingClientRect().left });
	};
	return (
		<>
			<Button text={text.toUpperCase()} className={className} onClick={handleClick}>
				<SvgComponent
					ref={svgRef}
					name={"singleArrow"}
					size={20}
					className={`${userMenu.value.active === text ? "rotate-270" : "rotate-90"} fill-n-text`}
				/>
			</Button>
		</>
	);
}
