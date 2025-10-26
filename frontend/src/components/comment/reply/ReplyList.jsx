import { useRef, useState } from "react";

import { CHUNK_TYPE } from "../../../constants/exports";
import ChunkLoader from "../../posts/ChunkLoader";

const CHUNK_SIZE = 5;

export default function ReplyList({ where, userId, level }) {
    const chunkContainerRef = useRef();
    const [chunkAmount, setChunkAmount] = useState(0);
    // const page = useScrollDetect(chunkContainerRef, CHUNK_SIZE);
    // const reRender = useSignal(renderCommentList, "CommentList"); // need to render new comments
    level++;
    return (
        <div ref={chunkContainerRef} className="flex flex-col transition-all duration-500">
            <ChangeReplyAmount setChunkAmount={setChunkAmount} />
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
    );
}

function ChangeReplyAmount({ setChunkAmount }) {
    const handleOnClick = () => {
        setChunkAmount((amount) => amount + 1);
    };
    return (
        <a className="mb-2 text-primary hover:underline cursor-pointer select-none w-fit " onClick={handleOnClick}>
            Show replies
        </a>
    );
}
