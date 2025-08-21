import { useState } from "react";
import Button from "../Button";
import SvgComponent from "../../misc/SvgComponent";
import Avatar from "../../misc/Avatar";

export default function DropDownButton({ children, text, avatar = false }) {
	const [toggled, setToggled] = useState(false);

	const toggleDropDownMenu = (e) => {
		e.preventDefault();
		setToggled(!toggled);
	};

	return (
		<div className={"w-fit h-full z-18"}>
			<Button
				className={`h-full flex gap-2 hover:bg-secondary/30 `}
				text={!avatar && text}
				onClick={toggleDropDownMenu}
			>
				{/* <SvgComponent name={"singleArrow"} size={20} className={`${toggled ? "rotate-270 " : "rotate-90 "}`} /> */}
				<Avatar text={text} size={35} />
			</Button>
			<div
				className={"absolute z-20 w-50 h-fit rounded-sm border-1 border-white/30 bg-n-background"}
				hidden={!toggled}
				onClick={toggleDropDownMenu}
			>
				{children}
			</div>
			{/* detect click out of popup */}
			<div
				className="fixed z-19 left-0 top-0 min-h-full min-w-full "
				onClick={toggleDropDownMenu}
				hidden={!toggled}
			></div>
		</div>
	);
}

export function DropDownItem({ text, className = "", onClick }) {
	const newClassname = "hover:bg-secondary/30 px-5 min-h-10 w-full left-0 justify-start " + className;
	return <Button text={text} className={newClassname} onClick={onClick} />;
}
