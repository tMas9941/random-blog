import express from "express";
import userController from "../controllers/user.controller.js";
import { permUserUpdateOwn } from "../middlewares/authorization/user.permission.js";
import { auth } from "../middlewares/authorization/auth.middleware.js";

const router = express.Router();

router.get("/list", userController.list);
router.get("/:id", userController.getById);
router.patch("/:id/password", auth(permUserUpdateOwn()), userController.changePassword);
router.patch("/:id/data", auth(permUserUpdateOwn()), userController.updateUserData);

export default router;
