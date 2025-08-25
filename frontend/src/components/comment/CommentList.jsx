import React from "react";

import { useRef } from "react";

import useScrollDetect from "../../hooks/useScrollDetect";
import ChunkLoader, { CHUNK_TYPE } from "../posts/ChunkLoader";
import Signal from "../../utils/signal";
import useSignal from "../../hooks/useSignal";

export const renderCommentList = new Signal(0);

const CHUNK_SIZE = 5;
export default function CommentList({ where, user }) {
	const chunkContainerRef = useRef();
	const page = useScrollDetect(chunkContainerRef, CHUNK_SIZE);
	const reRender = useSignal(renderCommentList, "CommentList"); // need to render new comments

	return (
		<div
			ref={chunkContainerRef}
			className="flex flex-col border-y border-secondary/60 divide-y-1 divide-secondary/60 transition-all duration-500"
		>
			{[...Array(page)].map((none, index) => (
				<ChunkLoader
					key={index + 1}
					query={{ limit: CHUNK_SIZE, page: index + 1, where: JSON.stringify(where), userId: user?.id }}
					type={CHUNK_TYPE.comment}
					reRender={index === 0 && reRender} // need to render new comments
					userId={user?.id}
				/>
			))}
		</div>
	);
}
