import React from "react";

// Hooks
import { useLocation } from "react-router-dom";
import { userSignal } from "../global/userData";

// Components
import PostItem from "../components/posts/PostItem";
import postService from "../services/post.service";
import Loader from "../components/misc/loader/Loader";
import CommentInput from "../components/comment/CommentInput";
import CommentList from "../components/comment/CommentList";
import useSignal from "../hooks/useSignal";
import useFetchData from "../hooks/useFetchData";

export default function PostPage() {
	const location = useLocation();
	const user = useSignal(userSignal, "PostPage");
	const postId = location.pathname.split("/")[2];
	const fetchData = useFetchData({
		dependencies: [location.pathname.split("/")[2], user],
		fetchService: () => postService.getById({ id: postId, userId: user?.id }),
	});

	if (fetchData.error) return <div>{fetchData.error}</div>;
	if (!fetchData.data) return <Loader className={"round-loader m-auto "} />;

	return (
		<div>
			<PostItem data={fetchData.data} showComment={false} />
			<CommentInput postId={fetchData.data.id} user={user} />
			<CommentList where={{ postId: fetchData.data.id }} user={user} />
		</div>
	);
}

// const useFetchPost = (id, user) => {
// 	const [data, setData] = useState();
// 	const loading = useRef(false);

// 	useEffect(() => {
// 		if (!loading.current) {
// 			loading.current = true;

// 			console.log("start fetch");
// 			(async () => {
// 				try {
// 					const newData = await postService.getById({ id, userId: user?.id });
// 					console.log({ newData });
// 					setData(newData);
// 				} catch (error) {
// 					console.log(error);
// 					// setData(error);
// 				}
// 			})();
// 		}
// 		return () => (loading.current = false);
// 	}, [id, user]);

// 	return data;
// };
