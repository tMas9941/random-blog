import { useRef } from "react";
import MemoPostChunk from "./MemoPostChunk";
import useScrollDetect from "../../hooks/useScrollDetect";

const CHUNK_SIZE = 5;
export default function PostsList({ where }) {
	const chunkContainerRef = useRef();
	const page = useScrollDetect(chunkContainerRef, CHUNK_SIZE);
	return (
		<div ref={chunkContainerRef} className="flex flex-col border-y border-accent/50 divide-y-1 divide-accent/50 ">
			{[...Array(page)].map((none, index) => (
				<MemoPostChunk key={index + 1} index={index + 1} size={CHUNK_SIZE} where={JSON.stringify(where)} />
			))}
		</div>
	);
}
