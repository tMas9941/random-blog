import { aimateShrink } from "../utils/animations";
import Signal from "../utils/signal";

export const postListChanged = new Signal(null);

export function removeFromPostList(element, postId) {
    aimateShrink(element, () => postListChanged.changeValue({ action: "remove", postId }));
}
