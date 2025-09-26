import { useEffect, useState } from "react";

export default function useScrollDetect(chunkContainerRef, chunkMaxSize) {
    // detect scroll changes
    // if scroll position reaches bottom => increase page

    const [page, setPage] = useState(1); // starting page is 1

    useEffect(() => {
        window.addEventListener("scroll", scrollChanged);
        return () => window.removeEventListener("scroll", scrollChanged);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chunkContainerRef, chunkMaxSize]);

    function scrollChanged() {
        const chunkChildrenCount = chunkContainerRef.current?.children.length;
        if (doNeedNewPage(chunkChildrenCount)) {
            const newPageCount = Math.floor(chunkChildrenCount / chunkMaxSize + 1);
            setPage(newPageCount);
        }
    }
    function doNeedNewPage(chunkChildrenCount) {
        const isScrollPositionAtBottom =
            document.documentElement.scrollHeight - window.scrollY - document.documentElement.clientHeight <= 100;
        const maxChunkItems = page * chunkMaxSize;

        // need new page if scroll at bottom and chunkContainer is full
        return isScrollPositionAtBottom && chunkChildrenCount >= maxChunkItems;
    }

    return page;
}
