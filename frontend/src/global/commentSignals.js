import { userSignal } from "../global/userData";
import Signal from "../utils/signal";

export const commentListChanged = new Signal(0);
export function addToCommentList(newComment) {
    commentListChanged.changeValue(supplementComment(newComment));
}

export const commentIdOfActiveReply = new Signal(null);

export function setActiveReply(commentId) {
    commentIdOfActiveReply.changeValue(commentId);
}

export const replyListChanged = new Signal(0);

export function addToReplyList({ commentId, newReply }) {
    replyListChanged.changeValue({ commentId, newReply: supplementComment(newReply) });
}
function supplementComment(comment) {
    comment.comments = 0;
    comment.user = { username: userSignal.value.username, profile: userSignal.value.profile };
    comment.votes = { value: null, total: 0, positive: 0 };
    comment._count = 0;
    return comment;
}
