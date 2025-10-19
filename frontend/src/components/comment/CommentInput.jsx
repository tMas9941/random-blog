import { useRef } from "react";

// Components
import ColorButton from "../buttons/ColorButton";
import commentService from "../../services/comment.service";

import SvgComponent from "../misc/SvgComponent";
import { renderCommentList } from "../../constants/exports";
import { changePopupData, popupResults } from "../../global/popupHandler";

const focusClass =
    "focus-within:[&>textarea]:h-24 focus-within:[&>textarea]:outline-primary focus-within:[&>textarea]:outline-1 ";

export default function CommentInput({ postId, user }) {
    const textRef = useRef();
    const container = useRef();

    if (!user) return <NoUser />;

    const clearText = () => {
        textRef.current.value = "";
        document.activeElement.blur();
    };

    const postComment = async () => {
        try {
            await commentService.create({ userId: user.id, postId, content: textRef.current.value });
            renderCommentList.changeValue(renderCommentList.value + 1);
            clearText();
        } catch {
            changePopupData("Error during commenting!", popupResults.error);
            return;
        }
    };

    return (
        <div ref={container} id={"inputContainer"} className="flex gap-5 my-10 mx-[min(150px,5%)]">
            <SvgComponent name={"comment"} size={50} className={"fill-accent"} />
            <div className={"flex flex-col  w-full " + focusClass}>
                <textarea
                    ref={textRef}
                    id="commentInput"
                    name="comment"
                    rows="2"
                    maxLength="350"
                    className="peer w-full h-12 bg-secondary/20 p-3 rounded resize-none not-[:placeholder-shown]:h-24 transition-[height] ease-out duration-150 "
                    placeholder="Add a comment..."
                ></textarea>
                <div className="flex gap-5 items-center opacity-0 scale-y-0 peer-not-[:placeholder-shown]:scale-y-100 peer-not-[:placeholder-shown]:opacity-100 transition-[scale,opacity] ease-out duration-150">
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

function NoUser() {
    return (
        <div className="flex items-center justify-center min-h-12 mb-10 text-lg p-1 rounded bg-secondary/20 text-center my-auto ">
            Login to add comments...
        </div>
    );
}
