import express from "express";
import postController from "../controllers/post.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", postController.create);
router.get("/list", postController.list);
router.get("/:id", authenticate, postController.getByid);

export default router;
