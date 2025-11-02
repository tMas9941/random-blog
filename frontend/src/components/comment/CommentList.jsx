import { useRef } from "react";

import useScrollDetect from "../../hooks/useScrollDetect";
import ChunkLoader from "../posts/ChunkLoader";
import useSignal from "../../hooks/useSignal";
import { CHUNK_TYPE, renderCommentList } from "../../constants/exports";

const CHUNK_SIZE = 5;

export default function CommentList({ where, userId }) {
    const chunkContainerRef = useRef();
    const page = useScrollDetect(chunkContainerRef, CHUNK_SIZE);
    const render = useSignal(renderCommentList, "CommentList"); // need to render new comments

    return (
        <div
            ref={chunkContainerRef}
            className="flex flex-col border-y border-secondary/60 transition-all duration-500 gap-1"
        >
            {[...Array(page)].map((_, index) => (
                <ChunkLoader
                    key={index + 1}
                    query={{ limit: CHUNK_SIZE, page: index + 1, where: JSON.stringify(where), userId }}
                    type={CHUNK_TYPE.comment}
                    render={index === 0 && render} // need to render new comments
                    userId={userId}
                />
            ))}
        </div>
    );
}
