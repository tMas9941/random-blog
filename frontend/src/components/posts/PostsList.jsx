import { useRef } from "react";

import useScrollDetect from "../../hooks/useScrollDetect";
import postService from "../../services/post.service";
import PostItem from "./PostItem";
import useChunkLoader from "../../hooks/useChunkLoader";
import Loader from "../misc/loader/Loader";
import { postListChanged } from "../../global/postSignals";
import useSignal from "../../hooks/useSignal";

const CHUNK_SIZE = 5;

export default function PostsList({ where, user }) {
    const stringWhere = JSON.stringify(where);
    const chunkContainerRef = useRef();
    const page = useScrollDetect(chunkContainerRef, CHUNK_SIZE);

    const { data, loading, removeFromList } = useChunkLoader({
        dependencies: [stringWhere, page],
        fetchFunction: async () =>
            await postService.list({
                limit: CHUNK_SIZE,
                page: page,
                where: stringWhere,
                userId: user?.id,
            }),
    });

    useSignal(postListChanged, "postList", () => {
        removeFromList(postListChanged.value.postId);
    });
    if (!data) return <></>;
    return (
        <>
            <div ref={chunkContainerRef} className="flex flex-col gap-3 transition-all duration-300">
                {data.map((postData) => (
                    <PostItem data={postData} key={postData.id} userId={user?.id} />
                ))}
            </div>
            {loading && <Loader className="round-loader" />}
        </>
    );
}
