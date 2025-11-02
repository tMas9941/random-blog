import express from "express";
import commentController from "../controllers/comment.controller.js";
import { auth } from "../middlewares/authorization/auth.middleware.js";
import { permCommentCreate, permCommentDelete } from "../middlewares/authorization/comment.permission.js";

const router = express.Router();

router.post("/create", auth(permCommentCreate()), commentController.create);
router.get("/list", commentController.list);
router.get("/:userId", commentController.getByUserId);
router.delete("/delete/:id", auth(permCommentDelete()), commentController.destroy);

export default router;
