import React from "react";

import Avatar from "../misc/Avatar";
import VoteButton from "../vote/VoteButton";
import ButtonContainer from "../buttons/ButtonContainer";

export default function CommentItem({ data }) {
	if (!data) return <></>;

	const timePassed = calculateElapsedTime(new Date() - new Date(data.created));

	return (
		<div className="flex py-3 gap-5 hover:bg-secondary/10">
			<Avatar text={data.user.username} size={40} />

			<div className="flex flex-col gap-1 ">
				<div className="flex gap-2">
					<h3 className="font-semibold">{data.user.username}</h3>
					<p className="mt-auto font-italic text-sm text-[gray]/80"> {timePassed}</p>
				</div>
				<p>{data.content}</p>

				<ButtonContainer className={"mt-4"}>
					<VoteButton commentId={data.id} />
					<button>Reply</button>
				</ButtonContainer>
			</div>
		</div>
	);
}

function calculateElapsedTime(time) {
	const newTime = (divider) => Math.floor(time / divider);

	let times = {
		year: newTime(1000 * 60 * 60 * 24 * 365),
		month: newTime(1000 * 60 * 60 * 24 * 30),
		day: newTime(1000 * 60 * 60 * 24),
		hour: newTime(1000 * 60 * 60),
		min: newTime(1000 * 60),
		sec: newTime(1000),
	};
	let result = Object.entries(times).find((element) => element[1] > 0);
	if (result[0] === "sec") {
		result = ["now", ""];
	} else if (result[1] > 1) {
		result[0] += "s";
	}
	return `${result[1]} ${result[0]}`;
}
