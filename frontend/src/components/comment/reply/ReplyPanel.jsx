import { useRef } from "react";
import ColorButton from "../../buttons/ColorButton";
import Avatar from "../../misc/Avatar";
import { userSignal } from "../../../global/userData";
import commentService from "../../../services/comment.service";
import { changePopupData, popupResults } from "../../../global/popupHandler";

const focusClass = "focus-within:[&>textarea]:outline-primary focus-within:[&>textarea]:outline-1 ";
const buttonContainerClass =
    "h-15 peer-[:placeholder-shown]:h-0 peer-[:placeholder-shown]:scale-y-0 peer-[:placeholder-shown]:opacity-0 transition-[scale,opacity,height] ease-out duration-150";
let activeReply = { commentId: null, close: null };

export default function ReplyPanel({ setReplyActive, commentId, isReply, targetUser }) {
    const container = useRef();
    const textRef = useRef();

    const avatarURL = userSignal.value?.profile.avatarUrl;
    if (!avatarURL) return <></>;
    // console.log({ targetUser });
    const closePanel = () => {
        document.activeElement.blur();
        setReplyActive(false);
    };

    // workaround of field-sizing is not supported by Firefox and Safari
    const fieldSizingContent = (ref, newHeight) => {
        if (isNaN(newHeight)) newHeight = ref.current.scrollHeight;
        ref.current.style.height = newHeight + "px";
    };

    const closePreviousReply = () => {
        if (activeReply.close && activeReply.commentId !== commentId) {
            activeReply.close();
        }
        activeReply.close = closePanel;
        activeReply.commentId = commentId;
    };

    const handleComment = async () => {
        const data = {
            userId: userSignal.value.id,
            commentId,
            content: textRef.current.value,
        };
        // console.log("data", data);
        let response;
        try {
            // if (isReply) {
            // } else {
            //     response = await commentService.create(data);
            // }
            response = await commentService.create(data);
            closePanel();
            // console.log("response ", response);
        } catch (error) {
            changePopupData("Error during commenting!", popupResults.error);
            // console.log("error ", error);
        }
    };

    closePreviousReply();
    return (
        <div ref={container} id={"inputContainer"} className="flex gap-5 w-full h-fit my-2 mx-2">
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
                    autoFocus
                ></textarea>
                <div className={"flex gap-5 items-center " + buttonContainerClass}>
                    <ColorButton text={"Comment"} onClick={handleComment}></ColorButton>
                    <ColorButton
                        className="bg-secondary/20 border-2 border-secondary text-secondary disabled:border-white "
                        text={"Cancel"}
                        onClick={closePanel}
                    ></ColorButton>
                </div>
            </div>
        </div>
    );
}
