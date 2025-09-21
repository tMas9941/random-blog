import prisma from "../models/prisma-client.js";

const getRolePermissions = async (name) => {
	const rolePermissions = await prisma.roles.findUnique({
		where: { name },
		include: { permissions: { select: { action: true, subject: true, target: true } } },
	});

	return rolePermissions;
};

export default { getRolePermissions };
