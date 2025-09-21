import postTagService from "../services/post-tag.service.js";

import postService from "../services/post.service.js";
import tagService from "../services/tag.service.js";
import HttpError from "../utils/HttpError.js";
import benchmark from "../utils/benchmark.js";
import calculateVotes from "../utils/calculateVotes.js";

const create = async (req, res, next) => {
    const { userId, title, content, tags } = req.body;

    try {
        const addTag = await tagService.create({ tags });
        if (!addTag) throw new HttpError("Error during tag creation!", 405);

        const newPost = await postService.create({ authorId: userId, title, content });
        if (!newPost) throw new HttpError("Error during post creation!", 405);

        const postTag = await postTagService.create({ postId: newPost.id, tags });
        if (!postTag) throw new HttpError("Error during post creation!", 405);

        res.status(200).send(newPost);
    } catch (error) {
        next(error);
    }
};

const list = async (req, res, next) => {
    const { limit, page, userId } = req.query;
    let { where } = req.query;
    if (where) where = JSON.parse(where);
    try {
        const bench = benchmark("post controller list");
        const list = await postService.list({ limit, page, where });
        if (!list) throw new HttpError("Error during post query!", 405);
        const newList = await Promise.all(
            list.map(async (post) => {
                return { ...post, votes: calculateVotes(post, userId) };
            })
        );

        bench.stop();
        res.status(200).send(newList);
    } catch (error) {
        next(error);
    }
};

const getByid = async (req, res, next) => {
    const { id } = req.params;
    const { userId } = req.query;
    try {
        const response = await postService.getById({ id });
        if (!response) throw new HttpError("Error during fetching post!", 405);
        const responseWithVotes = { ...response, votes: calculateVotes(response, userId) };
        res.status(200).send(responseWithVotes);
    } catch (error) {
        next(error);
    }
};
export default { create, list, getByid };
