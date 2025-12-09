import { memo, useRef, useState } from "react";

// Buttons
import Avatar from "../misc/Avatar";
import VoteButton from "../vote/VoteButton";
import ButtonContainer from "../buttons/ButtonContainer";
import SvgComponent from "../misc/SvgComponent";
import DeleteButton from "../buttons/DeleteButton";

// Components
import ReplyPanel from "./reply/ReplyPanel";
import ReplyList from "./reply/ReplyList";
import LoaderWithBlur from "../posts/LoaderWithBlur";
import calculateElapsedTime from "../../utils/calculateEllapsedTime";
import PanelContainer from "../PanelContainer";

// Signals
import { commentIdOfActiveReply, setActiveReply } from "../../global/commentSignals";
import { userSignal } from "../../global/userData";

const MAX_COMMENT_LEVEL = 2;
const AVATAR_SIZE_COMMENT = 55;
const AVATAR_SIZE_REPLY = 45;

const CommentItem = memo(({ data, userId, level = 0 }) => {
    const containerRef = useRef();
    const [loading, setLoading] = useState(false);
    const isReply = !data.postId;
    const isOwn = data.userId === userSignal.value?.id;

    const dividerClass = `flex py-1.5 px-3 rounded-md ${isReply ? " -ps-6  gap-3" : " gap-4"} `;

    return (
        <PanelContainer ref={containerRef} isOwn={isOwn} id={"comment_" + data.id} className={"animate-fade-in "}>
            {loading && <LoaderWithBlur className={"h-full"} type={"line-loader"} />}
            <div className={dividerClass}>
                <Avatar
                    text={data.user.username}
                    isOwn={isOwn}
                    size={isReply ? AVATAR_SIZE_REPLY : AVATAR_SIZE_COMMENT}
                    url={data.user?.profile.avatarUrl}
                />
                <div className="flex flex-col gap-1 w-full -mt-[5px] ">
                    <CommentContent data={data} isOwn={isOwn} />
                    <ButtonContainer type={"comment"} className={"mt-2"}>
                        <VoteButton commentId={data.id} votes={data.votes} isOwn={isOwn} />
                        {userId && level < MAX_COMMENT_LEVEL && <ReplyButton commentId={data.id} />}
                        {isOwn && (
                            <DeleteButton
                                title={"Delete comment!"}
                                className={"!pe-3 ms-auto"}
                                data={{
                                    id: data.id,
                                    commentId: data.commentId,
                                    containerRef,
                                    type: isReply ? "reply" : "comment",
                                }}
                                setLoading={setLoading}
                            />
                        )}
                    </ButtonContainer>

                    <ReplyPanel commentId={data.id} />
                    <ReplyList commentId={data.id} userId={userId} level={level} replyAmount={data._count.comments} />
                </div>
            </div>
        </PanelContainer>
    );
}, areEqual);

function areEqual(prevProps, nextProps) {
    if (prevProps.data.id !== nextProps.data.id) return false;
    if (prevProps.userId !== nextProps.userId) return false;
    return true;
}

const ReplyButton = ({ commentId }) => {
    const handleOnClick = () => {
        if (commentIdOfActiveReply.value === commentId) {
            setActiveReply(null);
        } else {
            setActiveReply(commentId);
        }
    };

    return (
        <button className="flex gap-3 items-center  cursor-pointer" onClick={handleOnClick}>
            <SvgComponent name={"comment"} size={25} className={"fill-accent"} />
            <span>Reply</span>
        </button>
    );
};

const CommentContent = ({ data, isOwn }) => {
    const timePassed = calculateElapsedTime(new Date() - new Date(data.created));
    return (
        <>
            <div className="flex gap-2">
                <h3 className={`font-semibold ${isOwn && "text-primary"}`}>{data.user.username}</h3>
                <p className="mt-auto font-italic text-sm text-[gray]/80"> {timePassed}</p>
            </div>
            <p className="break-all">{data.content}</p>
        </>
    );
};

export default CommentItem;
