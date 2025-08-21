import { useRef } from "react";

import useScrollDetect from "../../hooks/useScrollDetect";
import ChunkLoader, { CHUNK_TYPE } from "./ChunkLoader";

const CHUNK_SIZE = 5;
export default function PostsList({ where, user }) {
	const chunkContainerRef = useRef();
	const page = useScrollDetect(chunkContainerRef, CHUNK_SIZE);

	return (
		<div ref={chunkContainerRef} className="flex flex-col border-y border-secondary/60 divide-y-1 divide-secondary/60 ">
			{[...Array(page)].map((none, index) => (
				<ChunkLoader
					key={index + 1}
					query={{ limit: CHUNK_SIZE, page: index + 1, where: JSON.stringify(where), userId: user?.id }}
					type={CHUNK_TYPE.post}
				/>
			))}
		</div>
	);
}
