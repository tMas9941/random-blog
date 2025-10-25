import { useState } from "react";

import Avatar from "../misc/Avatar";
import VoteButton from "../vote/VoteButton";
import ButtonContainer from "../buttons/ButtonContainer";
import calculateElapsedTime from "../../utils/calculateEllapsedTime";
import SvgComponent from "../misc/SvgComponent";
import ReplyInput from "./ReplyInput";

export default function CommentItem({ data, userId }) {
    const timePassed = calculateElapsedTime(new Date() - new Date(data.created));
    const [replyActive, setReplyActive] = useState(false);

    return (
        <div className={"flex py-2 px-3 gap-5 hover:bg-secondary/10 animate-fade-in rounded-md "}>
            <Avatar text={data.user.username} size={60} url={data.user?.profile.avatarUrl} />

            <div className="flex flex-col gap-1 w-full">
                <div className="flex gap-2">
                    <h3 className="font-semibold">{data.user.username}</h3>
                    <p className="mt-auto font-italic text-sm text-[gray]/80"> {timePassed}</p>
                </div>
                <p>{data.content}</p>

                <ButtonContainer className={"mt-4"}>
                    <VoteButton commentId={data.id} votes={data.votes} />
                    {userId && <ReplyButton onClick={() => setReplyActive(!replyActive)} />}
                </ButtonContainer>

                {replyActive && <ReplyInput setReplyActive={setReplyActive} commentId={data.id} />}
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
