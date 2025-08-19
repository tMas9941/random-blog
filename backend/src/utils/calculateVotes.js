export default function calculateVotes(obj, userId) {
	const voteValues = { value: null, total: 0, positive: 0 };
	obj.votes.forEach((vote) => {
		if (vote.value) voteValues.positive += 1;
		if (vote.userId === userId) voteValues.value = vote.value;
		voteValues.total += 1;
	});

	return voteValues;
}
