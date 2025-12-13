import { userSignal } from "../global/userData";
import { aimateShrink } from "../utils/animations.js";
import Signal from "../utils/signal";
import SignalGroup from "../utils/signalGroup.js";

export const commentAdded = new Signal(null);
export function addToCommentList(newComment) {
    commentAdded.changeValue(supplementComment(newComment));
}

export const commentRemoved = new Signal(null);
export function removeFromCommentList(element, commentId) {
    aimateShrink(element, () => commentRemoved.changeValue(commentId));
}

export const commentIdOfActiveReply = new Signal(null);
export function setActiveReply(commentId) {
    commentIdOfActiveReply.changeValue(commentId);
}

export const replyAdded = new Signal(null);
export function addToReplyList({ commentId, newReply }) {
    replyAdded.changeValue({ commentId, newReply: supplementComment(newReply) });
}

export const replyRemoved = new SignalGroup();
export function removeFromReplyList(element, commentId, replyId) {
    aimateShrink(element, () => replyRemoved.changeValue("replyList_" + commentId, replyId));
}

function supplementComment(comment) {
    comment.comments = 0;
    comment.user = { username: userSignal.value.username, profile: userSignal.value.profile };
    comment.votes = { value: null, total: 0, positive: 0 };
    comment._count = 0;
    return comment;
}
