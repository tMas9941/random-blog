import { changePopupData, popupResults } from "../../global/popupHandler";
import postService from "../../services/post.service";
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
        }
        case "comment": {
            await deleteComment(props);
        }
        default: {
            changePopupData("Couldn't delete item!", popupResults.error);
        }
    }
}
async function deletePost({ data, removeSelfFromList, setLoading, onSuccess }) {
    console.log("data, removeSelfFromList, setLoading, onSuccess ", data, removeSelfFromList, setLoading, onSuccess);
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

async function deleteComment({ data, removeSelfFromList, setLoading, onSuccess }) {
    setLoading(true);
    if (onSuccess) onSuccess();
    return;
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
