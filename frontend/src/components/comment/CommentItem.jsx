import React from "react";

import Avatar from "../misc/Avatar";
import VoteButton from "../vote/VoteButton";
import ButtonContainer from "../buttons/ButtonContainer";
import calculateElapsedTime from "../../utils/calculateEllapsedTime";

export default function CommentItem({ data }) {
	const timePassed = calculateElapsedTime(new Date() - new Date(data.created));

	return (
		<div className={"flex py-3 gap-5 hover:bg-secondary/10 animate-fade-in "}>
			<Avatar text={data.user.username} size={40} />

			<div className="flex flex-col gap-1 ">
				<div className="flex gap-2">
					<h3 className="font-semibold">{data.user.username}</h3>
					<p className="mt-auto font-italic text-sm text-[gray]/80"> {timePassed}</p>
				</div>
				<p>{data.content}</p>

				<ButtonContainer className={"mt-4"}>
					<VoteButton commentId={data.id} votes={data.votes} />
					<button>Reply</button>
				</ButtonContainer>
			</div>
		</div>
	);
}
