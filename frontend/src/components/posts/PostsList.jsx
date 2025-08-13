import { useEffect, useRef, useState } from "react";
import MemoListChunk from "./MemoListChunk";

const CHUNK_SIZE = 5;
export default function PostsList({ where }) {
	const chunkContainerRef = useRef();
	const page = useScrollDetect(chunkContainerRef);
	return (
		<div ref={chunkContainerRef} className="flex flex-col border-y border-accent/50 divide-y-1 divide-accent/50 ">
			{[...Array(page)].map((none, index) => (
				<MemoListChunk key={index + 1} index={index + 1} size={CHUNK_SIZE} where={JSON.stringify(where)} />
			))}
		</div>
	);
}

function useScrollDetect(chunkContainerRef) {
	// detect scroll changes
	// if scroll position reaches bottom => increase page
	const [page, setPage] = useState(1);
	useEffect(() => {
		window.addEventListener("scroll", scrollChanged);

		return () => window.removeEventListener("scroll", scrollChanged);
	}, []);

	function scrollChanged() {
		// calculate scroll position
		const scrollPosition =
			document.documentElement.scrollHeight - window.scrollY - document.documentElement.clientHeight;
		// if scroll at bottom and container is full >> increase page
		if (scrollPosition <= 0 && chunkContainerRef.current?.children.length === page * CHUNK_SIZE) setPage(page + 1);
	}

	return page;
}
