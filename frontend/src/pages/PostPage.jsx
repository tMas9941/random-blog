import React, { useEffect, useRef, useState } from "react";
import PostItem from "../components/posts/PostItem";
import { useLocation } from "react-router-dom";
import postService from "../services/post.service";
import { userSignal } from "../global/userData";
import Loader from "../components/misc/loader/Loader";

export default function PostPage() {
	const location = useLocation();

	const data = useFetchPost(location.pathname.split("/")[2]);
	if (!data) return <Loader className={"round-loader text-secondary "} />;
	return (
		<div>
			<PostItem data={data} />
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
				const newData = await postService.getById({ id, userId: userSignal.value.id });
				setData(newData);
			})();
		}
		return () => (loading.current = false);
	}, [id]);

	return data;
};
