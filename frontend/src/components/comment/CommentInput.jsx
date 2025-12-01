import { useRef } from "react";

// Components
import ColorButton from "../buttons/ColorButton";
import commentService from "../../services/comment.service";
import NoUser from "./NoUser";

import { addToCommentList } from "../../constants/exports";
import { changePopupData, popupResults } from "../../global/popupHandler";
import Avatar from "../misc/Avatar";

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
            let response = await commentService.create({ userId: user.id, postId, content: textRef.current.value });
            // response = supplementComment(response);
            addToCommentList(response);

            changePopupData("Commented successfully!", popupResults.success);
            clearText();
        } catch {
            changePopupData("Error during commenting!", popupResults.error);
        }
    };

    const autoFocusCommentInput = () => {
        if (String(window.location).split("#").includes("comment") && textRef.current) textRef.current.focus();
    };

    autoFocusCommentInput();
    return (
        <div ref={container} id={"inputContainer"} className="flex gap-5 my-5 mx-[min(150px,5%)]">
            <Avatar text={user.username} size={70} url={user?.profile.avatarUrl} self={true} userId={user.id} />
            <div className={"flex flex-col  w-full " + focusClass}>
                <textarea
                    ref={textRef}
                    id="commentInput"
                    name="comment"
                    rows="2"
                    maxLength="350"
                    className="peer w-full h-12 bg-secondary/20 p-3 rounded resize-none  transition-[height] ease-out duration-150 "
                    placeholder="Add a comment..."
                ></textarea>
                <div className="flex gap-5 mt-3 items-center origin-top opacity-0 scale-y-0 peer-not-[:placeholder-shown]:scale-y-100 peer-not-[:placeholder-shown]:opacity-100 transition-[scale,opacity] ease-out duration-150">
                    <ColorButton text={"Comment"} onClick={postComment}></ColorButton>
                    <ColorButton
                        theme="secondary"
                        className="bg-secondary/20 border-2 border-secondary text-secondary disabled:border-white"
                        text={"Cancel"}
                        onClick={clearText}
                    ></ColorButton>
                </div>
            </div>
        </div>
    );
}
