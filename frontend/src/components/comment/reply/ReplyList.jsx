import { useRef, useState } from "react";

import { CHUNK_TYPE } from "../../../constants/exports";
import ChunkLoader from "../../posts/ChunkLoader";
import SvgComponent from "../../misc/SvgComponent";

const CHUNK_SIZE = 5;

export default function ReplyList({ where, userId, level, replyAmount }) {
    level++;
    const chunkContainerRef = useRef();
    const [chunkAmount, setChunkAmount] = useState(0);

    // const reRender = useSignal(renderCommentList, "CommentList"); // need to render new comments

    return (
        <>
            {<OpenRepliesLink setChunkAmount={setChunkAmount} replyAmount={replyAmount} chunkAmount={chunkAmount} />}
            <div ref={chunkContainerRef} className="flex flex-col transition-all duration-500">
                {[...Array(chunkAmount)].map((_, index) => (
                    <ChunkLoader
                        key={index + 1}
                        query={{ limit: CHUNK_SIZE, page: index + 1, where: JSON.stringify(where), userId }}
                        type={CHUNK_TYPE.comment}
                        level={level}
                        // reRender={index === 0 && reRender} // need to render new comments
                        userId={userId}
                    />
                ))}
            </div>
            <LoadMoreRepliesLink
                setChunkAmount={setChunkAmount}
                chunkAmount={chunkAmount}
                replyAmount={replyAmount}
                chunkContainerRef={chunkContainerRef}
                level={level}
            />
        </>
    );
}

function OpenRepliesLink({ setChunkAmount, replyAmount, chunkAmount }) {
    if (replyAmount === 0) return <></>;
    const toggled = chunkAmount > 0;
    const handleClick = () => {
        setChunkAmount(Number(!toggled));
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
            {` ${toggled ? "Hide " : "Show "}  ${replyAmount} replies`}
        </a>
    );
}

function LoadMoreRepliesLink({ setChunkAmount, replyAmount, chunkAmount }) {
    if (replyAmount - CHUNK_SIZE * chunkAmount <= 0 || replyAmount < 1 || chunkAmount < 1) return <></>;
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
            {` Show ${replyAmount - CHUNK_SIZE * chunkAmount} more replies`}
        </a>
    );
}
