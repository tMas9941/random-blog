import useListPost from "../hooks/useListPosts";
import ListItem from "../components/posts/ListItem";
import ColorButton from "../components/buttons/ColorButton";
import { useNavigate } from "react-router-dom";
import { userSignal } from "../global/userData";

export default function Posts() {
	const list = useListPost();
	const navigate = useNavigate();
	console.log("RENDER POSTS", list);
	return (
		<div className="w-full ">
			<div className="flex justify-between">
				<h1 className="text-4xl font-bold mb-10">Posts</h1>
				<ColorButton text={"Add post"} disabled={!userSignal.value} onClick={() => navigate("/posts/add")} />
			</div>
			<div className="flex flex-col divide-y-1 divide-accent/50 border-y border-accent/50  ">
				{list?.map((data, index) => (
					<ListItem key={index} data={data} />
				))}
			</div>
		</div>
	);
}
