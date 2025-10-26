import { useEffect, useRef, useState } from "react";

export default function useScrollDetect(chunkContainerRef, chunkMaxSize) {
    // detect scroll changes
    // if scroll position reaches bottom => check if need new page

    const [page, setPage] = useState(1); // starting page is 1
    const prevChildrenCount = useRef(0);

    useEffect(() => {
        window.addEventListener("scroll", scrollChanged);
        return () => window.removeEventListener("scroll", scrollChanged);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chunkContainerRef, chunkMaxSize]);

    function scrollChanged() {
        if (needNewPage()) {
            setPage((_size) => _size + 1);
        }
    }
    function needNewPage() {
        // need new page if scroll at bottom and previous childrenCount does not match the current (avoid repeating refresh)
        const childrenCount = chunkContainerRef.current?.children.length;
        console.log(childrenCount);
        if (!childrenCount) return false;

        const scrollAtBottom =
            document.documentElement.scrollHeight - window.scrollY - document.documentElement.clientHeight <= 100;

        if (prevChildrenCount.current < chunkContainerRef.current.children.length && scrollAtBottom) {
            if (chunkContainerRef.current.children[0].classList.contains("loading")) return false; // fix endlessly instancing loaders
            prevChildrenCount.current = chunkContainerRef.current.children.length;
            return true;
        }
        return false;
    }

    return page;
}
