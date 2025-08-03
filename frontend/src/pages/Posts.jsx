import useListPost from "../hooks/useListPosts";
import ListItem from "../components/posts/ListItem";
import ColorButton from "../components/buttons/ColorButton";
import { useNavigate } from "react-router-dom";
import { userSignal } from "../global/userData";
import useSignal from "../hooks/useSignal";
import Loader from "../components/misc/loader/Loader";

export default function Posts() {
	console.log("RENDER POSTS");
	return (
		<div className="w-full ">
			<TopSection />
			<PostsList />
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

const PostsList = () => {
	const list = useListPost();
	if (!list) return <Loader className={"line-loader mx-auto !text-accent"} />;
	return (
		<div className="flex flex-col divide-y-1 divide-accent/50 border-y border-accent/50  ">
			{list.map((data, index) => (
				<ListItem key={index} data={data} />
			))}
		</div>
	);
};
