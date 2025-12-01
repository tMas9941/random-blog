import { userSignal } from "../global/userData";
import Signal from "../utils/signal";

export const commentListChanged = new Signal(0);
export function addToCommentList(newComment) {
    commentListChanged.changeValue(supplementComment(newComment));
}
export function supplementComment(comment) {
    comment.comments = 0;
    comment.user = { username: userSignal.value.username, profile: userSignal.value.profile };
    comment.votes = { value: null, total: 0, positive: 0 };
    comment._count = 0;
    return comment;
}

export const CHUNK_TYPE = { post: "post", comment: "comment" };
