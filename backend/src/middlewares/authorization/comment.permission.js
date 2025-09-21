import { PermissionActions, PermissionSubjects } from "../../../generated/prisma/index.js";

export function permCommentCreate() {
	return { action: PermissionActions.CREATE, subject: PermissionSubjects.COMMENTS };
}
