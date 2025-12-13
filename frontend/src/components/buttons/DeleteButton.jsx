import { removeFromCommentList, removeFromReplyList } from "../../global/commentSignals";
import { changePopupData, popupResults } from "../../global/popupHandler";
import { removeFromPostList } from "../../global/postSignals";
import commentService from "../../services/comment.service";
import postService from "../../services/post.service";
import capitalize from "../../utils/capitalize";
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
    const { setLoading, onSuccess, type } = props;
    try {
        setLoading(true);
        await selectItemType(props);
        changePopupData(`${capitalize(type)} deleted sccessfully!`, popupResults.success);
        if (onSuccess) onSuccess();
    } catch {
        changePopupData(`Couldn't delete ${capitalize(type)}!`, popupResults.error);
    } finally {
        setLoading(false);
    }
}
async function selectItemType(props) {
    const { type, containerRef, data } = props;
    // await delay(1500);
    switch (true) {
        case type === "post": {
            await postService.destroy(data.id);
            removeFromPostList(containerRef.current, data.id);
            break;
        }
        case type === "comment" || type === "reply": {
            await commentService.destroy(data.id);
            if (type === "reply") {
                removeFromReplyList(containerRef.current, data.commentId, data.id);
            } else {
                removeFromCommentList(containerRef.current, data.id);
            }

            break;
        }
        default: {
            throw new Error();
        }
    }
}
