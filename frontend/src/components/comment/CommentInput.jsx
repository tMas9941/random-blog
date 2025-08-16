import { useRef } from "react";

// Hooks
import { userSignal } from "../../global/userData";
import useSignal from "../../hooks/useSignal";

// Components
import ColorButton from "../buttons/ColorButton";
import Avatar from "../misc/Avatar";
import commentService from "../../services/comment.service";

export default function CommentInput({ postId }) {
	const textRef = useRef();
	const user = useSignal(userSignal, "CommentInput");

	if (!user) return <p className="text-lg p-1 rounded bg-secondary/20 text-center my-auto">Login to add comments...</p>;

	const focusClass =
		"focus-within:[&>textarea]:h-24 focus-within:[&>textarea]:outline-primary focus-within:[&>textarea]:outline-1";

	const clearText = () => {
		textRef.current.value = "";
	};

	const postComment = async () => {
		await commentService.create({ userId: user.id, postId, content: textRef.current.value });
		clearText();
	};

	return (
		<div className="flex gap-5 mb-10">
			<Avatar size={40} />
			<div className={"flex flex-col gap-2 w-full me-30 " + focusClass}>
				<textarea
					ref={textRef}
					id="commentInput"
					name="comment"
					rows="2"
					maxLength="350"
					className="peer w-full h-12 bg-secondary/20 p-3 rounded resize-none not-[:placeholder-shown]:h-24 "
					placeholder="Add a comment..."
				></textarea>
				<div className="gap-5 items-center hidden peer-not-[:placeholder-shown]:flex ">
					<ColorButton
						className="mt-5 bg-secondary/20 border-2 border-secondary text-secondary disabled:border-white"
						text={"Cancel"}
						onClick={clearText}
					></ColorButton>
					<ColorButton className="mt-5" text={"Comment"} onClick={postComment}></ColorButton>
				</div>
			</div>
		</div>
	);
}
