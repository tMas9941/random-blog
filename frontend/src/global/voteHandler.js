import postVoteService from "../services/post-vote.service.js";

export const castPostVote = async (data) => {
	try {
		if (typeof data.positive === "boolean") {
			if (typeof data.prevPositive === "boolean") {
				await postVoteService.update(data);
			} else {
				await postVoteService.create(data);
			}
		} else {
			await postVoteService.destroy(data);
		}
	} catch (error) {
		throw error;
	}
};
