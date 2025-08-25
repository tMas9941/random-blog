import express from "express";
import profileController from "../controllers/profile.controller.js";
import multer from "../middlewares/multer.js";

const router = express.Router();

router.put("/avatar", multer.singleImage, profileController.updateAvatar);
router.put("/introduction", profileController.updateIntroduction);

export default router;
