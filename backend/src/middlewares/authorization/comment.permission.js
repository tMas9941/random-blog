import { PermissionActions, PermissionSubjects, PermissionTarget } from "../../../generated/prisma/index.js";

export function permCommentCreate() {
    return { action: PermissionActions.CREATE, subject: PermissionSubjects.COMMENTS };
}
export function permCommentDelete() {
    return { action: PermissionActions.DELETE, subject: PermissionSubjects.COMMENTS, target: PermissionTarget.OWN };
}
