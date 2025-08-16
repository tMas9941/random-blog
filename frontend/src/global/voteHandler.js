import commentVoteService from "../services/comment-vote.service.js";
import postVoteService from "../services/post-vote.service.js";

export const castPostVote = async (data) => {
	try {
		if (data.vote === data.prevVote) {
			return await postVoteService.destroy(data);
		}
		if (data.prevVote === 0) {
			return await postVoteService.create(data);
		} else {
			return await postVoteService.update(data);
		}
	} catch (error) {
		throw error;
	}
};

export const castCommentVote = async (data) => {
	try {
		if (data.vote === data.prevVote) {
			return await commentVoteService.destroy(data);
		}
		if (data.prevVote === 0) {
			return await commentVoteService.create(data);
		} else {
			return await commentVoteService.update(data);
		}
	} catch (error) {
		throw error;
	}
};
