export const CREATE_STATES = {
	INIT: {
		tagMessage: null,
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
	TAGS_ERROR: { tagMessage: "Need to add atleast one tag!" },
};
export const createPostReducer = (state, { newState, addValue }) => {
	return { ...state, ...newState, ...addValue };
};
