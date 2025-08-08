import React from "react";
import SvgComponent from "../misc/SvgComponent";
import Button from "../buttons/Button";

const ARROW_SIZE = 25;
export default function VoteButton({ upVotes = 100, downVotes = 100, result }) {
	return (
		<div
			className={`flex p-0 mt-5 border w-fit border-background/30 items-center ${
				(result === true && "bg-success/30") || (result === false && "bg-warning/30") || ""
			} `}
		>
			<ButtonComp text={upVotes} vote={true} />
			<ButtonComp text={downVotes} vote={false} />
		</div>
	);
}

function ButtonComp({ text, vote }) {
	return (
		<Button className={"hover:bg-secondary/30"}>
			{vote && <span className="me-2">{`${text}`}</span>}
			<SvgComponent name={"singleArrow"} size={ARROW_SIZE} className={vote ? "rotate-90" : "rotate-270"} />
			{!vote && <span className="ms-2">{`${text}`}</span>}
		</Button>
	);
}
