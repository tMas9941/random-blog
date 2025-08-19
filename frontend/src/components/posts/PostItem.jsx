import React from "react";
import TagBlock from "./TagBlock";

// Utils
import convertTimeStringToDate from "../../utils/convertTimeStringToDate";
import calculateElapsedTime from "../../utils/calculateEllapsedTime";

// Components
import VoteButton from "../vote/VoteButton";
import Avatar from "../misc/Avatar";
import { Link } from "react-router-dom";
import SvgComponent from "../misc/SvgComponent";
import ButtonContainer from "../buttons/ButtonContainer";
import Button from "../buttons/Button";
import { userSignal } from "../../global/userData";

const buttonClass = "flex items-center gap-2 fill-accent text-xl !px-4";
export default function PostItem({ data, showComment = true }) {
	if (!data) return <></>;
	const convertedDate = convertTimeStringToDate(data.created);
	const timePassed = calculateElapsedTime(new Date() - new Date(data.created));
	const selfVote = data.votes.find((vote) => data.id === vote.postId)?.vote;
	const selfPost = data.authorId === userSignal.value?.id;

	return (
		<div className="w-full py-5  ">
			<div className="flex gap-4 ">
				<div className="flex flex-col w-full gap-5 mb-5 [&>p]:min-h-20">
					<div>
						<Link to={"/posts/" + data.id} className="text-2xl font-semibold ">
							{data.title}
						</Link>
						<p className="inline ms-3 mt-auto font-italic text-sm text-[gray]/80"> {timePassed}</p>
					</div>
					<p>{data.content}</p>

					<div className="flex gap-2 mt-auto ">
						{data.tags.map((tag) => (
							<TagBlock key={tag.tagName} name={tag.tagName} />
						))}
					</div>
				</div>
				<div className="min-w-max [&_div]:m-2">
					<Avatar text={data.author.username} size={60} />
					<h3 className="font-semibold">{data.author.username}</h3>
					<p> {convertedDate.date}</p>
					<p> {convertedDate.time}</p>
				</div>
			</div>
			<ButtonContainer>
				<VoteButton postId={data.id} vote={selfVote} voteResult={data.voteResult} />
				{showComment && <CommentButton postId={data.id} />}
				{selfPost && (
					<>
						<Button title={"Edit post"} text={"Edit"} className={"ms-auto " + buttonClass}>
							<SvgComponent size={20} name={"pen"} className={"fill-accent stroke-accent"} />
						</Button>
						<Button title={"Delete post"} text={"Delete"} className={buttonClass}>
							<SvgComponent size={30} name={"close"} className={"fill-accent"} />
						</Button>
					</>
				)}
			</ButtonContainer>
		</div>
	);
}

const CommentButton = ({ postId }) => (
	<Link to={"/posts/" + postId + "#comment"} className={buttonClass}>
		<SvgComponent name={"comment"} size={25} />
		Comment
	</Link>
);
