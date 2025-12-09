import { useEffect, useRef, useState } from "react";
// Components
import ColorButton from "../../buttons/ColorButton";
import Avatar from "../../misc/Avatar";
import commentService from "../../../services/comment.service";

// Signals
import { userSignal } from "../../../global/userData";
import { changePopupData, popupResults } from "../../../global/popupHandler";
import { addToReplyList, commentIdOfActiveReply, setActiveReply } from "../../../global/commentSignals.js";
import useSignal from "../../../hooks/useSignal.js";

const focusClass = "focus-within:[&>textarea]:outline-primary focus-within:[&>textarea]:outline-1 ";
const buttonContainerClass =
    "h-15 peer-[:placeholder-shown]:h-0 peer-[:placeholder-shown]:scale-y-0 peer-[:placeholder-shown]:opacity-0 transition-[scale,opacity,height] ease-out duration-150";

export default function ReplyPanel({ commentId }) {
    const container = useRef();
    const textRef = useRef();
    const prevToggled = useRef(false);
    const avatarURL = userSignal.value?.profile.avatarUrl;
    const [inputToggled, setInputToggled] = useState(false);
    useSignal(commentIdOfActiveReply, "ReplyPanel_" + commentId, toggleContainer);

    function toggleContainer() {
        const newInputToggled = commentIdOfActiveReply.value === commentId;
        const toggled = prevToggled.current;
        if (newInputToggled !== toggled) {
            prevToggled.current = newInputToggled;
            setInputToggled(newInputToggled);
        }
    }

    function closePanel() {
        document.activeElement.blur();
        setActiveReply(null);
    }

    useEffect(() => {
        textRef.current.value = "";
        textRef.current.style.height = "auto";
        if (inputToggled) textRef.current.focus(); // grab focus
    }, [inputToggled]);

    // workaround of field-sizing is not supported by Firefox and Safari
    const fieldSizingContent = (ref) => {
        ref.current.style.height = "auto";
        const scrolHeight = ref.current.scrollHeight + "px";
        if (scrolHeight == ref.current.style.height) {
            return;
        }

        ref.current.style.height = scrolHeight;
    };

    const handleComment = async () => {
        const data = {
            userId: userSignal.value.id,
            commentId,
            content: textRef.current.value,
        };

        try {
            let response = await commentService.create(data);
            addToReplyList({ commentId, newReply: response });
            closePanel();
            changePopupData("Successfull commenting!", popupResults.success);
        } catch {
            changePopupData("Error during commenting!", popupResults.error);
        }
    };

    return (
        <div
            ref={container}
            className={`flex origin-top overflow-hidden gap-5 w-full  mx-2 ${
                inputToggled ? "animate-grow " : prevToggled.current ? "animate-shrink " : "hidden"
            }
            } `}
        >
            <Avatar text={"text"} size={70} url={avatarURL} isOwn={true} />
            <div className={"flex flex-col w-full py-1 " + focusClass}>
                <textarea
                    ref={textRef}
                    id="commentInput"
                    name="comment"
                    maxLength="1250"
                    className="peer w-full max-w-[450px]  bg-secondary/20 p-3 resize-none rounded overflow-hidden"
                    placeholder="Add a comment..."
                    onInput={() => fieldSizingContent(textRef)}
                ></textarea>

                <div className={"flex gap-5 items-center " + buttonContainerClass}>
                    <ColorButton text={"Comment"} onClick={handleComment}></ColorButton>
                    <ColorButton theme="secondary" className=" " text={"Cancel"} onClick={closePanel}></ColorButton>
                </div>
            </div>
        </div>
    );
}
