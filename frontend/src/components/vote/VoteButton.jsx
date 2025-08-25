import React, { useEffect, useState } from "react";
import SvgComponent from "../misc/SvgComponent";
import { userSignal } from "../../global/userData";
import { castCommentVote, castPostVote } from "../../global/voteHandler";

export default function VoteButton({ postId, commentId, votes }) {
	const userId = userSignal?.value?.id;

	const { voted, setVoted, positiveVotes, negativeVotes, voteRatio, totalVotes } = useVoteResult(votes);

	const changeVoteResult = (newValue) => {
		if (!userId) return;

		if (postId) {
			castPostVote({ value: newValue, prevValue: voted, userId, postId });
		} else if (commentId) {
			castCommentVote({ value: newValue, prevValue: voted, userId, commentId });
		}

		if (newValue === voted) return setVoted(null);
		setVoted(newValue);
	};

	return (
		<div className={"flex w-fit  items-center rounded [&>*]:rounded "}>
			<ButtonComp
				text={positiveVotes}
				voteValue={true}
				changeVoteResult={changeVoteResult}
				disabled={!userId}
				activeClass={"fill-success text-success stroke-success "}
				voted={voted}
			/>
			<span
				style={{ color: `color-mix(in srgb, #ff0000 ${100 - voteRatio}%, #008c17  ${voteRatio}%)` }}
				className="min-w-17 px-1 text-center text-lg font-bold [&>span]:font-semibold brightness-130"
			>
				{totalVotes > 0 ? Math.floor(voteRatio) : ""}
				{totalVotes > 0 && <span className="text-base"> %</span>}
			</span>
			<ButtonComp
				text={negativeVotes}
				voteValue={false}
				changeVoteResult={changeVoteResult}
				disabled={!userId}
				activeClass={"fill-warning text-warning stroke-warning "}
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
			className={`flex h-[80%] px-1 text-lg items-center brightness-130 stroke-accent ${
				!disabled && voted === voteValue ? activeClass + " stroke-1  " : " stroke-2 fill-none "
			} [&>span]:me-1 [&>span]:min-w-3 [&>span]:font-bold ${disabled ? " " : "cursor-pointer hover:bg-inherit"}`}
			onClick={() => changeVoteResult(voteValue)}
		>
			{voteValue && <span>{`${text}`}</span>}
			<SvgComponent name={"nextArrow"} size={25} className={voteValue ? "" : "rotate-180"} />
			{!voteValue && <span>{`${text}`}</span>}
		</button>
	);
}

const useVoteResult = (votes) => {
	const [voted, setVoted] = useState(votes.value);
	useEffect(() => {
		setVoted(votes.value);
	}, [votes]);

	let totalVotes = votes.total;
	let positiveVotes = votes.positive;

	totalVotes = votes.total + Number(voted !== null) - Number(votes.value !== null);
	positiveVotes = votes.positive + Number(voted === true) - Number(votes.value === true);

	const negativeVotes = totalVotes - positiveVotes;
	const voteRatio = (positiveVotes / totalVotes) * 100 || 0;

	return {
		voted,
		setVoted,
		positiveVotes,
		negativeVotes,
		voteRatio,
		totalVotes,
	};
};
