import { useState } from "react";

import Avatar from "../misc/Avatar";
import VoteButton from "../vote/VoteButton";
import ButtonContainer from "../buttons/ButtonContainer";
import calculateElapsedTime from "../../utils/calculateEllapsedTime";
import SvgComponent from "../misc/SvgComponent";
import ReplyPanel from "./reply/ReplyPanel";
import ReplyList from "./reply/ReplyList";

export default function CommentItem({ data, userId, level = 0 }) {
    const timePassed = calculateElapsedTime(new Date() - new Date(data.created));
    const [replyActive, setReplyActive] = useState(null);
    const [render, setRender] = useState(0);
    const isReply = !data.postId;

    function triggerRerender(value) {
        setRender((i) => i + value);
    }

    return (
        <div
            className={
                "flex py-2 px-3  hover:bg-secondary/10 animate-fade-in " +
                (isReply ? " -ms-6 rounded-md gap-3" : " gap-4")
            }
        >
            <Avatar text={data.user.username} size={isReply ? 45 : 55} url={data.user?.profile.avatarUrl} />

            <div className="flex flex-col gap-1 w-full -mt-[5px]">
                <div className="flex gap-2">
                    <h3 className="font-semibold">{data.user.username}</h3>
                    <p className="mt-auto font-italic text-sm text-[gray]/80"> {timePassed}</p>
                </div>
                <p className="break-all">{data.content}</p>

                <ButtonContainer className={"mt-2"}>
                    <VoteButton commentId={data.id} votes={data.votes} />
                    {userId && level < 3 && <ReplyButton onClick={() => setReplyActive(!replyActive)} />}
                </ButtonContainer>

                {
                    <ReplyPanel
                        replyActive={replyActive}
                        setReplyActive={setReplyActive}
                        commentId={data.id}
                        isReply={isReply}
                        targetUser={data.user?.username}
                        triggerRerender={triggerRerender}
                    />
                }

                {
                    <ReplyList
                        where={{ commentId: data.id }}
                        userId={userId}
                        level={level}
                        replyAmount={data._count.comments}
                        render={render}
                    />
                }
            </div>
        </div>
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
