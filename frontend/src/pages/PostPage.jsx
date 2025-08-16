import React, { useEffect, useRef, useState } from "react";

// Hooks
import { useLocation } from "react-router-dom";
import { userSignal } from "../global/userData";

// Components
import PostItem from "../components/posts/PostItem";
import postService from "../services/post.service";
import Loader from "../components/misc/loader/Loader";
import CommentInput from "../components/comment/CommentInput";
import CommentList from "../components/comment/CommentList";

export default function PostPage() {
	const location = useLocation();
	const data = useFetchPost(location.pathname.split("/")[2]);

	if (!data) return <Loader className={"round-loader m-auto "} />;
	return (
		<div>
			<PostItem data={data} />
			<CommentInput postId={data.id} />
			<CommentList where={{ postId: data.id }} />
		</div>
	);
}

const useFetchPost = (id) => {
	const [data, setData] = useState();
	const loading = useRef(false);

	useEffect(() => {
		if (!loading.current) {
			loading.current = true;
			(async () => {
				const newData = await postService.getById({ id, userId: userSignal.value?.id });
				setData(newData);
			})();
		}
		return () => (loading.current = false);
	}, [id]);
	return data;
};
