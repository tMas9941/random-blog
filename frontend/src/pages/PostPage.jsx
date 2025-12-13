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
import useSignalState from "../hooks/useSignalState";
import useFetchData from "../hooks/useFetchData";
import LoaderWithBlur from "../components/posts/LoaderWithBlur";

export default function PostPage() {
    const location = useLocation();
    const user = useSignalState(userSignal, "PostPage");
    const postId = location.pathname.split("/")[2];
    const fetchData = useFetchData({
        dependencies: [location.pathname.split("/")[2], user],
        fetchService: () => postService.getById({ id: postId, userId: user?.id }),
    });

    if (fetchData.error) return <div>{fetchData.error}</div>;
    if (!fetchData.data) return <Loader className={"round-loader m-auto "} />;

    return (
        <div className="relative overflow-hidden">
            <PostItem data={fetchData.data} onPostPage={true} />
            <LoaderWithBlur className=" peer-[.loading]:block hidden mt-10 rounded-lg [&~*]:p-4" />
            <CommentInput postId={fetchData.data.id} user={user} />
            <CommentList where={{ postId: fetchData.data.id }} userId={user?.id} />
        </div>
    );
}
