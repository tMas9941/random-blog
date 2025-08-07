import { memo, useEffect, useRef, useState } from "react";

import ListItem from "./ListItem";
import postService from "../../services/post.service";
import Loader from "../misc/loader/Loader";

const MemoListChunk = memo(function ListChunk({ size = 5, index = 1 }) {
	const [list, setList] = useState();
	const loading = useRef(false);

	useEffect(() => {
		if (!loading.current) {
			loading.current = true;
			(async () => {
				const data = await postService.list({ limit: size, page: index });
				setList(data);
			})();
		}
		return () => (loading.current = false);
	}, [index]);

	if (!list) return <Loader className={"line-loader mx-auto !text-accent"} />;

	return (
		<>
			{list.map((data, index) => (
				<ListItem key={index} data={data} />
			))}
		</>
	);
});
export default MemoListChunk;
