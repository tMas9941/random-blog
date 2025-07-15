export const LOGIN_STATES = {
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
		message: "Successful login!",
	},
	FETCH_FAILED: {
		loading: false,
		fetchStatus: false,
	},
};
export const loginReducer = (state, { newState, addValue }) => {
	return { ...state, ...newState, ...addValue };
};
