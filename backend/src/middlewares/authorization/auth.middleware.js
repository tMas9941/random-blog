import { JWT_SECRET } from "../../constants/constants.js";
import roleService from "../../services/role.service.js";
import userService from "../../services/user.service.js";
import HttpError from "../../utils/HttpError.js";
import jwt from "jsonwebtoken";
import benchmark from "../../utils/benchmark.js";
import postService from "../../services/post.service.js";

export const auth = (authData) => {
	return async (req, res, next) => {

		try {

			const token = req.headers.authorization?.split(" ")[1];
			if (hasNoToken(token)) throw new HttpError("Unauthenticated", 401);

			const userData = jwt.verify(token, JWT_SECRET);
			if (!userData) throw new HttpError("Invalid Token!", 401);

			const verifyById = await userService.verifyById(userData.id);
			if (!verifyById) throw new HttpError("Invalid user!", 404);

			const userPermissions = await roleService.getRolePermissions(userData.role);

			const ownerId = await getTargetUserId(authData.subject, req.params.id);

			const authorized = comparePermissions({
				userPermissions: userPermissions.permissions,
				neededPermissions: authData,
				userId: userData.id,
				ownerId,
			});


			if (!authorized) 
				throw new HttpError("Unauthorized!", 403);
			

			req.userId = userData.id;

			next();
		} catch (error) {

			next(error);
		}
	};
};

async function getTargetUserId(subject, subjectId) {
	console.log({ subject, subjectId });
	switch (subject) {
		case "POSTS":
			const owner = await postService.getUserIdByPost(subjectId);
			console.log("owner : ", owner);
			return owner?.userId;

			break;
		case "COMMENTS":
			console.log(" getTargetUserId COMMENT");
			break;
		default:
			return null;
	}

	console.log(subject);
}

function comparePermissions({ userPermissions, neededPermissions, ownerId, userId }) {
	for (const userPermission of userPermissions) {
		if (userHasPerm({ userPermission, neededPermissions, ownerId, userId }) === true) {
			return true;
		}
	}
	return false;
}

function userHasPerm({ userPermission, neededPermissions, ownerId, userId }) {
	let have = true;
	// console.log("______________", neededPermissions, Object.values(neededPermissions));
	// console.log("______________", userPermission, Object.values(userPermission));

	for (let neededPermKey of Object.keys(neededPermissions)) {
		// if target == ALL skip this process
		if (neededPermKey === "target" && neededPermissions[neededPermKey] !== "ALL") {
			// if target is OWN -> compare IDs

			if (neededPermissions[neededPermKey] === "OWN") {
				// console.log("check OWN : ", ownerId, userId);
				if (ownerId !== userId) {
					return false;
				}
			}
			continue;
		}

		if (!Object.values(userPermission).includes(neededPermissions[neededPermKey])) {
			have = false;
		}
	}
	console.log("have ", have);
	return have;
}

function hasNoToken(token) {
	return !token || token === "undefined" || token === "null";
}
