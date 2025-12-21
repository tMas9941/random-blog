import { removeFromCommentList, removeFromReplyList } from "../../global/commentSignals";
import { changePopupData, popupResults } from "../../global/popupHandler";
import { removeFromPostList } from "../../global/postSignals";
import commentService from "../../services/comment.service";
import postService from "../../services/post.service";
import capitalize from "../../utils/capitalize";
import SvgComponent from "../misc/SvgComponent";
import Button from "./Button";

const deleteFunctions = {
    post: async (data) => {
        await postService.destroy(data.id);
        removeFromPostList(data.containerRef.current, data.id);
    },
    comment: async (data) => {
        await commentService.destroy(data.id);
        removeFromCommentList(data.containerRef.current, data.id);
    },
    reply: async (data) => {
        await commentService.destroy(data.id);
        removeFromReplyList(data.containerRef.current, data.commentId, data.id);
    },
    find: (type) => {
        if (type in deleteFunctions) return deleteFunctions[type];
        throw ("Delete function not found!", type);
    },
};

export default function DeleteButton(props) {
    return (
        <Button
            title={props.title}
            text={"Delete"}
            className={"!pe-2 " + props.className}
            onClick={() => handleOnClick(props)}
        >
            <SvgComponent size={25} name={"close"} className={"fill-accent mx-0.5"} />
        </Button>
    );
}
async function handleOnClick(props) {
    const { setLoading, data } = props;
    const { type } = data;
    try {
        setLoading(true);
        await deleteFunctions.find(type)(data);
        changePopupData(`${capitalize(type)} deleted sccessfully!`, popupResults.success);
    } catch (error) {
        changePopupData(`Couldn't delete ${capitalize(type)}!`, popupResults.error);
    } finally {
        setLoading(false);
    }
}
