import { changePopupData, popupResults } from "../../global/popupHandler";
import postService from "../../services/post.service";
import SvgComponent from "../misc/SvgComponent";
import Button from "./Button";

export default function DeleteButton({
    title = "Delete post",
    data,
    removeSelfFromList,
    className,
    setLoading,
    onSuccess,
}) {
    return (
        <Button
            title={title}
            text={"Delete"}
            className={className}
            onClick={() => deletePost({ data, removeSelfFromList, setLoading, onSuccess })}
        >
            <SvgComponent size={30} name={"close"} className={"fill-accent"} />
        </Button>
    );
}

async function deletePost({ data, removeSelfFromList, setLoading, onSuccess }) {
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
