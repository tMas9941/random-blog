import HttpError from "../utils/HttpError.js";

const errorHandler = (err, req, res, next) => {
	if (err instanceof HttpError) res.status(err.status).json({ status: err.status, message: err.message });
	res.status(500).json({ status: err.status, message: "Internal Server Error" });
	return next;
};

export default errorHandler;
