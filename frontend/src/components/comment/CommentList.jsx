import { useRef } from "react";

import useScrollDetect from "../../hooks/useScrollDetect";
import ChunkLoader from "../posts/ChunkLoader";
import useSignal from "../../hooks/useSignal";
import { CHUNK_TYPE, renderCommentList } from "../../constants/exports";

const CHUNK_SIZE = 5;

export default function CommentList({ where, userId }) {
    const chunkContainerRef = useRef();
    const page = useScrollDetect(chunkContainerRef, CHUNK_SIZE);
    const reRender = useSignal(renderCommentList, "CommentList"); // need to render new comments
    // console.log("userId ", userId);
    return (
        <div
            ref={chunkContainerRef}
            className="flex flex-col border-y border-secondary/60 divide-y divide-secondary/30 transition-all duration-500"
        >
            {[...Array(page)].map((_, index) => (
                <ChunkLoader
                    key={index + 1}
                    query={{ limit: CHUNK_SIZE, page: index + 1, where: JSON.stringify(where), userId }}
                    type={CHUNK_TYPE.comment}
                    reRender={index === 0 && reRender} // need to render new comments
                    userId={userId}
                />
            ))}
        </div>
    );
}
