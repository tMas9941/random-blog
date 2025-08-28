import express from "express";
import postController from "../controllers/post.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", postController.create);
router.get("/list", postController.list);
router.get("/:id", await auth({ authData: { action: "READ", subject: "POST" } }), postController.getByid);

export default router;
