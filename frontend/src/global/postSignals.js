import Signal from "../utils/signal";

export const postListChanged = new Signal(null);

export function removeFromPostList(postId) {
    postListChanged.changeValue({ action: "remove", postId });
}
