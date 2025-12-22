import { PermissionActions, PermissionSubjects, PermissionTarget } from "../../../generated/prisma/index.js";

export function permUserReadOwn() {
    return { action: PermissionActions.READ, subject: PermissionSubjects.SETTINGS, target: PermissionTarget.OWN };
}
export function permUserUpdateOwn() {
    return { action: PermissionActions.UPDATE, subject: PermissionSubjects.SETTINGS, target: PermissionTarget.OWN };
}
export function permUserDeleteOwn() {
    return { action: PermissionActions.DELETE, subject: PermissionSubjects.SETTINGS, target: PermissionTarget.OWN };
}
