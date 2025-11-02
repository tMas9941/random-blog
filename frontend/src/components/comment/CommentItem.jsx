import { useRef, useState } from "react";

// Buttons
import Avatar from "../misc/Avatar";
import VoteButton from "../vote/VoteButton";
import ButtonContainer from "../buttons/ButtonContainer";
import SvgComponent from "../misc/SvgComponent";
import DeleteButton from "../buttons/DeleteButton";

// Components
import ReplyPanel from "./reply/ReplyPanel";
import ReplyList from "./reply/ReplyList";
import PostLoadingPlaceholder from "../posts/PostLoadingPlaceholder";

import { userSignal } from "../../global/userData";
import calculateElapsedTime from "../../utils/calculateEllapsedTime";
import PanelContainer from "../PanelContainer";

const MAX_COMMENT_LEVEL = 2;

export default function CommentItem({ data, userId, level = 0, removeSelfFromList }) {
    const containerRef = useRef();
    const [replyActive, setReplyActive] = useState(null);
    const [render, setRender] = useState(0);
    const [loading, setLoading] = useState(false);
    const isReply = !data.postId;
    const isOwn = data.userId === userSignal.value?.id;

    const dividerClass = `flex py-2 px-3 rounded-md animate-fade-in 
    ${isReply ? " -ps-6  gap-3" : " gap-4"} `;

    function triggerRerender(value) {
        setRender((i) => i + value);
    }

    return (
        <PanelContainer className="relative " ref={containerRef} isOwn={isOwn}>
            {loading && <PostLoadingPlaceholder className={"h-full -m-1"} />}
            <div className={dividerClass}>
                <Avatar text={data.user.username} size={isReply ? 45 : 55} url={data.user?.profile.avatarUrl} />
                <div className="flex flex-col gap-1 w-full -mt-[5px] ">
                    <CommentContent data={data} />
                    <ButtonContainer className={"mt-2"}>
                        <VoteButton commentId={data.id} votes={data.votes} isOwn={isOwn} />
                        {userId && level < MAX_COMMENT_LEVEL && (
                            <ReplyButton onClick={() => setReplyActive(!replyActive)} />
                        )}
                        {isOwn && (
                            <DeleteButton
                                containerRef={containerRef}
                                type={"comment"}
                                title={"Delete comment!"}
                                className={"!pe-3 ms-auto"}
                                id={data.id}
                                removeSelfFromList={removeSelfFromList}
                                setLoading={setLoading}
                            />
                        )}
                    </ButtonContainer>

                    <ReplyPanel
                        replyActive={replyActive}
                        setReplyActive={setReplyActive}
                        commentId={data.id}
                        isReply={isReply}
                        targetUser={data.user?.username}
                        triggerRerender={triggerRerender}
                    />

                    <ReplyList
                        where={{ commentId: data.id }}
                        userId={userId}
                        level={level}
                        replyAmount={data._count.comments}
                        render={render}
                    />
                </div>
            </div>
        </PanelContainer>
    );
}

const ReplyButton = ({ onClick }) => {
    return (
        <button className="flex gap-3 items-center py-1 !px-3 cursor-pointer" onClick={onClick}>
            <SvgComponent name={"comment"} size={25} className={"fill-accent"} />
            <span>Reply</span>
        </button>
    );
};

const CommentContent = ({ data }) => {
    const timePassed = calculateElapsedTime(new Date() - new Date(data.created));
    return (
        <>
            <div className="flex gap-2">
                <h3 className="font-semibold">{data.user.username}</h3>
                <p className="mt-auto font-italic text-sm text-[gray]/80"> {timePassed}</p>
            </div>
            <p className="break-all">{data.content}</p>
        </>
    );
};
