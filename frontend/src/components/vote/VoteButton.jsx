import React, { useEffect, useState } from "react";
import SvgComponent from "../misc/SvgComponent";
import { userSignal } from "../../global/userData";
import { castCommentVote, castPostVote } from "../../global/voteHandler";

export default function VoteButton({ postId, commentId, vote = 0, voteResult }) {
	const userId = userSignal?.value?.id;
	const { voted, setVoted, positiveVotes, negativeVotes, voteRatio, totalVotes } = useVoteResult(vote, voteResult);

	const changeVoteResult = (newVote) => {
		if (!userId) return;

		if (postId) {
			castPostVote({ vote: newVote, prevVote: voted, userId, postId });
		} else if (commentId) {
			castCommentVote({ vote: newVote, prevVote: voted, userId, commentId });
		}

		if (newVote === voted) return setVoted(0);
		setVoted(newVote);
	};

	return (
		<div className={"flex w-fit  items-center rounded [&>*]:rounded "}>
			<ButtonComp
				text={positiveVotes}
				voteValue={1}
				changeVoteResult={changeVoteResult}
				disabled={!userId}
				activeClass={"fill-success text-success stroke-success "}
				voted={voted}
			/>
			{/* --color-text: #050d10; --color-background: #f0f6fa; --color-primary: #4da2c7; --color-secondary: #8e9edc;
			--color-accent: #777fd4; */}
			<span
				style={{ color: `color-mix(in srgb, #ff0000 ${100 - voteRatio}%, #008c17  ${voteRatio}%)` }}
				className="min-w-17 px-1 text-center text-lg font-bold [&>span]:font-semibold brightness-130"
			>
				{totalVotes > 0 ? Math.floor(voteRatio) : ""}
				{totalVotes > 0 && <span className="text-base"> %</span>}
			</span>
			<ButtonComp
				text={negativeVotes}
				voteValue={-1}
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
			className={`flex px-1 text-lg items-center brightness-130 stroke-accent ${
				voted === voteValue ? activeClass + " stroke-1  " : " stroke-2 fill-none "
			} [&>span]:me-1 [&>span]:min-w-3 [&>span]:font-bold ${disabled ? " " : "cursor-pointer hover:bg-inherit"}`}
			onClick={() => changeVoteResult(voteValue)}
		>
			{voteValue > 0 && <span>{`${text}`}</span>}
			<SvgComponent name={"nextArrow"} size={25} className={voteValue < 0 && "rotate-180 "} />
			{voteValue < 0 && <span>{`${text}`}</span>}
		</button>
	);
}

const useVoteResult = (vote, voteResult = { total: 99999, vote: 99999 }) => {
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
