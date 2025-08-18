import { useEffect, useRef, useState } from "react";

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

export default function Chunkloader({ index = 1, type, query, reRender }) {
	const [list, setList] = useState();
	const loading = useRef(false);

	useEffect(() => {
		if (!loading.current) {
			loading.current = true;
			(async () => {
				const data = await chunkItems[type].service.list(query);
				setList(data);
			})();
		}
		return () => (loading.current = false);
	}, [index, reRender]);

	if (!list) return <Loader className={"round-loader m-auto "} />;

	const DynamicListItem = chunkItems[type].item;

	return (
		<>
			{list.map((data) => (
				<DynamicListItem key={data.id} data={data} />
			))}
		</>
	);
}
