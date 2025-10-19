import express from "express";
import postController from "../controllers/post.controller.js";
import { permPostCreate, permPostDelete } from "../middlewares/authorization/post.permission.js";
import { auth } from "../middlewares/authorization/auth.middleware.js";

const router = express.Router();

router.post("/create", auth(permPostCreate()), postController.create);
router.get("/list", postController.list);
router.get("/:id", postController.getByid);
router.delete("/delete/:id", auth(permPostDelete()), postController.destroy);

export default router;
