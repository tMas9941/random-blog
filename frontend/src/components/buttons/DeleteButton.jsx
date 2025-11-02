import { changePopupData, popupResults } from "../../global/popupHandler";
import commentService from "../../services/comment.service";
import postService from "../../services/post.service";
import delay from "../../utils/delay";
import SvgComponent from "../misc/SvgComponent";
import Button from "./Button";

export default function DeleteButton(props) {
    return (
        <Button title={props.title} text={"Delete"} className={props.className} onClick={() => handleOnClick(props)}>
            <SvgComponent size={30} name={"close"} className={"fill-accent"} />
        </Button>
    );
}
async function handleOnClick(props) {
    switch (props.type) {
        case "post": {
            await deletePost(props);
            break;
        }
        case "comment": {
            await deleteComment(props);
            break;
        }
        default: {
            changePopupData("Couldn't delete item!", popupResults.error);
        }
    }
}
async function deletePost(props) {
    const { data, removeSelfFromList, setLoading, onSuccess } = props;
    try {
        setLoading(true);
        await postService.destroy(data);
        if (removeSelfFromList) removeSelfFromList(data.id);
        changePopupData("Post deleted sccessfully!", popupResults.success);
        if (onSuccess) onSuccess();
    } catch {
        changePopupData("Couldn't delete post!", popupResults.error);
    } finally {
        setLoading(false);
    }
}

async function deleteComment(props) {
    const { data, removeSelfFromList, setLoading, onSuccess, containerRef } = props;
    try {
        setLoading(true);
        await commentService.destroy({ id: data.id });
        changePopupData("Comment deleted sccessfully!", popupResults.success);
        setLoading(false);
        containerRef.current.classList.add("animate-shrink");
        await delay(155);
        if (removeSelfFromList) removeSelfFromList(data.id);
        if (onSuccess) onSuccess();
    } catch {
        changePopupData("Couldn't delete comment!", popupResults.error);
    } finally {
        setLoading(false);
    }
}
