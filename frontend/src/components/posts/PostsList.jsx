import { useEffect, useState } from "react";
import MemoListChunk from "./MemoListChunk";

const CHUNK_SIZE = 6;
export default function PostsList({ where }) {
	const page = useScrollDetect();
	return (
		<div className="flex flex-col border-y border-accent/50 divide-y-1 divide-accent/50 ">
			{[...Array(page)].map((none, index) => (
				<MemoListChunk key={index + 1} index={index + 1} size={CHUNK_SIZE} where={JSON.stringify(where)} />
			))}
		</div>
	);
}

function useScrollDetect() {
	// detect scroll changes
	// if scroll position reaches bottom => increase page
	const [page, setPage] = useState(1);
	useEffect(() => {
		window.addEventListener("scroll", scrollChanged);

		return () => window.removeEventListener("scroll", scrollChanged);
	}, []);

	function scrollChanged() {
		const newPage = document.documentElement.scrollHeight - window.scrollY - document.documentElement.clientHeight;
		if (newPage <= 0) setPage((page) => page + 1);
	}

	return page;
}
