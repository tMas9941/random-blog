import { useEffect, useState } from "react";

export default function useScrollDetect(chunkContainerRef, CHUNK_SIZE = 5) {
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
