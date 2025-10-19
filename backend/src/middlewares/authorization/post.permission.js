import { PermissionActions, PermissionSubjects, PermissionTarget } from "../../../generated/prisma/index.js";

export function permPostReadOwn() {
    return { action: PermissionActions.READ, subject: PermissionSubjects.POSTS, target: PermissionTarget.OWN };
}
export function permPostCreate() {
    return { action: PermissionActions.CREATE, subject: PermissionSubjects.POSTS };
}
export function permPostDelete() {
    return { action: PermissionActions.DELETE, subject: PermissionSubjects.POSTS, target: PermissionTarget.OWN };
}
