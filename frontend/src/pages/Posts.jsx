import { useNavigate } from "react-router-dom";
import { userSignal } from "../global/userData";
import useSignal from "../hooks/useSignal";

// Components
import ColorButton from "../components/buttons/ColorButton";
import { useEffect, useState } from "react";
import MemoListChunk from "../components/posts/MemoListChunk";

export default function Posts() {
	console.log("RENDER POSTS");
	return (
		<div className="w-full ">
			<TopSection />
			<PostsList />
			{/* <ScrollDetector elementID={"postDiv"} /> */}
		</div>
	);
}

const TopSection = () => {
	const navigate = useNavigate();
	const user = useSignal(userSignal, "addPostButton");
	return (
		<div className="flex justify-between">
			<h1 className="text-4xl font-bold mb-10">Posts</h1>
			<ColorButton
				text={"Create post"}
				disabled={!user}
				title={user ? "Create new post" : "Log-in to create new post!"}
				onClick={() => navigate("/posts/create")}
			/>
		</div>
	);
};
const CHUNK_SIZE = 6;
const PostsList = () => {
	const page = useScrollDetect();
	// const list = useListPost();

	console.log("RENDER LIST____________________________________________", page);
	return (
		<div className="flex flex-col border-y border-accent/50 divide-y-1 divide-accent/50 ">
			{[...Array(page)].map((i, index) => (
				<MemoListChunk key={index + 1} index={index + 1} size={CHUNK_SIZE} />
			))}
		</div>
	);
};

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
