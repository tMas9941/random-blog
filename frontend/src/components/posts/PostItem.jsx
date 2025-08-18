import React from "react";
import TagBlock from "./TagBlock";

import convertTimeStringToDate from "../../utils/convertTimeStringToDate";
import VoteButton from "../vote/VoteButton";
import Avatar from "../misc/Avatar";
import { Link } from "react-router-dom";
import SvgComponent from "../misc/SvgComponent";
import ButtonContainer from "../buttons/ButtonContainer";

export default function PostItem({ data, showComment = true }) {
	if (!data) return <></>;
	const convertedDate = convertTimeStringToDate(data.created);

	const selfVote = data.votes.find((vote) => data.id === vote.postId)?.vote;

	return (
		<div className="w-full py-5 flex justify-between gap-10 animate-fade-in">
			<div className="flex flex-col gap-4">
				<Link to={"/posts/" + data.id} className="text-2xl font-semibold ">
					{data.title}
				</Link>
				<p>{data.content}</p>
				<div className="flex gap-2">
					{data.tags.map((tag) => (
						<TagBlock key={tag.tagName} name={tag.tagName} />
					))}
				</div>
				<ButtonContainer>
					<VoteButton postId={data.id} vote={selfVote} voteResult={data.voteResult} />
					{showComment && <CommentButton postId={data.id} />}
				</ButtonContainer>
			</div>
			<div className="min-w-max [&_div]:m-2">
				<Avatar text={data.author.username} size={60} />
				<h3 className="font-semibold">{data.author.username}</h3>
				<p> {convertedDate.date}</p>
				<p> {convertedDate.time}</p>
			</div>
		</div>
	);
}

const CommentButton = ({ postId }) => (
	<Link to={"/posts/" + postId + "#comment"} className="flex items-center  gap-2 fill-accent text-xl">
		<SvgComponent name={"comment"} size={25} />
		Comment
	</Link>
);
