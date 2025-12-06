import { useRef } from "react";

import useScrollDetect from "../../hooks/useScrollDetect";

import useChunkLoader from "../../hooks/useChunkLoader";
import CommentItem from "./CommentItem";
import commentService from "../../services/comment.service";
import Loader from "../misc/loader/Loader";
import { commentListChanged } from "../../global/commentSignals";

const CHUNK_SIZE = 5;

export default function CommentList({ where, userId }) {
    const whereString = JSON.stringify(where);
    const chunkContainerRef = useRef();
    const page = useScrollDetect(chunkContainerRef, CHUNK_SIZE);
    const { data, loading, removeFromList, addToList } = useChunkLoader({
        dependencies: [whereString, page],
        fetchFunction: async () =>
            await commentService.list({
                limit: CHUNK_SIZE,
                page: page,
                where: whereString,
                userId,
            }),
    });
    commentListChanged.connect("renderNewComment", () => addToList(commentListChanged.value));

    if (!data) return <></>;
    return (
        <>
            <div
                ref={chunkContainerRef}
                id={"commentList"}
                className="flex flex-col border-y border-secondary/60 transition-all duration-500 gap-1"
            >
                {data.map((commentData) => (
                    <CommentItem
                        data={commentData}
                        key={commentData.id}
                        userId={userId}
                        removeFromList={removeFromList}
                    />
                ))}
                {data.length === 0 && <p className="mx-auto text-md">Be the first to comment...</p>}
                {loading && <Loader className="round-loader" />}
            </div>
        </>
    );
}
