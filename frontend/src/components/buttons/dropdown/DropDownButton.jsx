import { useState } from "react";
import Button from "../Button";
import SvgComponent from "../../misc/SvgComponent";

export default function DropDownButton({ children, text }) {
	const [toggled, setToggled] = useState(false);

	const toggleDropDownMenu = (e) => {
		e.preventDefault();
		setToggled(!toggled);
	};

	return (
		<div className={"w-fit h-full z-10"}>
			<Button className={`h-full flex gap-2 hover:bg-secondary/30 `} text={text} onClick={toggleDropDownMenu}>
				<SvgComponent name={"singleArrow"} size={20} className={`${toggled ? "rotate-270 " : "rotate-90 "}`} />
			</Button>
			<div className={"absolute w-50 h-fit rounded-sm border-1 border-white/30 bg-n-background"} hidden={!toggled}>
				{children}
			</div>
			{/* detect click out of popup */}
			<div
				className="fixed -z-1 bg-[red]/30 left-0 top-0 h-full w-full"
				onClick={toggleDropDownMenu}
				hidden={!toggled}
			></div>
		</div>
	);
}
