import commentService from "../services/comment.service.js";
import calculateVotes from "../utils/calculateVotes.js";

const create = async (req, res, next) => {
    const { userId, postId, commentId, content } = req.body;
    const data = { userId, postId, commentId, content };
    try {
        const response = await commentService.create(data);
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
};

const list = async (req, res, next) => {
    let { limit, page, where, userId = "" } = req.query;

    if (where) where = JSON.parse(where);
    try {
        const list = await commentService.list({ limit, page, where, userId });

        const newList = await Promise.all(
            list.map(async (comment) => {
                return { ...comment, votes: calculateVotes(comment, userId) };
            })
        );

        res.status(200).send(newList);
    } catch (error) {
        next(error);
    }
};

const destroy = async (req, res, next) => {
    const { id } = req.body;
    try {
        const response = await commentService.destroy({ id });
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
};

const getByUserId = async (req, res, next) => {
    const { userId } = req.body;

    try {
        const response = await commentService.getByUserId({ userId });

        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
};
export default { create, list, getByUserId, destroy };
