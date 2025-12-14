import express from "express";
import userController from "../controllers/user.controller.js";

const router = express.Router();

router.get("/list", userController.list);
router.get("/:id", userController.getById);
router.patch("/:id/password", userController.changePassword);

export default router;
