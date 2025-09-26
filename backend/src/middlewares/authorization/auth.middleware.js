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
            // console.log("Token: ", token);
            const userData = jwt.verify(token, JWT_SECRET);
            if (!userData) throw new HttpError("Invalid Token!", 401);
            // console.log("UserData from token: ", userData);
            const verifyById = await userService.verifyById(userData.id);
            if (!verifyById) throw new HttpError("Invalid user!", 404);
            // console.log("Verified user: ", verifyById);
            const userPermissions = await roleService.getRolePermissions(userData.role);
            // console.log("User permissions: ", userPermissions);
            const ownerId = await getTargetUserId(authData.subject, req.params.id);
            // console.log("OwnerId: ", ownerId);
            const authorized = comparePermissions({
                userPermissions: userPermissions.permissions,
                neededPermissions: authData,
                userId: userData.id,
                ownerId,
            });
            // console.log("Authorized: ", authorized);
            if (!authorized) throw new HttpError("Unauthorized!", 403);

            req.userId = userData.id;
            // console.log("Authorized userId: ", req.userId);
            next();
        } catch (error) {
            next(error);
        }
    };
};

async function getTargetUserId(subject, subjectId) {
    switch (subject) {
        case "POSTS":
            if (subjectId) {
                const owner = await postService.getUserIdByPost(subjectId);
                return owner?.userId;
            }

        case "COMMENTS":
            break;
        default:
            return null;
    }
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
    for (let neededPermKey of Object.keys(neededPermissions)) {
        if (neededPermKey === "target" && neededPermissions[neededPermKey] !== "ALL") {
            if (neededPermissions[neededPermKey] === "OWN") {
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

    return have;
}

function hasNoToken(token) {
    return !token || token === "undefined" || token === "null";
}
