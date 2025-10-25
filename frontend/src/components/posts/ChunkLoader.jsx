import { memo, useEffect, useRef, useState } from "react";

// Services
import postService from "../../services/post.service";
import commentService from "../../services/comment.service";

// Components
import PostItem from "./PostItem";
import CommentItem from "../comment/CommentItem";
import Loader from "../misc/loader/Loader";

const chunkItems = {
    post: { item: PostItem, service: postService },
    comment: { item: CommentItem, service: commentService },
};

const Chunkloader = ({ index = 1, type, query, userId, reRender }) => {
    const [list, setList] = useState();
    const loading = useRef(false);

    useEffect(() => {
        if (!loading.current) {
            loading.current = true;
            (async () => {
                const data = await chunkItems[type].service.list(query);
                setList(data);
            })();
        }
        return () => (loading.current = false);
    }, [index, reRender, userId, type, query]);

    if (!list) return <Loader className={"round-loader m-auto "} />;

    const DynamicListItem = chunkItems[type].item;

    function removeSelfFromList(id) {
        const newList = list.filter((item) => item.id !== id);
        setList(newList);
    }

    return (
        <>
            {list.map((data) => (
                <DynamicListItem key={data.id} data={data} removeSelfFromList={removeSelfFromList} userId={userId} />
            ))}
        </>
    );
};
export default memo(Chunkloader, areEqual);

function areEqual(prevProps, nextProps) {
    if (prevProps.index !== nextProps.index) return false;
    if (prevProps.reRender !== nextProps.reRender) return false;
    if (prevProps.userId !== nextProps.userId) return false;
    return true;
}
