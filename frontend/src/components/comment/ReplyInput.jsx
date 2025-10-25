import { useRef } from "react";
import ColorButton from "../buttons/ColorButton";
import Avatar from "../misc/Avatar";
import { userSignal } from "../../global/userData";

const focusClass = "focus-within:[&>textarea]:outline-primary focus-within:[&>textarea]:outline-1 ";
let activeReply = { comp: "", close: "" };

export default function ReplyInput({ setReplyActive }) {
    const container = useRef();
    const textRef = useRef();

    const clearText = async () => {
        textRef.current.value = "";
        document.activeElement.blur();

        setReplyActive(false);
    };

    // field-sizing not supported by Firefox and Safari
    const fieldSizingContent = (ref, newHeight) => {
        if (isNaN(newHeight)) newHeight = ref.current.scrollHeight;
        ref.current.style.height = newHeight + "px";
    };

    const avatarURL = userSignal.value?.profile.avatarUrl;
    if (!avatarURL) return <></>;
    return (
        <div ref={container} id={"inputContainer"} className="flex gap-5 w-full mt-4">
            <Avatar text={"text"} size={45} url={avatarURL} />
            <div className={"flex flex-col  w-full " + focusClass}>
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
                <div className="flex gap-5 items-center  peer-not-[:placeholder-shown]:scale-y-100 peer-not-[:placeholder-shown]:opacity-100 transition-[scale,opacity] ease-out duration-150">
                    <ColorButton className="mt-5" text={"Comment"} onClick={() => ""}></ColorButton>
                    <ColorButton
                        className="mt-5 bg-secondary/20 border-2 border-secondary text-secondary disabled:border-white"
                        text={"Cancel"}
                        onClick={clearText}
                    ></ColorButton>
                </div>
            </div>
        </div>
    );
}
