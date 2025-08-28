import prisma from "../models/prisma-client.js";

const list = async () => {
	const list = await prisma.permissions.findMany();
	console.log(list);
	return list;
};
export default { list };
