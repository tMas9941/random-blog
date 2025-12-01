import { useRef, useState } from "react";
import SvgComponent from "../../misc/SvgComponent";
import useChunkLoader from "../../../hooks/useChunkLoader";
import CommentItem from "../CommentItem";
import Loader from "../../misc/loader/Loader";
import commentService from "../../../services/comment.service";
import { replyListChanged } from "./replyHandler";
import useSignal from "../../../hooks/useSignal";

const CHUNK_SIZE = 5;

export default function ReplyList({ commentId, userId, level, replyAmount }) {
    level++;
    const whereString = JSON.stringify({ commentId });
    const chunkContainerRef = useRef();
    const [chunkAmount, setChunkAmount] = useState(0);
    const tempReplyAmount = useRef(0);
    const { data, loading, removeFromList, addToList, clearList, extraItemCount } = useChunkLoader({
        dependencies: [whereString, chunkAmount],
        noPreload: chunkAmount < 1,
        fetchFunction,
    });
    const showedReplies = data.length || 0;
    useSignal(replyListChanged, "replyList" + commentId, addToReplyList);

    async function fetchFunction() {
        return await commentService.list({
            limit: CHUNK_SIZE,
            page: chunkAmount,
            where: whereString,
            userId,
        });
    }

    function addToReplyList() {
        if (replyListChanged.value.commentId === commentId) {
            tempReplyAmount.current++;
            setChunkAmount((value) => Math.max(value, 1));
            addToList(replyListChanged.value.newReply);
        }
    }

    return (
        <>
            {
                <OpenRepliesLink
                    clearList={clearList}
                    setChunkAmount={setChunkAmount}
                    replyAmount={replyAmount + extraItemCount || 0}
                    chunkAmount={chunkAmount}
                    showedReplies={showedReplies}
                />
            }
            <div ref={chunkContainerRef} className="flex flex-col transition-all duration-500">
                {chunkAmount > 0 &&
                    data.map((commentData) => (
                        <CommentItem
                            key={commentData.id}
                            data={commentData}
                            userId={userId}
                            removeFromList={removeFromList}
                            level={level}
                        />
                    ))}
                {loading && chunkAmount > 0 && <Loader className="round-loader" />}
            </div>
            <LoadMoreRepliesLink
                setChunkAmount={setChunkAmount}
                showedReplies={showedReplies}
                replyAmount={replyAmount + extraItemCount - showedReplies || 0}
                chunkContainerRef={chunkContainerRef}
                level={level}
            />
        </>
    );
}

function OpenRepliesLink({ setChunkAmount, replyAmount, clearList, showedReplies }) {
    if (replyAmount === 0) {
        return <></>;
    }
    const toggled = showedReplies > 0;
    const handleClick = () => {
        setChunkAmount(Number(!toggled));
        if (toggled) clearList();
    };

    return (
        <a className="mb-2 text-primary hover:underline cursor-pointer select-none w-fit " onClick={handleClick}>
            <SvgComponent
                name={"singleArrow"}
                size={17}
                className={`${
                    toggled ? "rotate-90 " : "-rotate-90 "
                }fill-primary stroke-primary inline-block me-1 stroke-2 -mt-[2px]`}
            />
            {` ${toggled ? "Hide " + showedReplies : "Show " + replyAmount} replies`}
        </a>
    );
}

function LoadMoreRepliesLink({ setChunkAmount, replyAmount, showedReplies }) {
    if (replyAmount <= 0 || !showedReplies) return <></>;
    const handleClick = () => {
        setChunkAmount((amount) => amount + 1);
    };

    return (
        <a className="mb-2 text-primary hover:underline cursor-pointer select-none w-fit " onClick={handleClick}>
            <SvgComponent
                name={"singleArrow"}
                size={17}
                className={`-rotate-90 fill-primary stroke-primary inline-block me-1 stroke-2 -mt-[2px]`}
            />
            {` Show ${replyAmount} more replies`}
        </a>
    );
}
