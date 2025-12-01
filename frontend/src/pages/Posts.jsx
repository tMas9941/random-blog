import { userSignal } from "../global/userData";
import useSignalState from "../hooks/useSignalState";

// Components
import PostsList from "../components/posts/PostsList";

export default function Posts() {
    const user = useSignalState(userSignal, "Posts");
    return (
        <div className="w-full ">
            <h1 className="text-4xl font-bold mb-10">Posts</h1>
            <PostsList user={user} />
        </div>
    );
}
