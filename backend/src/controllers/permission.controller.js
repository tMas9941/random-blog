import permissionService from "../services/permission.service.js";

const list = async (req, res, next) => {
	console.log("lsit start");
	try {
		const response = await permissionService.list();
		console.log({ response });
		res.status(200).send(response);
	} catch (error) {
		next(error);
	}
};

export default { list };
