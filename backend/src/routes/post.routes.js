import express from "express";
import postController from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", postController.create);
router.get("/list", postController.list);
export default router;
