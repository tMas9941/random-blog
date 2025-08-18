import { userSignal } from "../global/userData";
import useSignal from "../hooks/useSignal";

// Components
import PostsList from "../components/posts/PostsList";

export default function Posts() {
	const user = useSignal(userSignal, "Posts");
	return (
		<div className="w-full ">
			<h1 className="text-4xl font-bold mb-10">Posts</h1>
			<PostsList user={user} />
		</div>
	);
}
