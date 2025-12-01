import { supplementComment } from "../../../constants/exports";
import Signal from "../../../utils/signal";

export const commentIdOfActiveReply = new Signal(null);

export function setActiveReply(commentId) {
    commentIdOfActiveReply.changeValue(commentId);
}

export const replyListChanged = new Signal(0);

export function addToReplyList({ commentId, newReply }) {
    replyListChanged.changeValue({ commentId, newReply: supplementComment(newReply) });
}
