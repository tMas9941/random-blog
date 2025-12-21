import { useEffect, useState } from "react";
import SvgComponent from "../misc/SvgComponent";
import { userSignal } from "../../global/userData";
import { castCommentVote, castPostVote } from "../../global/voteHandler";

export default function VoteButton({ postId, commentId, votes, isOwn }) {
    const userId = userSignal?.value?.id;
    const buttonDisabled = !userId || isOwn;
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
    const resultColor = `color-mix(in srgb, #ff0000 ${100 - voteRatio}%, #4da2c7  ${voteRatio}%)`;
    const transparentResultColor =
        totalVotes > 0 ? `color-mix(in srgb, ${resultColor}, transparent 60%)` : "transparent";
    const pieStyle = `conic-gradient( ${resultColor} ${voteRatio}%, ${transparentResultColor} 0) `;
    return (
        <div
            className={"flex min-h-full w-fit items-center rounded [&>*]:rounded "}
            title={buttonDisabled ? "Must login to vote and can't vote on your own stuff!" : ""}
        >
            <ButtonComp
                text={positiveVotes}
                voteValue={true}
                changeVoteResult={changeVoteResult}
                disabled={buttonDisabled}
                activeClass={"fill-primary text-primary stroke-primary"}
                voted={voted}
            />

            <span className="relative group  min-w-10 text-center text-lg font-bold [&>span]:font-semibold brightness-120 ">
                <div
                    style={{ backgroundImage: pieStyle }}
                    className={` mx-auto h-6 w-6 rounded-full `}
                    title={Math.round(voteRatio) + "%"}
                ></div>
            </span>

            <ButtonComp
                text={negativeVotes}
                voteValue={false}
                changeVoteResult={changeVoteResult}
                disabled={buttonDisabled}
                activeClass={"fill-error text-error stroke-error "}
                voted={voted}
            />
        </div>
    );
}

function ButtonComp({ text, voteValue, changeVoteResult, disabled, voted, activeClass }) {
    return (
        <button
            title={"Press to vote..."}
            disabled={disabled}
            className={`peer flex h-full text-lg items-center brightness-120 stroke-accent  ${
                !disabled && voted === voteValue ? activeClass + " stroke-1  " : " stroke-2 fill-none "
            } [&>span]:px-1 [&>span]:min-w-3 [&>span]:font-bold ${
                disabled ? " pointer-events-none " : "cursor-pointer hover:bg-inherit "
            }`}
            onClick={() => changeVoteResult(voteValue)}
        >
            {voteValue && <span>{`${text}`}</span>}
            <SvgComponent name={"nextArrow"} size={22} className={voteValue ? "" : "rotate-180"} />
            {!voteValue && <span>{`${text}`}</span>}
        </button>
    );
}

const useVoteResult = (votes) => {
    const [voted, setVoted] = useState(votes.value);
    useEffect(() => {
        setVoted(votes.value);
    }, [votes]);

    const totalVotes = votes.total + Number(voted !== null) - Number(votes.value !== null);
    const positiveVotes = votes.positive + Number(voted === true) - Number(votes.value === true);

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
