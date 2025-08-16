import express from "express";
import commentVoteController from "../controllers/comment-vote.controller.js";

const router = express.Router();

router.post("/create", commentVoteController.create);
router.delete("/delete", commentVoteController.destroy);
router.put("/update", commentVoteController.update);
router.get("/list", commentVoteController.list);

export default router;
