import HttpError from "../utils/HttpError.js";

export const errorHandler = (err, req, res, next) => {
	if (err instanceof HttpError) {
		return res.status(err.status).json({ error: err.message });
	}
	res.status(500).json({ error: "Internal Server Error" });
};

export default errorHandler;
