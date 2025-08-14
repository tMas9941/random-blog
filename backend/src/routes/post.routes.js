import express from "express";
import postController from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", postController.create);
router.get("/list", postController.list);
router.get("/:id", postController.getByid);

export default router;
