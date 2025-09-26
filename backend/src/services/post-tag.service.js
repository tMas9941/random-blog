import prisma from "../models/prisma-client.js";

const create = async ({ postId, tags }) => {
    const postTags = [];
    for (const tag of tags) {
        const newPostTag = await prisma.postTags.create({ data: { postId, tagName: tag } });
        postTags.push(newPostTag);
    }
    return postTags;
};

const list = () => {
    const list = prisma.postTags.findMany();
    return list;
};

export default { create, list };
