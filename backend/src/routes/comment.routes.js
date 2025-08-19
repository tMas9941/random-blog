import express from "express";
import commentController from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create", commentController.create);
router.get("/list", commentController.list);
router.get("/:userId", commentController.getByUserId);

export default router;
