import React from "react";
import TagBlock from "./TagBlock";

import convertTimeStringToDate from "../../utils/convertTimeStringToDate";
import VoteButton from "../vote/VoteButton";
import Avatar from "../misc/Avatar";

export default function ListItem({ data }) {
	if (!data) return <></>;
	const convertedDate = convertTimeStringToDate(data.created);

	const selfVote = data.votes.find((vote) => data.id === vote.postId)?.vote;

	return (
		<div className="w-full py-5 flex justify-between gap-10">
			<div>
				<h2 className="text-2xl font-semibold mb-5">{data.title}</h2>
				<p>{data.content}</p>
				<div className="mt-5 flex gap-2">
					{data.tags.map((tag) => (
						<TagBlock key={tag.tagName} name={tag.tagName} />
					))}
				</div>
				<div>
					<VoteButton postId={data.id} vote={selfVote} voteResult={data.voteResult} />
				</div>
			</div>
			<div className="min-w-max [&_div]:m-2">
				<Avatar text={data.author.username} size={60} />
				<h3 className=" font-semibold">{data.author.username}</h3>
				<p> {convertedDate.date}</p>
				<p> {convertedDate.time}</p>
			</div>
		</div>
	);
}
