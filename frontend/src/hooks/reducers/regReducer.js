export const REG_STATES = {
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
		message: "Registration successfull!",
	},
	FETCH_FAILED: {
		loading: false,
		fetchStatus: false,
		message: "Registration failed!",
	},
};
export const registrationReducer = (state, { newState }) => {
	return { ...state, ...newState };
};
