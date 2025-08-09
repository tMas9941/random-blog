import React, { useState } from "react";
import SvgComponent from "../misc/SvgComponent";
import Button from "../buttons/Button";
import { userSignal } from "../../global/userData";
import { castPostVote } from "../../global/voteHandler";

export default function VoteButton({ postId, upVotes = 100, downVotes = 100, result }) {
	const [voteResult, setVoteResult] = useState(result);

	const changeVoteResult = (newResult) => {
		if (newResult === voteResult) newResult = null;
		castPostVote({ positive: newResult, prevPositive: voteResult, userId: userSignal.value.id, postId });
		setVoteResult(newResult);
	};

	return (
		<div
			className={`flex p-0 mt-5 border w-fit border-[gray]/30 bg-primary/10  items-center rounded overflow-hidden ${
				(voteResult === true && "bg-success/30") || (voteResult === false && "bg-warning/30") || ""
			} `}
		>
			<ButtonComp text={upVotes} positive={true} changeVoteResult={changeVoteResult} />
			<ButtonComp text={downVotes} positive={false} changeVoteResult={changeVoteResult} />
		</div>
	);
}

function ButtonComp({ text, positive, changeVoteResult }) {
	return (
		<Button
			className={"hover:bg-primary hover:text-n-text hover:fill-n-text"}
			onClick={() => changeVoteResult(positive)}
		>
			{positive && <span className="me-2">{`${text}`}</span>}
			<SvgComponent name={"singleArrow"} size={25} className={positive ? "rotate-90 " : "rotate-270 "} />
			{!positive && <span className="ms-2">{`${text}`}</span>}
		</Button>
	);
}
