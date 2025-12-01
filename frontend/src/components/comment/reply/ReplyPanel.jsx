import { useEffect, useRef } from "react";
import ColorButton from "../../buttons/ColorButton";
import Avatar from "../../misc/Avatar";
import { userSignal } from "../../../global/userData";
import commentService from "../../../services/comment.service";
import { changePopupData, popupResults } from "../../../global/popupHandler";
import useSignalState from "../../../hooks/useSignalState.js";
import { addToReplyList, commentIdOfActiveReply, setActiveReply } from "./replyHandler";

const focusClass = "focus-within:[&>textarea]:outline-primary focus-within:[&>textarea]:outline-1 ";
const buttonContainerClass =
    "h-15 peer-[:placeholder-shown]:h-0 peer-[:placeholder-shown]:scale-y-0 peer-[:placeholder-shown]:opacity-0 transition-[scale,opacity,height] ease-out duration-150";

export default function ReplyPanel({ commentId }) {
    const container = useRef();
    const textRef = useRef();
    const activeReplyId = useSignalState(commentIdOfActiveReply, "ReplyPanel_" + commentId);

    const closePanel = () => {
        document.activeElement.blur();
        setActiveReply(null);
    };

    useEffect(() => {
        if (textRef.current) textRef.current.focus(); // grab focus - autoFocus is not working because why not
    });

    if (activeReplyId !== commentId) return <div className={`w-full h-20 animate-shrink`}></div>;
    const avatarURL = userSignal.value?.profile.avatarUrl;

    // workaround of field-sizing is not supported by Firefox and Safari
    const fieldSizingContent = (ref, newHeight) => {
        if (isNaN(newHeight)) newHeight = ref.current.scrollHeight;
        ref.current.style.height = newHeight + "px";
    };

    const handleComment = async () => {
        const data = {
            userId: userSignal.value.id,
            commentId,
            content: textRef.current.value,
        };

        try {
            let response = await commentService.create(data);
            response.comments = 0;
            response.user = { username: userSignal.value.username, profile: userSignal.value.profile };
            response.votes = { value: null, total: 0, positive: 0 };
            response._count = 0;
            addToReplyList({ commentId, newReply: response });
            closePanel();
            changePopupData("Successfull replying!", popupResults.success);
        } catch {
            changePopupData("Error during commenting!", popupResults.error);
        }
    };

    return (
        activeReplyId && (
            <div ref={container} className={`flex gap-5 w-full my-2 mx-2 animate-grow`}>
                <Avatar text={"text"} size={70} url={avatarURL} self={true} />
                <div className={"flex flex-col w-full " + focusClass}>
                    <textarea
                        ref={textRef}
                        id="commentInput"
                        name="comment"
                        rows="2"
                        maxLength="1250"
                        className="peer w-full min-h-12 max-w-[450px] bg-secondary/20 p-3 resize-none rounded transition-[height] ease-out duration-150 overflow-y-hidden"
                        placeholder="Add a comment..."
                        onInput={() => fieldSizingContent(textRef)}
                    ></textarea>
                    <div className={"flex gap-5 items-center " + buttonContainerClass}>
                        <ColorButton text={"Comment"} onClick={handleComment}></ColorButton>
                        <ColorButton theme="secondary" className=" " text={"Cancel"} onClick={closePanel}></ColorButton>
                    </div>
                </div>
            </div>
        )
    );
}
