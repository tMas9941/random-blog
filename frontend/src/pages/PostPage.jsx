import React, { useEffect, useReducer, useRef, useState } from "react";

// Hooks
import { useLocation } from "react-router-dom";
import { userSignal } from "../global/userData";

// Components
import PostItem from "../components/posts/PostItem";
import postService from "../services/post.service";
import Loader from "../components/misc/loader/Loader";
import CommentInput from "../components/comment/CommentInput";
import CommentList from "../components/comment/CommentList";
import useSignal from "../hooks/useSignal";

export default function PostPage() {
	const location = useLocation();
	const user = useSignal(userSignal, "PostPage");
	const data = useFetchPost(location.pathname.split("/")[2], user);

	if (!data) return <Loader className={"round-loader m-auto "} />;

	return (
		<div>
			<PostItem data={data} showComment={false} />
			<CommentInput postId={data.id} user={user} />
			<CommentList where={{ postId: data.id }} user={user} />
		</div>
	);
}

const useFetchPost = (id, user) => {
	const [data, setData] = useState();
	const loading = useRef(false);

	useEffect(() => {
		if (!loading.current) {
			loading.current = true;
			(async () => {
				const newData = await postService.getById({ id, userId: user?.id });
				setData(newData);
			})();
		}
		return () => (loading.current = false);
	}, [id, user]);

	return data;
};
