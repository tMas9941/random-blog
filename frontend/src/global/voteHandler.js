import commentVoteService from "../services/comment-vote.service.js";
import postVoteService from "../services/post-vote.service.js";

export const castPostVote = async (data) => {
    if (data.value === data.prevValue) {
        return await postVoteService.destroy(data);
    }
    if (data.prevValue === null) {
        return await postVoteService.create(data);
    } else {
        return await postVoteService.update(data);
    }
};

export const castCommentVote = async (data) => {
    if (data.value === data.prevValue) {
        return await commentVoteService.destroy(data);
    }
    if (data.prevValue === null) {
        return await commentVoteService.create(data);
    } else {
        return await commentVoteService.update(data);
    }
};
