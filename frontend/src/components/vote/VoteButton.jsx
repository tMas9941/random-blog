import React, { useEffect, useState } from "react";
import SvgComponent from "../misc/SvgComponent";
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
		<div className={"flex w-fit  items-center rounded [&>*]:rounded "}>
			<ButtonComp
				text={positiveVotes}
				voteValue={1}
				changeVoteResult={changeVoteResult}
				disabled={!userId}
				activeClass={"fill-primary text-primary stroke-primary"}
				voted={voted}
			/>
			{/* success : 008c17 */}
			<span
				style={{ color: `color-mix(in srgb, #ff0000 ${100 - voteRatio}%, #008c17  ${voteRatio}%)` }}
				className="min-w-17 px-1 text-center text-2xl font-bold [&>span]:font-semibold brightness-150"
			>
				{totalVotes > 0 ? Math.floor(voteRatio) : ""}
				{totalVotes > 0 && <span className="text-base"> %</span>}
			</span>
			<ButtonComp
				text={negativeVotes}
				voteValue={-1}
				changeVoteResult={changeVoteResult}
				disabled={!userId}
				activeClass={"fill-secondary text-secondary stroke-secondary"}
				voted={voted}
			/>
		</div>
	);
}

function ButtonComp({ text, voteValue, changeVoteResult, disabled, voted, activeClass }) {
	return (
		<button
			disabled={disabled}
			title={disabled ? "Must login to vote!" : ""}
			className={`flex px-1 text-lg hover:bg-inherit ${
				voted === voteValue ? activeClass + " stroke-1 " : " stroke-1 fill-none "
			} [&>span]:me-1 [&>span]:min-w-3 [&>span]:font-bold ${disabled ? "!fill-[gray]/40 " : "cursor-pointer"}`}
			onClick={() => changeVoteResult(voteValue)}
		>
			{voteValue > 0 && <span>{`${text}`}</span>}
			<SvgComponent name={"nextArrow"} size={30} className={voteValue < 0 && "rotate-180 "} />
			{voteValue < 0 && <span>{`${text}`}</span>}
		</button>
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
