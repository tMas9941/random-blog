import React, { useEffect, useState } from "react";
import SvgComponent from "../misc/SvgComponent";
import Button from "../buttons/Button";
import { userSignal } from "../../global/userData";
import { castPostVote } from "../../global/voteHandler";

export default function VoteButton({ postId, vote = 0, voteResult }) {
	const { voted, setVoted, positiveVotes, negativeVotes, voteRatio, totalVotes } = useVoteResult(vote, voteResult);
	const userId = userSignal?.value?.id;

	const changeVoteResult = (newVote) => {
		if (!userId) return;

		castPostVote({ vote: newVote, prevVote: voted, userId, postId });
		if (newVote === voted) {
			return setVoted(0);
		} else {
			setVoted(newVote);
		}
	};

	return (
		<div
			className={
				"flex p-0 mt-5 border w-fit border-[gray]/30 bg-secondary/20  items-center rounded overflow-hidden  bg-[red]"
			}
		>
			<ButtonComp
				text={positiveVotes}
				voteValue={1}
				changeVoteResult={changeVoteResult}
				disabled={!userId}
				className={voted > 0 ? "bg-primary/60" : "bg-primary/25"}
			/>
			<span
				style={{ color: `color-mix(in srgb, #ff0000 ${100 - voteRatio}%, #008c17  ${voteRatio}%)` }}
				className="min-w-17 px-1 text-center text-2xl font-bold [&>span]:font-semibold  brightness-150"
			>
				{totalVotes > 0 ? Math.floor(voteRatio) : ""}
				<span className="text-lg"> %</span>
			</span>
			<ButtonComp
				text={negativeVotes}
				voteValue={-1}
				changeVoteResult={changeVoteResult}
				disabled={!userId}
				className={voted < 0 ? "bg-primary/60" : "bg-primary/25"}
			/>
		</div>
	);
}

function ButtonComp({ text, voteValue, changeVoteResult, disabled, className }) {
	return (
		<Button
			disabled={disabled}
			title={disabled ? "Must login to vote!" : ""}
			className={"hover:bg-primary hover:text-n-text hover:fill-n-text " + className}
			onClick={() => changeVoteResult(voteValue)}
		>
			{voteValue > 0 && <span className="me-2">{`${text}`}</span>}
			<SvgComponent name={"singleArrow"} size={25} className={voteValue > 0 ? "rotate-90 " : "rotate-270 "} />
			{voteValue < 0 && <span className="ms-2">{`${text}`}</span>}
		</Button>
	);
}

const useVoteResult = (vote, voteResult) => {
	const [voted, setVoted] = useState(vote);

	const totalVotes = voteResult.total + Math.abs(voted) - Math.abs(vote);
	const positiveVotes = voteResult.vote - Number(vote > 0) + Number(voted > 0);
	const negativeVotes = totalVotes - positiveVotes;
	const voteRatio = (positiveVotes / totalVotes) * 100 || 0;

	useEffect(() => {
		setVoted(vote);
	}, [vote]);

	return { voted, setVoted, positiveVotes, negativeVotes, voteRatio, totalVotes };
};
