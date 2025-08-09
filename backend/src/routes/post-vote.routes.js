import express from "express";
import postVoteController from "../controllers/post-vote.controller.js";

const router = express.Router();

router.post("/create", postVoteController.create);
router.delete("/delete", postVoteController.destroy);
router.put("/update", postVoteController.update);
router.get("/list", postVoteController.list);

export default router;
