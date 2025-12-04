import express from "express";
import authController from "../controllers/auth.controller.js";
import { auth } from "../middlewares/authorization/auth.middleware.js";

const router = express.Router();

router.post("/registration", authController.registration);
router.post("/login", authController.login);
router.post("/refresh", auth(), authController.refreshToken);

export default router;
