import express from "express";
import profileController from "../controllers/profile.controller.js";

const router = express.Router();

router.put("/avatar", profileController.updateAvatarUrl);
router.put("/introduction", profileController.updateIntroduction);

export default router;
