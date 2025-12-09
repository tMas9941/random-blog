import { useRef, useState } from "react";

// Components
import SvgComponent from "../../misc/SvgComponent";
import useChunkLoader from "../../../hooks/useChunkLoader";
import CommentItem from "../CommentItem";
import Loader from "../../misc/loader/Loader";

// Signals
import { replyAdded, replyRemoved } from "../../../global/commentSignals";
import useSignal from "../../../hooks/useSignal";

import commentService from "../../../services/comment.service";

const CHUNK_SIZE = 5;

export default function ReplyList({ commentId, userId, level, replyAmount = 0 }) {
    level++;
    const whereString = JSON.stringify({ commentId });
    const chunkContainerRef = useRef();
    const [chunkAmount, setChunkAmount] = useState(0);
    const { data, loading, removeFromList, addToList, clearList, extraItemCount } = useChunkLoader({
        dependencies: [whereString, chunkAmount],
        noPreload: chunkAmount < 1,
        fetchFunction,
    });
    const showedReplies = data.length || 0;
    const signalName = "replyList_" + commentId;
    useSignal(replyAdded, signalName, addToReplyList);
    replyRemoved.connect(signalName, "remove_" + commentId, () => {
        removeFromList(replyRemoved.getValue(signalName));
    });

    async function fetchFunction() {
        return await commentService.list({
            limit: CHUNK_SIZE,
            page: chunkAmount,
            where: whereString,
            userId,
        });
    }

    function addToReplyList() {
        if (replyAdded.value.commentId === commentId) {
            setChunkAmount((value) => Math.max(value, 1));
            addToList(replyAdded.value.newReply);
        }
    }

    return (
        <>
            {
                <OpenRepliesLink
                    clearList={clearList}
                    setChunkAmount={setChunkAmount}
                    replyAmount={replyAmount}
                    extraItemCount={extraItemCount}
                    chunkAmount={chunkAmount}
                    showedReplies={showedReplies}
                />
            }
            <div ref={chunkContainerRef} className="flex flex-col  gap-1 transition-all duration-500">
                {chunkAmount > 0 &&
                    data.map((commentData) => (
                        <CommentItem key={commentData.id} data={commentData} userId={userId} level={level} />
                    ))}
                {loading && chunkAmount > 0 && <Loader className="line-loader scale-70" />}
            </div>
            <LoadMoreRepliesLink
                setChunkAmount={setChunkAmount}
                showedReplies={showedReplies}
                replyAmount={replyAmount}
                extraItemCount={extraItemCount}
                chunkContainerRef={chunkContainerRef}
                level={level}
            />
        </>
    );
}
const arrowClass = "stroke-primary inline-block me-1 stroke-2 -mt-[2px]";
const textClass = "text-primary hover:underline cursor-pointer select-none w-fit ";
function OpenRepliesLink({ setChunkAmount, replyAmount, clearList, showedReplies, extraItemCount }) {
    const value = replyAmount - showedReplies + extraItemCount;
    if (replyAmount + extraItemCount === 0) {
        return <></>;
    }

    const toggled = showedReplies > 0;
    const handleClick = () => {
        setChunkAmount(Number(!toggled));
        if (toggled) clearList();
    };

    return (
        <a className={textClass} onClick={handleClick}>
            <SvgComponent
                name={"singleArrow"}
                size={17}
                className={`${toggled ? "rotate-90 " : "-rotate-90 "} ${arrowClass} `}
            />
            {`${toggled ? "Hide " + showedReplies : "Show " + value} replies`}
        </a>
    );
}

function LoadMoreRepliesLink({ setChunkAmount, replyAmount, showedReplies, extraItemCount }) {
    const value = replyAmount - showedReplies + extraItemCount;
    if (value <= 0 || !showedReplies) return <></>;
    const handleClick = () => {
        setChunkAmount((amount) => amount + 1);
    };

    return (
        <a className={textClass} onClick={handleClick}>
            <SvgComponent name={"singleArrow"} size={17} className={`-rotate-90 ${arrowClass}`} />
            {`Show ${value} more replies`}
        </a>
    );
}
