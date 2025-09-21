import permissionService from "../services/permission.service.js";

const list = async (req, res, next) => {
    try {
        const response = await permissionService.list();
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
};

export default { list };
