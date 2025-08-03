export const CREATE_STATES = {
	INIT: {
		lockForm: false,
		loading: false,
		fetchStatus: null,
		message: "",
	},
	FETCH_START: { lockForm: true, loading: true },
	FETCH_SUCCESS: {
		loading: false,
		fetchStatus: true,
		message: "Successful posting!",
	},
	FETCH_FAILED: {
		loading: false,
		fetchStatus: false,
		message: "Posting failed!",
	},
};
export const createPostReducer = (state, { newState, addValue }) => {
	console.log({ ...state, ...newState, ...addValue });
	return { ...state, ...newState, ...addValue };
};
