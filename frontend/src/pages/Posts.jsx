import { useNavigate } from "react-router-dom";
import { userSignal } from "../global/userData";
import useSignal from "../hooks/useSignal";

// Components
import ColorButton from "../components/buttons/ColorButton";
import PostsList from "../components/posts/PostsList";

export default function Posts() {
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
