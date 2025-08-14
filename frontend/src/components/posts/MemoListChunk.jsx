import { memo, useEffect, useRef, useState } from "react";

import PostItem from "./PostItem";
import postService from "../../services/post.service";
import Loader from "../misc/loader/Loader";
import { userSignal } from "../../global/userData";
import useSignal from "../../hooks/useSignal";

const MemoListChunk = memo(function ListChunk({ size = 5, index = 1, where }) {
	const [list, setList] = useState();
	const user = useSignal(userSignal, "MemoListChunk" + index);
	const loading = useRef(false);

	useEffect(() => {
		console.log("useEffect", loading, index);
		if (!loading.current) {
			loading.current = true;
			(async () => {
				const data = await postService.list({ limit: size, page: index, where, userId: user?.id });
				setList(data);
			})();
		}
		return () => (loading.current = false);
	}, [index, user]);

	if (!list) return <Loader className={"round-loader mx-auto !text-accent"} />;

	return (
		<>
			{list.map((data, index) => (
				<PostItem key={index} data={data} />
			))}
		</>
	);
});
export default MemoListChunk;
