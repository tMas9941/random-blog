import { memo, useEffect, useRef, useState } from "react";

// Services
import postService from "../../services/post.service";
import commentService from "../../services/comment.service";

// Hooks
import { userSignal } from "../../global/userData";
import useSignal from "../../hooks/useSignal";

// Components
import PostItem from "./PostItem";
import CommentItem from "../comment/CommentItem";
import Loader from "../misc/loader/Loader";

const chunkItems = {
	post: { item: PostItem, service: postService },
	comment: { item: CommentItem, service: commentService },
};

export const CHUNK_TYPE = { post: "post", comment: "comment" };

const ChunkLoader = memo(function Chunk({ size = 5, index = 1, where, type }) {
	const [list, setList] = useState();
	const user = useSignal(userSignal, "MemoChunk_" + type + index);
	const loading = useRef(false);

	useEffect(() => {
		if (!loading.current) {
			loading.current = true;
			(async () => {
				const data = await chunkItems[type].service.list({ limit: size, page: index, where, userId: user?.id });
				setList(data);
			})();
		}
		return () => (loading.current = false);
	}, [index, user]);

	if (!list) return <Loader className={"round-loader m-auto "} />;
	const DynamicListItem = chunkItems[type].item;

	return (
		<>
			{list.map(
				(data, index) => (
					<DynamicListItem key={index} data={data} />
				)

				// <PostItem key={index} data={data} />
			)}
		</>
	);
});
export default ChunkLoader;
