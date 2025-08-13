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
		<div className={"flex p-0 mt-5  w-fit items-center rounded [&>*]:rounded "}>
			<ButtonComp
				text={positiveVotes}
				voteValue={1}
				changeVoteResult={changeVoteResult}
				disabled={!userId}
				activeClass={"fill-primary text-primary"}
				voted={voted}
			/>
			{/* success : 008c17 */}
			<span
				style={{ color: `color-mix(in srgb, #ff0000 ${100 - voteRatio}%, #008c17  ${voteRatio}%)` }}
				className="min-w-10 px-1 text-center text-2xl font-bold [&>span]:font-semibold brightness-150"
			>
				{totalVotes > 0 ? Math.floor(voteRatio) : ""}
				<span className="text-lg"> %</span>
			</span>
			<ButtonComp
				text={negativeVotes}
				voteValue={-1}
				changeVoteResult={changeVoteResult}
				disabled={!userId}
				activeClass={"fill-secondary text-secondary"}
				voted={voted}
			/>
		</div>
	);
}

function ButtonComp({ text, voteValue, changeVoteResult, disabled, voted, activeClass }) {
	return (
		<Button
			disabled={disabled}
			title={disabled ? "Must login to vote!" : ""}
			className={` text-xl  ${
				voted === voteValue ? activeClass : "fill-[gray]/10 stroke-[gray]/60 text-[gray]/60 stroke-1"
			}  [&>span]:me-1 [&>span]:min-w-3 [&>span]:font-bold`}
			onClick={() => changeVoteResult(voteValue)}
		>
			{voteValue > 0 && <span>{`${text}`}</span>}
			<SvgComponent name={"nextArrow"} size={35} className={voteValue < 0 && "rotate-180 "} />
			{voteValue < 0 && <span>{`${text}`}</span>}
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
