import express from "express";
import profileController from "../controllers/profile.controller.js";
import multer from "../middlewares/multer.js";
import { auth } from "../middlewares/authorization/auth.middleware.js";
import { permUserUpdateOwn } from "../middlewares/authorization/user.permission.js";

const router = express.Router();

router.patch(`/:id`, auth(permUserUpdateOwn()), multer.singleImage, profileController.updateProfile);

export default router;
