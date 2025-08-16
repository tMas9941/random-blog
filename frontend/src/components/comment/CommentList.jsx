import React from "react";

import { useRef } from "react";

import useScrollDetect from "../../hooks/useScrollDetect";
import ChunkLoader, { CHUNK_TYPE } from "../posts/ChunkLoader";

const CHUNK_SIZE = 10;
export default function CommentList({ where }) {
	const chunkContainerRef = useRef();
	const page = useScrollDetect(chunkContainerRef, CHUNK_SIZE);
	return (
		<div ref={chunkContainerRef} className="flex flex-col border-y border-accent/50 divide-y-1 divide-accent/50 ">
			{[...Array(page)].map((none, index) => (
				<ChunkLoader
					key={index + 1}
					index={index + 1}
					size={CHUNK_SIZE}
					where={JSON.stringify(where)}
					type={CHUNK_TYPE.comment}
				/>
			))}
		</div>
	);
}
